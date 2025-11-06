# Server testing — smoke test

This folder contains a minimal, dependency-free smoke test for important server files.

How to run

- From the repository root (recommended):

  node server/testing/smoke_test.js

- Or from the `server/testing` folder:

  node smoke_test.js

What the smoke test checks

1. `app.js` exists.
2. `config/db.js` exists and appears to contain DB-related keywords (host, user, password, connection, etc.).
3. `models/usuarioModel.js` exists and contains exports (ES module `export` or CommonJS `module.exports`).
4. `controllers/usuariosController.js` exists and contains auth-related keywords (login/register/authenticate/signin/etc.).
5. `package.json` exists and contains a start/dev script.

Behavior and output

- Each check prints a ✓ (pass) or ✗ (fail) with a short detail message.
- Exit code 0 = all checks passed. Non-zero = one or more checks failed.

Notes

- The smoke test is intentionally lightweight: it only inspects files and text content. It does not start the server or open database connections.
- The earlier example unit tests (mathFunctions.test.js) were removed per project request; this README reflects the current testing setup.
- If you want these checks run automatically in CI, I can add a simple pipeline job or npm scripts to make running them easier.
