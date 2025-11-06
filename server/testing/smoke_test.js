import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const base = path.resolve(__dirname, '..'); // server/

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

// 1) app.js exists
checkFile('app.js');

// 2) config/db.js exists and looks like a DB config
const dbExists = checkFile('config/db.js');
if (dbExists) {
  const dbContent = read('config/db.js') || '';
  const looksLikeDb = /host|user|password|database|connection|mysql|pg|mongodb|module\.exports/i.test(dbContent);
  results.push({name: 'config/db.js: contains DB config keywords', ok: looksLikeDb, detail: looksLikeDb ? 'ok' : 'no obvious DB config found'});
} else {
  results.push({name: 'config/db.js: contains DB config keywords', ok: false, detail: 'config/db.js missing'});
}

// 3) models/usuarioModel.js exists and exports something
const modelExists = checkFile('models/usuarioModel.js');
if (modelExists) {
  const modelContent = read('models/usuarioModel.js') || '';
  const exportsFound = /module\.exports|exports\.|export\s+/i.test(modelContent);
  results.push({name: 'models/usuarioModel.js: exports found', ok: exportsFound, detail: exportsFound ? 'ok' : 'no exports detected'});
} else {
  results.push({name: 'models/usuarioModel.js: exports found', ok: false, detail: 'models/usuarioModel.js missing'});
}

// 4) controllers/usuariosController.js exists and seems to contain auth functions
const controllerExists = checkFile('controllers/usuariosController.js');
if (controllerExists) {
  const c = read('controllers/usuariosController.js') || '';
  const hasAuth = /login|register|autentica|autentic|authenticate|signin|signup/i.test(c);
  results.push({name: 'controllers/usuariosController.js: auth-related functions', ok: hasAuth, detail: hasAuth ? 'ok' : 'no auth keywords found'});
} else {
  results.push({name: 'controllers/usuariosController.js: auth-related functions', ok: false, detail: 'controllers/usuariosController.js missing'});
}

// 5) package.json has a start script
const pkgExists = checkFile('package.json');
if (pkgExists) {
  try {
    const pkg = JSON.parse(read('package.json'));
    const hasStart = pkg.scripts && (pkg.scripts.start || pkg.scripts.dev || pkg.scripts.server);
    results.push({name: 'package.json: has start/dev script', ok: !!hasStart, detail: hasStart ? 'ok' : 'no start script found'});
  } catch (e) {
    results.push({name: 'package.json: has start/dev script', ok: false, detail: 'package.json unreadable'});
  }
} else {
  results.push({name: 'package.json: has start/dev script', ok: false, detail: 'package.json missing'});
}

// Summarize
console.log('Server smoke test results:');
let failures = 0;
results.forEach(r => {
  const mark = r.ok ? '✓' : '✗';
  console.log(`${mark} ${r.name} — ${r.detail}`);
  if (!r.ok) failures++;
});

if (failures === 0) {
  console.log('\nAll server smoke checks passed.');
  process.exit(0);
} else {
  console.error(`\n${failures} server smoke check(s) failed.`);
  process.exit(1);
}
