Project: projektnacito

Overview
--------
This repository contains a single-page React application and infrastructure config to run it in Docker. The React app lives in the react-app/ folder. There are also n8n workflow definitions and container orchestration files for local deployment.

Quick structure
---------------
- react-app/        - Vite + React + TypeScript frontend
- Dockerfile        - Multi-stage image for the app
- docker-compose.yml - Compose file to run app and dependent services
- nginx.conf        - Example nginx config used in container
- n8n/              - n8n workflows and setup notes

Tech stack
----------
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Tooling: npm (package.json in react-app/), Vite build
- Orchestration: Docker, docker-compose, nginx
- Automation: n8n workflows (JSON files in n8n/)

How to run (development)
-------------------------
1. Open a terminal and cd into react-app/
2. npm install
3. npm run dev

How to build / run in Docker (basic)
-----------------------------------
1. From repo root: docker build -t projektnacito .
2. docker-compose up -d
3. Check nginx.conf and docker-compose.yml to confirm ports and service names.

Notes for contributors
----------------------
- .env and .env.example exist in react-app/ — copy or review before running the app.
- The repository does not contain CI config or tests in the root; add them if required.
- No commit or PR was created by this change (file written locally only).

Pre-push linting policy
-----------------------
- Before pushing to remote, run the TypeScript type-check to ensure no type errors are introduced. Use:

  cd react-app && npm run lint

- You can automate this locally by installing a git pre-push hook (recommended). The hook should run `npm run lint` in the react-app folder and abort the push if linting/type-check fails.
- Recommended simple implementation: use Husky to add a pre-push hook that runs `cd react-app && npm run lint`.
- If you prefer, I can add Husky and configure the hook for you — tell me and I'll add it on a branch and open a PR.

Current status:
- Feature branch `feat/remove-darkmode-email-phone` created and pushed to origin
- Changes committed locally and pushed
- A PR body file (PR_BODY.md) was prepared for easy copy/paste into GitHub

Husky pre-push:
- .husky/pre-push already exists and runs `cd react-app && npm run lint` to enforce type-check before pushes
- Husky is added to devDependencies in react-app/package.json but local `npx husky install` may be required for contributors to enable hooks on their machines

Contact / next steps
--------------------
If you want a more detailed AGENTS.md (per-file responsibilities, run scripts, TODOs, or to open a PR with this file), tell me and I will prepare it.

Recent changes (summary)
------------------------
- Feature branch: feat/remove-darkmode-email-phone
- Husky branch: chore/husky-prepush

Files touched (high level)
- react-app/src/components/ui/EmailInput.tsx — new EmailInput component with real-time validation and aria attributes
- react-app/src/components/ui/PhoneInput.tsx — phone formatting/validation; removed positive success highlight
- react-app/src/components/FinalStep.tsx — replaced raw email input with EmailInput; wired validation into submit flow
- react-app/src/components/ConsultConfigurator.tsx — replaced raw email input, adjusted date/time layout to share available width
- react-app/src/components/ui/index.ts — exported EmailInput
- react-app/src/components/Navigation.tsx — removed ThemeToggle and dark: classes
- react-app/src/context/ThemeContext.tsx — removed (dark mode)

How to open the PR
------------------
I prepared PR_BODY.md in the repo and a PR template. The feature branch is pushed to origin. Open the PR using the GitHub UI or run `gh pr create` locally. Git printed the URL when pushing:

https://github.com/lukaszkotowski-git/projektnacito/pull/new/feat/remove-darkmode-email-phone

Manual QA checklist (static checks run)
-------------------------------------
Automated/static checks performed:
- Type-check (tsc --noEmit) — OK
- Vite build — OK
- Unit tests (PhoneInput/EmailInput) — OK
- Code grep for aria-invalid and layout classes — found expected usages in EmailInput, PhoneInput, and ConsultConfigurator

Manual interactive checks to run locally (recommended):
1. cd react-app && npm install && npm run dev
2. Test PhoneInput: invalid input shows red error and aria-invalid; valid input does not show green success highlight and onChange emits digits-only
3. Test EmailInput: invalid email shows red error and aria-invalid; valid email shows no success message
4. Test ConsultConfigurator: on wide view date and time are on same row and use full width; on mobile they stack
5. Test Navigation: mobile menu works and no ThemeToggle present
