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

Contact / next steps
--------------------
If you want a more detailed AGENTS.md (per-file responsibilities, run scripts, TODOs, or to open a PR with this file), tell me and I will prepare it.
