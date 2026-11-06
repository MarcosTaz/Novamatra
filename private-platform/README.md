# NOVAMATRA / PRIVATE PORTAL P1

## Architecture
- `/`: public cinematic frontispiece (HTML5 MP4 generated at build + procedural fallback).
- `/acesso`: level-one password gate for project presentations and ideas, read-only.
- `/projetos` and `/projetos/:slug`: authenticated reading.
- `/admin/entrar`: second independent password gate after level one.
- `/admin`: owner-only project/idea/task/reference management, revisions and audit.
- `/inicializar`: one-time setup with out-of-band `SETUP_TOKEN`. Never stores plaintext passwords.
- `/api/projects`: protected read-only JSON with no-store and session checks.

## Deployment
Render web service, Node 22+, build `npm ci && npm run build`, start `npm start`.
Required secrets (environment ONLY, never Git): `DATABASE_URL`, `SETUP_TOKEN` (64-character random hex), `OWNER_EMAIL`.
PostgreSQL dedicated project Neon. Database schema created via CREATE IF NOT EXISTS on startup, seeded with four NOVAMATRA-relevant entries if missing.

## Owner onboarding
1. Deploy to a temporary onrender.com address; do not transfer the production domain yet.
2. Open `/inicializar`; enter the one-time setup token, set two different passwords of 14+ characters.
3. Verify unauthorized requests to `/projetos` and `/admin` are redirected and no private documents are public.
4. Test both gates and mutations as owner. Test login failures and logout.
5. Only then transfer the domain from the existing static Render site to the secure web service; ensure TLS and redirects.
6. Once secure domain is active, consider deleting or restricting the old static site and any previously public project material; a public Git repository remains public regardless of site protection.

## Important limits
- Only intended project metadata is in the public repo; ideas and documents added later live in Postgres.
- No self-service public registrations. First-level password may be shared only at the owner's discretion. Owner-only second level is confidential.
- Security testing, authentication recovery, independent assessment and backup/restore must be completed before production migration.
- Uploaded files are not implemented in P1; use owner-approved HTTPS references. For private documents choose an access-controlled file host.
- If the introductory MP4 build fails, the CSS/canvas fallback remains functional; do not ship a broken hero.