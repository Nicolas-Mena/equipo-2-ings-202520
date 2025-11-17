const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..'); // client/

describe('Client code quick checks', () => {
  test('index.html exists and has a <title> and a <script> tag', () => {
    const p = path.join(base, 'index.html');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(content).toMatch(/<title>.*<\/title>/i);
    expect(content).toMatch(/<script[^>]*src=["'][^"']+["'][^>]*>/i);
  });

  test('api.js exists and contains API usage patterns', () => {
    const p = path.join(base, 'api.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(/fetch\(|axios\.|API_URL|apiUrl|endpoint/i.test(content)).toBe(true);
  });

  test('script.js exists and contains DOM usage', () => {
    const p = path.join(base, 'script.js');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    expect(/document\.|querySelector\(|getElementById\(|addEventListener\(/i.test(content)).toBe(true);
  });

  test('style.css exists and contains at least one selector', () => {
    const p = path.join(base, 'style.css');
    expect(fs.existsSync(p)).toBe(true);
    const content = fs.readFileSync(p, 'utf8');
    // crude check for a selector or a rule
    expect(/[^{}]+\{[^}]*\}/.test(content)).toBe(true);
  });
});
