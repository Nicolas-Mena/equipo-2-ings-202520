## Evidence — MVP progress for this sprint

Date: 24 October 2025

Summary
-------
This section provides a concise, verifiable summary in English of the MVP progress achieved during the current sprint. The attached screenshot (provided by the team) lists the functional and non-functional requirements targeted in this sprint. The repository contains both frontend and backend artifacts that demonstrate implementation progress.

Key implemented items (requirements referenced in the screenshot)
----------------------------------------------------------------
- RF-001 — EPS registration: Completed. Backend model and controller routes were prepared to register EPS entities and the frontend includes a registration form for EPS.
- RF-002 — Login (Inicio de sesión): Completed. User authentication flow implemented; users can log in and obtain the authenticated session required for protected actions.
- RF-003 — Medication registration: Completed. Frontend form and backend endpoint to add new medicines to the system are present.
- RF-004 — Stock update (Actualización de stock): Completed. The system supports updating medication stock levels from the UI and persisting changes to the database.
- RF-006 — Public consultation (Consulta pública): Completed. Public (unauthenticated) views are available to consult medication information.
- RF-013 — Main panel / Dashboard (Panel principal): Completed. A dashboard / main panel is available after login showing key actions and summaries.
- RF-017 — Logout (Cerrar sesión): Completed. Users can log out and the session is cleared.
- RF-019 — Improved search (Buscador mejorado): Completed. Search functionality improved to allow searching by medication name and other filters.
- RNF-004 — Data security (Seguridad de datos): Partially completed / implemented basic measures. Passwords are hashed and stored securely; configuration files and authentication checks are in place. Further hardening and review recommended.
- RNF-006 — Usability (Usabilidad): Completed (basic). Frontend layout improvements and user flows were implemented to improve discoverability and ease-of-use.

Repository evidence (representative files)
---------------------------------------
- Backend: `server/app.js`, `server/controllers/usuariosController.js`, `server/models/usuarioModel.js`, `server/migrarPasswords.js` — these files show server setup, user handling and password migration/hashing utilities.
- Frontend: `client/index.html`, `client/script.js`, `client/api.js`, `client/style.css` — these files include the UI forms, search and API usage used to interact with the backend endpoints.
- Database/config: `server/config/db.js` and `database/script.sql` — database connection and schema artifacts used during development and testing.

How it was tested (manual verification)
-------------------------------------
1. EPS registration: Submitted EPS registration form and verified record exists in the database.
2. Login/Logout: Created a test user, logged in via the login form, verified dashboard access, then logged out and verified session removal.
3. Medication registration and stock update: Created a medication entry and updated stock values; confirmed values persisted in the database and reflected in the UI.
4. Public consultation: Visited the public medicines list without authentication and confirmed data visibility.
5. Search: Used the improved search to locate medications by name and filter results; verified accuracy and UI feedback.
6. Security: Confirmed passwords are stored hashed (see `server/migrarPasswords.js`) and that authenticated routes are protected.

Acceptance criteria (how we consider items done)
----------------------------------------------
- Feature is implemented in both frontend and backend and reachable via UI flows.
- The backed data is persisted to the database and can be verified using the DB scripts or queries.
- Basic manual tests for success and failure cases were executed (happy path and a couple of negative cases).

Known limitations and next steps
-------------------------------
- RNF-004 (data security): perform a security review and add rate-limiting, stronger session management and HTTPS enforcement in deployment.
- Automated tests: add unit and integration tests for core flows (authentication, medication CRUD, search) to prevent regressions.
- Performance & scalability: add pagination for large medication lists and optimize DB queries.
- Additional UX improvements: small accessibility checks and responsive layout polishing.

Attachments & evidence
----------------------
- Screenshot provided by the team (see attachment). It lists the RF and RNF items addressed in this sprint.

Conclusion
----------
This sprint delivered the core MVP flows required for basic operation: user authentication, EPS and medication management, stock updates, a public consultation view, a usable dashboard and improved search. The repository contains the relevant frontend and backend artifacts to validate these claims. Next sprint should focus on automated testing, security hardening and additional UX polish.

