# Server testing — smoke test

This folder contains a minimal, dependency-free smoke test for important server files.

How to run

- From the repository root (recommended CommonJS run):

  node server/testing/smoke_test.cjs

- Or from the `server/testing` folder:

  node smoke_test.cjs

- If your environment is configured for CommonJS you can also try the JS variant:

  node server/testing/smoke_test.js

  Note: some projects set "type": "module" in `server/package.json`; when that is present Node treats `.js` files as ES modules and `require()` will fail. The `.cjs` file forces CommonJS and is recommended for these smoke checks.

Behavior

- The script performs 5 quick checks:
  1. `app.js` exists.
  2. `config/db.js` exists and contains typical DB config keywords.
  3. `models/usuarioModel.js` exists and exports something.
  4. `controllers/usuariosController.js` exists and contains auth-related keywords (login/register/etc.).
  5. `package.json` contains a start/dev script.

- Exit code 0 = all checks passed. Non-zero = one or more checks failed.

Notes

- The script is intentionally lightweight and does not try to start the server or open DB connections — it's a fast smoke test that verifies the presence and minimal structure of key files so CI or reviewers can get quick feedback.
