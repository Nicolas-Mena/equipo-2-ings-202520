# Client testing — smoke test

This folder contains a minimal, dependency-free smoke test for the client assets.

How to run

- From the repository root:

  node client/testing/smoke_test.js

- Or from the `client/testing` folder:

  node smoke_test.js

What the smoke test checks

- index.html exists
- index.html contains a <title> element and at least one <script> tag
- api.js exists and contains typical API-call patterns (fetch/axios/base URL)
- script.js exists and contains basic DOM usage (document., querySelector, addEventListener)
- style.css exists

Behavior and output

- Each check prints a ✓ (pass) or ✗ (fail) with a short detail message.
- Exit code 0 = all checks passed. Non-zero = one or more checks failed.

Notes

- The smoke test is fast and safe: it only inspects files and text content — it does not run the server or open network/DB connections.
- The earlier example unit tests (mathFunctions.test.js) were removed per project request; this README reflects the current testing setup.
- If you'd like full unit tests (Jest) or CI integration, I can add them next.

What each test file does

- `smoke_test.js` (quick CLI smoke test)
  - Purpose: fast, dependency-free checks for the client asset files. Useful for reviewers or CI pre-checks.
  - Steps:
    1. Verifies `index.html` exists.
    2. Reads `index.html` and checks for a `<title>` tag and at least one `<script>` tag.
    3. Verifies `api.js` exists and searches it for common API call patterns (e.g. `fetch(`, `axios.`, `API_URL`).
    4. Verifies `script.js` exists and looks for DOM usage (e.g. `document.`, `querySelector`, `addEventListener`).
    5. Verifies `style.css` exists.

- `code.test.js` (Jest-style assertions)
  - Purpose: programmatic assertions using Jest's `expect()` so tests can be included in CI pipelines that run Jest.
  - Tests included:
    1. `index.html` exists and contains a `<title>` and `<script>` tag (same goal as the smoke test but expressed as `expect()` assertions).
    2. `api.js` exists and contains API usage patterns (asserted via `expect(content).toMatch(...)`).
    3. `script.js` exists and contains DOM usage (`expect(...).toBe(true)`).
    4. `style.css` exists and contains at least one CSS rule.

Run notes

- `smoke_test.js` is dependency-free; run it with `node client/testing/smoke_test.js`.
- `code.test.js` requires Jest. To run it locally you can install Jest and run the tests (example commands):

  1. Install Jest from the repo root: `npm install --save-dev jest`
  2. Run only client tests: `npx jest client/testing --runInBand`

If you'd like I can add `jest` to `devDependencies` and create npm scripts (`test:client`) to make running tests one command.

