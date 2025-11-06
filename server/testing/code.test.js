const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..'); // server/

describe('Server code quick checks', () => {
  test('app.js exists and mentions express or listen', () => {
    const p = path.join(base, 'app.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(/express|app\.listen|createServer/i.test(content)).toBe(true);
  });

  test('config/db.js exists and contains DB keywords', () => {
    const p = path.join(base, 'config', 'db.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(/host|user|password|database|connection|pg|mysql|mongodb/i.test(content)).toBe(true);
  });

  test('models/usuarioModel.js exists and exports functions', () => {
    const p = path.join(base, 'models', 'usuarioModel.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    // match either ES module export or CommonJS module.exports
    expect(/module\.exports|exports\.|export\s+(async\s+)?function|export\s+default/i.test(content)).toBe(true);
  });

  test('controllers/usuariosController.js exists and mentions auth keywords', () => {
    const p = path.join(base, 'controllers', 'usuariosController.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(/login|register|authenticate|signin|signup|password/i.test(content)).toBe(true);
  });

  test('package.json exists and has a start/dev script', () => {
    const p = path.join(base, 'package.json');
    expect(fs.existsSync(p)).toBe(true);
    const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
    expect(pkg.scripts && (pkg.scripts.start || pkg.scripts.dev || pkg.scripts.server)).toBeTruthy();
  });
});
