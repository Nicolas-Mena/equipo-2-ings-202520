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

