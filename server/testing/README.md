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

What each test file does

- `smoke_test.js` (quick CLI smoke test)
  - Purpose: fast, dependency-free checks for the server code layout and basic configuration.
  - Steps:
    1. Verifies `app.js` exists.
    2. Verifies `config/db.js` exists and searches for DB-related keywords (host, user, password, connection, pg, mysql, etc.).
    3. Verifies `models/usuarioModel.js` exists and checks for `export`/`module.exports` patterns.
    4. Verifies `controllers/usuariosController.js` exists and checks for auth-related keywords (`login`, `register`, `authenticate`, etc.).
    5. Verifies `package.json` exists and contains a start/dev script.

- `code.test.js` (Jest-style assertions)
  - Purpose: programmatic assertions using Jest's `expect()` so tests can be run in CI that supports Jest.
  - Tests included:
    1. `app.js` exists and contains `express` or `app.listen` (sanity check that the app bootstraps an HTTP server).
    2. `config/db.js` exists and contains DB keywords (host, user, password, connection, etc.).
    3. `models/usuarioModel.js` exists and contains exports (ESM `export` or CommonJS `module.exports`).
    4. `controllers/usuariosController.js` exists and mentions auth-related keywords.
    5. `package.json` exists and contains a start/dev script.

Run notes

- `smoke_test.js` is dependency-free; run it with `node server/testing/smoke_test.js`.
- `code.test.js` requires Jest. To run it locally you can install Jest and run the tests (example commands):

  1. Install Jest from the repo root: `npm install --save-dev jest`
  2. Run only server tests: `npx jest server/testing --runInBand`

If you'd like I can add `jest` to `devDependencies` and create npm scripts (`test:server`) to make running tests one command.
