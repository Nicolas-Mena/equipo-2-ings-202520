# Client testing — smoke test

This folder contains a minimal, dependency-free smoke test for the client assets.

How to run

- From the repository root:

  node client/testing/smoke_test.js

- Or from the `client/testing` folder:

  node smoke_test.js

Behavior

- The script performs 5 quick checks: existence of `index.html`, presence of a `<title>` and `<script>` in `index.html`, existence and API-like content in `api.js`, DOM usage in `script.js`, and presence of `style.css`.
- Exit code 0 = all checks passed. Non-zero = one or more checks failed. The script prints human-readable messages for each check.

Notes

- No external dependencies are required — the script runs with the installed Node.js runtime.
- If a test fails, inspect the printed output to identify missing files or missing snippets in the source files.
