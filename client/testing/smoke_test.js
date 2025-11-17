const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..'); // client/

const results = [];

function checkFile(relPath) {
  const full = path.join(base, relPath);
  const ok = fs.existsSync(full);
  results.push({name: `file: ${relPath}`, ok, detail: ok ? 'exists' : 'missing'});
  return ok;
}

function read(relPath) {
  try {
    return fs.readFileSync(path.join(base, relPath), 'utf8');
  } catch (e) {
    return null;
  }
}

// 1) index.html exists
checkFile('index.html');

// 2) index.html has a <title> and a <script> tag
const index = read('index.html');
if (index) {
  const hasTitle = /<title>.*<\/title>/i.test(index);
  const hasScript = /<script[^>]*src=["'][^"']+["'][^>]*>/i.test(index) || /<script>/.test(index);
  results.push({name: 'index.html: has <title>', ok: hasTitle, detail: hasTitle ? 'ok' : 'missing <title>'});
  results.push({name: 'index.html: has <script>', ok: hasScript, detail: hasScript ? 'ok' : 'missing <script>'});
} else {
  results.push({name: 'index.html: has <title>', ok: false, detail: 'index.html unreadable'});
  results.push({name: 'index.html: has <script>', ok: false, detail: 'index.html unreadable'});
}

// 3) api.js exists and looks like it contains fetch or an API base
const apiExists = checkFile('api.js');
if (apiExists) {
  const apiContent = read('api.js') || '';
  const looksLikeApi = /fetch\(|axios\.|baseUrl|API_URL|apiUrl|endpoint/i.test(apiContent);
  results.push({name: 'api.js: contains API calls/config', ok: looksLikeApi, detail: looksLikeApi ? 'ok' : 'no obvious API usage found'});
} else {
  results.push({name: 'api.js: contains API calls/config', ok: false, detail: 'api.js missing'});
}

// 4) script.js exists and looks like it manipulates the DOM
const scriptExists = checkFile('script.js');
if (scriptExists) {
  const scriptContent = read('script.js') || '';
  const domUse = /document\.|addEventListener\(|querySelector\(|getElementById\(/i.test(scriptContent);
  results.push({name: 'script.js: contains DOM usage', ok: domUse, detail: domUse ? 'ok' : 'no DOM usage detected'});
} else {
  results.push({name: 'script.js: contains DOM usage', ok: false, detail: 'script.js missing'});
}

// 5) style.css exists
checkFile('style.css');

// Summarize
console.log('Client smoke test results:');
let failures = 0;
results.forEach(r => {
  const mark = r.ok ? '✓' : '✗';
  console.log(`${mark} ${r.name} — ${r.detail}`);
  if (!r.ok) failures++;
});

if (failures === 0) {
  console.log('\nAll client smoke checks passed.');
  process.exit(0);
} else {
  console.error(`\n${failures} client smoke check(s) failed.`);
  process.exit(1);
}
