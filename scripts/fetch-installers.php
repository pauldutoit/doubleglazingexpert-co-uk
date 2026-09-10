<?php
/**
 * Companies House fetcher for doubleglazingexpert.co.uk.
 *
 * Downloads the Companies House "BasicCompanyDataAsOneFile" bulk export,
 * keeps only ACTIVE companies whose SIC code matches a window / door /
 * glazing installation trade, matches each one to a city in
 * src/data/cities.json by its registered-office post town, and writes one
 * JSON file per city under src/data/installers/ plus an _index.json count map.
 * Astro reads these at build time to render the per-city "installers on the
 * public register" reference block.
 *
 * This is PUBLIC statutory data (register of companies). It is NOT a vetted
 * or endorsed list: a registered office is not proof of trading area or of
 * competent-person-scheme membership. The rendered page must say so and must
 * keep the quote form as the primary call to action.
 *
 * Adapted from ~/perso/smartboilerrepair.co.uk/scripts/fetch-companies.php
 * (same bulk source and row shape) - that one groups by county for a heating
 * directory; this one groups by city to match this site's cities.json model.
 *
 * Usage:
 *   php scripts/fetch-installers.php                       # full run, all cities
 *   php scripts/fetch-installers.php --city=leeds          # write one city only
 *   php scripts/fetch-installers.php --csv /path/to/BasicCompanyDataAsOneFile.csv
 *   php scripts/fetch-installers.php --sample=leeds        # dry run: print, write nothing
 */

if (php_sapi_name() !== 'cli') { http_response_code(403); exit('CLI only'); }

// ------------------------------------------------------------------
// SIC 2007 codes for the window / glazing installation trade.
//   43342 Glazing                - the code glazing / double-glazing firms
//                                   actually file under (the rolled-up 43340
//                                   is barely used in the register)
//   43320 Joinery installation   - "installation of doors, windows, frames..."
//                                   but in practice dominated by shopfitters,
//                                   kitchen/bedroom fitters and general fitout
//                                   -> OFF by default, opt in with --with-joinery
// Deliberately NOT included: 81221 (window CLEANING), 25120 / 22290 / 32990
// (manufacturing), 43290 / 43390 / 43999 (catch-all completion trades).
// Override for experiments: --sic=43342,25120
// ------------------------------------------------------------------
$SIC_CODES  = ['43342'];
$SIC_LABELS = [
    '43342' => 'Glazing',
    '43320' => 'Joinery & window installation',
    '25120' => 'Metal door & window manufacture',
];
foreach ($argv ?? [] as $arg) {
    if (str_starts_with($arg, '--sic='))     $SIC_CODES = array_filter(array_map('trim', explode(',', substr($arg, 6))));
    if ($arg === '--with-joinery' && !in_array('43320', $SIC_CODES)) $SIC_CODES[] = '43320';
}

$ROOT      = dirname(__DIR__);
$DATA_DIR  = $ROOT . '/src/data';
$CITY_FILE = $DATA_DIR . '/cities.json';
$OUT_DIR   = $DATA_DIR . '/installers';

// ------------------------------------------------------------------
// Args
// ------------------------------------------------------------------
$csv_path   = null;
$only_city  = null;   // --city=<slug>   : write just this city
$sample     = null;   // --sample=<slug> : print to stdout, write nothing
foreach ($argv ?? [] as $i => $arg) {
    if ($arg === '--csv' && isset($argv[$i + 1])) $csv_path = $argv[$i + 1];
    if (str_starts_with($arg, '--city='))   $only_city = substr($arg, 7);
    if (str_starts_with($arg, '--sample=')) $sample    = substr($arg, 9);
}
$dry_run = $sample !== null;
if ($dry_run) $only_city = $sample;

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
function slugify(string $text): string {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-');
}

/** Tidy a Companies House ALL-CAPS name to Title Case, keeping common suffixes. */
function tidy_name(string $name): string {
    $n = ucwords(strtolower(trim($name)));
    $fix = [
        'Ltd' => 'Ltd', 'Llp' => 'LLP', 'Plc' => 'PLC', 'Cic' => 'CIC',
        'Uk' => 'UK', 'Upvc' => 'uPVC', "T/a" => 't/a',
    ];
    return preg_replace_callback('/\b([A-Za-z\/]+)\b/', function ($m) use ($fix) {
        return $fix[$m[1]] ?? $m[1];
    }, $n);
}

/** Outward postcode district only, e.g. "LS6 3AA" -> "LS6". */
function outward(string $postcode): string {
    $pc = strtoupper(trim($postcode));
    return preg_match('/^([A-Z]{1,2}\d[A-Z\d]?)\s*\d[A-Z]{2}$/', $pc, $m) ? $m[1] : $pc;
}

/** Companies House CompanyCategory -> short label. */
function company_type(string $cat): string {
    $c = strtolower(trim($cat));
    return match (true) {
        $c === '' => '',
        str_contains($c, 'community interest')            => 'CIC',
        str_contains($c, 'public limited')                => 'PLC',
        str_contains($c, 'limited liability partnership') => 'LLP',
        str_contains($c, 'limited partnership')           => 'LP',
        str_contains($c, 'private limited')               => 'Ltd',
        default                                           => ucwords($c),
    };
}

/** Companies House Accounts.AccountCategory -> size band ('' if unknown). */
function size_band(string $cat): string {
    $c = strtoupper(trim($cat));
    return match (true) {
        $c === 'DORMANT'                                                  => 'Dormant',
        str_contains($c, 'MICRO')                                         => 'Micro',
        str_contains($c, 'SMALL') || str_contains($c, 'TOTAL EXEMPTION')  => 'Small',
        str_contains($c, 'MEDIUM')                                        => 'Medium',
        str_contains($c, 'GROUP') || $c === 'FULL'                        => 'Large',
        default                                                          => '',
    };
}

/** dd/mm/yyyy -> "yyyy" ('' if not parseable). */
function year_of(string $d): string {
    return preg_match('#/(\d{4})$#', trim($d), $m) ? $m[1] : '';
}

/** dd/mm/yyyy -> DateTimeImmutable|null */
function ch_date(string $d): ?DateTimeImmutable {
    $d = trim($d);
    if (!preg_match('#^\d{2}/\d{2}/\d{4}$#', $d)) return null;
    return DateTimeImmutable::createFromFormat('d/m/Y', $d) ?: null;
}

// ------------------------------------------------------------------
// City lookup: UPPERCASE post town -> city slug (+ display name)
// ------------------------------------------------------------------
if (!file_exists($CITY_FILE)) { fwrite(STDERR, "ERROR: {$CITY_FILE} missing\n"); exit(1); }
$cities = json_decode(file_get_contents($CITY_FILE), true);
if (!$cities) { fwrite(STDERR, "ERROR: cannot parse cities.json\n"); exit(1); }

$town_to_city = [];
foreach ($cities as $c) {
    $town_to_city[strtoupper($c['name'])] = [
        'slug'   => $c['slug'],
        'name'   => $c['name'],
        'county' => $c['county']  ?? '',
        'region' => $c['region']  ?? '',
    ];
}

// Royal Mail post towns that don't match a city name verbatim. Keys are the
// exact RegAddress.PostTown value (uppercased); values are city slugs.
// London boroughs are deliberately NOT aliased here - almost every company
// there files post town "LONDON", so borough pages fall back to nearby /
// central London companies in src/lib/installers.ts instead.
$POST_TOWN_ALIAS = [
    'HULL'                => 'kingston-upon-hull',
    'KINGSTON UPON HULL'  => 'kingston-upon-hull',
    'BURTON-ON-TRENT'     => 'burton-upon-trent',
    'BURTON ON TRENT'     => 'burton-upon-trent',
    'BURTON-UPON-TRENT'   => 'burton-upon-trent',
    'BURTON UPON TRENT'   => 'burton-upon-trent',
];
foreach ($POST_TOWN_ALIAS as $town => $slug) {
    foreach ($cities as $c) {
        if ($c['slug'] === $slug) {
            $town_to_city[$town] = [
                'slug' => $c['slug'], 'name' => $c['name'],
                'county' => $c['county'] ?? '', 'region' => $c['region'] ?? '',
            ];
            break;
        }
    }
}
if ($only_city) {
    $match = array_filter($town_to_city, fn($v) => $v['slug'] === $only_city);
    if (!$match) { fwrite(STDERR, "ERROR: --city/--sample '{$only_city}' not found in cities.json\n"); exit(1); }
}

// ------------------------------------------------------------------
// 1. Locate + download the bulk CSV (identical logic to the sbr script)
// ------------------------------------------------------------------
if (!$csv_path) {
    $base = 'https://download.companieshouse.gov.uk/BasicCompanyDataAsOneFile-';
    $stock_url = null;
    foreach (['this' => date('Y-m-'), 'last' => date('Y-m-', strtotime('first day of last month'))] as $month) {
        for ($d = 1; $d <= 5; $d++) {
            $try = $base . $month . sprintf('%02d', $d) . '.zip';
            $headers = @get_headers($try);
            if ($headers && strpos($headers[0], '200') !== false) { $stock_url = $try; break 2; }
        }
    }
    if (!$stock_url) {
        fwrite(STDERR, "ERROR: cannot find Companies House file. See https://download.companieshouse.gov.uk/en_output.html\n");
        exit(1);
    }

    $tmp      = sys_get_temp_dir();
    $zip_path = "{$tmp}/CompaniesHouse-dge.zip";
    $csv_path = "{$tmp}/BasicCompanyData-dge.csv";

    if (!file_exists($zip_path) || (time() - filemtime($zip_path)) > 86400) {
        echo "Downloading Companies House data...\nURL: {$stock_url}\n";
        $ctx = stream_context_create(['http' => ['timeout' => 3600, 'header' => "User-Agent: doubleglazingexpert-fetch/1.0\r\n"]]);
        $src = fopen($stock_url, 'r', false, $ctx);
        if (!$src) { fwrite(STDERR, "ERROR: cannot open URL\n"); exit(1); }
        $dst = fopen($zip_path, 'w');
        $dl = 0; $last = 0;
        while (!feof($src)) {
            $chunk = fread($src, 1048576);
            fwrite($dst, $chunk);
            $dl += strlen($chunk);
            if ((time() - $last) >= 15) { echo "  " . round($dl / 1048576) . " MB...\n"; $last = time(); }
        }
        fclose($src); fclose($dst);
        echo "Downloaded: " . round(filesize($zip_path) / 1048576) . " MB\n";
    } else {
        echo "ZIP cached: {$zip_path}\n";
    }

    if (!file_exists($csv_path) || filemtime($csv_path) < filemtime($zip_path)) {
        echo "Extracting...\n";
        exec("unzip -o " . escapeshellarg($zip_path) . " -d " . escapeshellarg($tmp) . " 2>&1", $out, $ret);
        if ($ret !== 0) { fwrite(STDERR, "ERROR unzip: " . implode("\n", $out) . "\n"); exit(1); }
        $found = glob($tmp . '/BasicCompanyData*.csv');
        if (empty($found)) { fwrite(STDERR, "ERROR: CSV not found after extraction\n"); exit(1); }
        if ($found[0] !== $csv_path) rename($found[0], $csv_path);
        echo "CSV: " . round(filesize($csv_path) / 1048576) . " MB\n";
    } else {
        echo "CSV cached: {$csv_path}\n";
    }
}

// ------------------------------------------------------------------
// 2. Parse CSV, filter by SIC + active status + known city post town
// ------------------------------------------------------------------
echo "Reading CSV...\n";
$handle  = fopen($csv_path, 'r');
$headers = fgetcsv($handle, 0, ',');
$ci = [];
foreach ($headers as $i => $hh) $ci[trim($hh)] = $i;

$sic_set = array_flip($SIC_CODES);
$by_city = [];
$line = 0; $kept = 0;

while (($row = fgetcsv($handle, 0, ',')) !== false) {
    $line++;
    if ($line % 1000000 === 0) echo "  {$line} lines, {$kept} kept...\n";

    $sic_code = '';
    for ($s = 1; $s <= 4; $s++) {
        $col = "SICCode.SicText_{$s}";
        if (isset($ci[$col])) {
            $try = preg_replace('/[^0-9].*/', '', trim($row[$ci[$col]] ?? ''));
            if (isset($sic_set[$try])) { $sic_code = $try; break; }
        }
    }
    if (!$sic_code) continue;

    if (strtolower(trim($row[$ci['CompanyStatus'] ?? 0] ?? '')) !== 'active') continue;

    // Drop dormant shells, and companies whose accounts are > 18 months overdue
    // (heading for strike-off - not a firm you'd want a homeowner to call).
    $band = size_band($row[$ci['Accounts.AccountCategory'] ?? 0] ?? '');
    if ($band === 'Dormant') continue;
    $nextDue = ch_date($row[$ci['Accounts.NextDueDate'] ?? 0] ?? '');
    if ($nextDue && $nextDue < new DateTimeImmutable('-18 months')) continue;

    $town = strtoupper(trim($row[$ci['RegAddress.PostTown'] ?? 0] ?? ''));
    if (!isset($town_to_city[$town])) continue;
    $city = $town_to_city[$town];
    if ($only_city && $city['slug'] !== $only_city) continue;

    $company_number = trim($row[$ci['CompanyNumber'] ?? 0] ?? '');
    $name           = trim($row[$ci['CompanyName'] ?? 0] ?? '');
    $postcode       = trim($row[$ci['RegAddress.PostCode'] ?? 0] ?? '');
    if (!$name || !$company_number || !$postcode) continue;

    $addr1 = trim($row[$ci['RegAddress.AddressLine1'] ?? 0] ?? '');
    $addr2 = trim($row[$ci['RegAddress.AddressLine2'] ?? 0] ?? '');

    $by_city[$city['slug']][] = [
        'company_number' => $company_number,
        'name'           => tidy_name($name),
        'address'        => $addr1 . ($addr2 ? ', ' . $addr2 : ''),
        'postcode'       => strtoupper($postcode),
        'postcode_area'  => outward($postcode),
        'town'           => $city['name'],
        'county'         => $city['county'],
        'region'         => $city['region'],
        'sic'            => $sic_code,
        'sic_label'      => $SIC_LABELS[$sic_code] ?? '',
        'incorporated'   => trim($row[$ci['IncorporationDate'] ?? 0] ?? ''),
        'company_type'   => company_type($row[$ci['CompanyCategory'] ?? 0] ?? ''),
        'size'           => $band,
        'last_accounts'  => year_of($row[$ci['Accounts.LastMadeUpDate'] ?? 0] ?? ''),
        'slug'           => slugify($name),
    ];
    $kept++;
}
fclose($handle);
echo "{$line} lines read, {$kept} companies kept across " . count($by_city) . " cities\n";
if (!$kept) { fwrite(STDERR, "ERROR: no companies matched.\n"); exit(1); }

// ------------------------------------------------------------------
// 3. Sort + dedupe each city, then write (or print, for --sample)
// ------------------------------------------------------------------
$iso = function (string $d): string {
    return preg_match('#^(\d{2})/(\d{2})/(\d{4})$#', $d, $m) ? "{$m[3]}-{$m[2]}-{$m[1]}" : $d;
};

foreach ($by_city as $slug => &$entries) {
    $seen = [];
    $entries = array_values(array_filter($entries, function ($e) use (&$seen) {
        if (isset($seen[$e['company_number']])) return false;
        $seen[$e['company_number']] = true;
        return true;
    }));
    usort($entries, fn($a, $b) => strcmp($iso($a['incorporated']), $iso($b['incorporated'])) ?: strcmp($a['name'], $b['name']));
}
unset($entries);

if ($dry_run) {
    $slug = $only_city;
    $rows = $by_city[$slug] ?? [];
    echo "\n=== SAMPLE: {$slug} (" . count($rows) . " companies, SIC " . implode('+', $SIC_CODES) . ", active, post town = city) ===\n\n";
    foreach (array_slice($rows, 0, 25) as $i => $r) {
        printf("%2d. %-46s %-8s %-10s %s  [%s]\n",
            $i + 1, mb_strimwidth($r['name'], 0, 46), $r['postcode_area'],
            $r['incorporated'], $r['sic_label'], $r['company_number']);
    }
    if (count($rows) > 25) echo "    ... and " . (count($rows) - 25) . " more\n";
    echo "\n(dry run - nothing written)\n";
    exit(0);
}

if (!is_dir($OUT_DIR)) mkdir($OUT_DIR, 0755, true);
if (!$only_city) {
    foreach (glob($OUT_DIR . '/*.json') as $f) unlink($f);
}

$index = [];
if ($only_city && file_exists("{$OUT_DIR}/_index.json")) {
    $index = json_decode(file_get_contents("{$OUT_DIR}/_index.json"), true) ?: [];
}
$total = 0;
foreach ($by_city as $slug => $entries) {
    file_put_contents("{$OUT_DIR}/{$slug}.json", json_encode($entries, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    $index[$slug] = count($entries);
    $total += count($entries);
    echo "  {$slug}: " . count($entries) . "\n";
}
ksort($index);
file_put_contents("{$OUT_DIR}/_index.json", json_encode($index, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "\n=== DONE ===\n";
echo "  Cities:    " . count($by_city) . ($only_city ? " (single-city run)" : "") . "\n";
echo "  Companies: {$total}\n";
