# Migracja tłumaczeń z kodu do Directus CMS

## TL;DR

> **Quick Summary**: Przenieść tłumaczenia z hardcoded `pl.ts` do Directus CMS, zachowując istniejący interfejs `t()` i zero zmian w komponentach React. Directus jako source-of-truth, `pl.ts` jako offline fallback.
> 
> **Deliverables**:
> - Kolekcja `translations` w Directus z 12 sekcjami (JSON per sekcja)
> - Public role z read-only dostępem
> - Nowy `i18n/index.ts` z fetch + localStorage cache + deep-merge z fallback
> - Zmienna `VITE_DIRECTUS_URL` w `.env`
> - Plik `pl.ts` zachowany jako offline fallback
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 (Directus schema) → Task 3 (seed data) → Task 5 (i18n rewrite) → Task 7 (verify)

---

## Context

### Original Request
Użytkownik ma czystą instancję Directus CMS pod `https://directus.projektnacito.com.pl/` i chce przenieść tłumaczenia z kodu TypeScript (`pl.ts`) do Directus, żeby móc je edytować z panelu administracyjnego zamiast w plikach źródłowych.

### Interview Summary
**Key Discussions**:
- **Języki**: Tylko polski na start, w przyszłości może angielski
- **Biblioteka i18n**: Zachować custom `t()` — zero zmian w komponentach
- **Dynamiczne teksty**: Szablony z placeholderami `{{param}}`, replace w kodzie
- **Tablice (summaryItems)**: JSON field w Directus — proste, bez relacji
- **Częstotliwość zmian**: Rzadko (raz na tydzień+) — agresywny cache
- **Typ aplikacji**: Czysty SPA (Vite + static build)
- **Admin token**: Użytkownik ma/wygeneruje token API
- **Granularność edycji**: JSON per sekcja (12 wierszy w Directus)

**Research Findings**:
- Directus REST API: `GET /items/translations?filter[language][_eq]=pl`
- Plain `fetch` wystarczy (bez `@directus/sdk`)
- localStorage jako warstwa cache z TTL
- Deep-merge z fallback dla odporności na błędy

### Metis Review
**Identified Gaps** (addressed):
- `t()` zwraca CAŁY obiekt `Translations` (nie key-value lookup) — rekonstrukcja obiektu z flat JSON wymagana
- 5 wartości-funkcji musi być zrekonstruowanych z szablonów `{{param}}`
- `finalStep.subtitle` interpoluje INNE tłumaczenie (packageName) — param to string, nie index
- Funkcje w `premium` używają `idx + 1` — szablon musi to uwzględnić
- `premiumCost` zawiera `\n` — Directus textarea musi to zachować
- CORS musi być skonfigurowany na Directus dla domeny aplikacji
- Race condition na first load — fallback rozwiązuje problem
- Malformed JSON z Directus — try-catch + fallback per sekcja

---

## Work Objectives

### Core Objective
Przenieść źródło tłumaczeń z pliku `pl.ts` do Directus CMS, zachowując identyczny interfejs `t(): Translations` i zero zmian w komponentach React.

### Concrete Deliverables
- Kolekcja `translations` w Directus z 12 wierszami (JSON per sekcja per język)
- Public role read-only na kolekcji `translations`
- Plik `react-app/src/i18n/index.ts` — przepisany na fetch z Directus + cache + fallback
- Plik `react-app/src/i18n/buildTranslations.ts` — rekonstrukcja obiektu `Translations` z danych Directus
- Zmienne `VITE_DIRECTUS_URL` w `.env` i `.env.example`
- Plik `pl.ts` zachowany bez zmian jako offline fallback

### Definition of Done
- [x] `npx tsc --noEmit` przechodzi bez błędów
- [x] `npm run build` w `react-app/` kończy się sukcesem
- [x] `npm run lint` w `react-app/` przechodzi
- [x] Zero zmian w plikach komponentów (10 plików importujących z `../i18n`)
- [x] Aplikacja renderuje poprawnie z danymi z Directus
- [x] Aplikacja renderuje poprawnie gdy Directus jest nieosiągalny (fallback)
- [x] Tłumaczenia edytowalne z panelu Directus

### Must Have
- Interfejs `t(): Translations` identyczny — typ `Translations` = `typeof pl`
- Synchroniczny zwrot danych z `t()` — nigdy loading state
- Bundled fallback (pl.ts) zawsze dostępny offline
- Deep-merge Directus + fallback (brak brakujących kluczy)
- Rekonstrukcja 5 funkcji z szablonów `{{param}}`
- JSON-parse dla 5 tablic (summaryItems itp.)
- Try-catch na JSON.parse i localStorage
- Cache TTL 1 godzina w localStorage

### Must NOT Have (Guardrails)
- ❌ Modyfikacja ŻADNEGO z 10 plików komponentów
- ❌ React Context, Provider, hooks, Suspense dla tłumaczeń
- ❌ Loading states, spinnery, skeleton UI
- ❌ Multi-language switching UI
- ❌ `@directus/sdk` — plain fetch only
- ❌ Generowanie TypeScript types z Directus schema
- ❌ Relacyjne tabele w Directus — flat collection + JSON fields
- ❌ Pliki testowe (brak infrastruktury testowej)
- ❌ Over-engineering: template engine, interpolation library, pluralization
- ❌ Nadmiarowe komentarze, JSDoc, abstrakcje

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: N/A
- **QA via**: curl (API), Playwright (UI), tsc/build (compilation)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Directus API**: Use Bash (curl) — Send requests, assert status + response fields
- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Compilation**: Use Bash (tsc, build, lint) — Run commands, assert exit codes

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — Directus setup + code foundations):
├── Task 1: Create Directus collection schema + public role [quick]
├── Task 2: Create buildTranslations.ts reconstruction module [deep]
└── Task 3: Seed Directus with translation data from pl.ts [quick]
    (Task 3 depends on Task 1)

Wave 2 (After Wave 1 — React integration):
├── Task 4: Add VITE_DIRECTUS_URL to .env files [quick]
├── Task 5: Rewrite i18n/index.ts with fetch + cache + fallback [deep]
└── Task 6: Verify compilation and lint (tsc + build + lint) [quick]
    (Task 5 depends on Tasks 2, 4)
    (Task 6 depends on Task 5)

Wave 3 (After Wave 2 — verification):
└── Task 7: Full QA — Playwright + curl + offline fallback [unspecified-high]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 3 → Task 5 → Task 6 → Task 7 → F1-F4
Parallel Speedup: ~40% faster than sequential
Max Concurrent: 3 (Wave 1: Tasks 1+2 parallel, Task 3 after 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 3, 5 |
| 2 | — | 5 |
| 3 | 1 | 5, 7 |
| 4 | — | 5 |
| 5 | 2, 3, 4 | 6 |
| 6 | 5 | 7 |
| 7 | 6 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 → `quick`, T2 → `deep`, T3 → `quick`
- **Wave 2**: 3 tasks — T4 → `quick`, T5 → `deep`, T6 → `quick`
- **Wave 3**: 1 task — T7 → `unspecified-high` + `playwright` skill
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` + `playwright`, F4 → `deep`

---

## TODOs

- [x] 1. Create Directus collection `translations` + configure public role

  **What to do**:
  - Via Directus Admin API (using admin token from `.env` or user-provided):
    1. Create collection `translations` with fields:
       - `id` (auto-increment, primary key)
       - `language` (string, default `"pl"`, indexed)
       - `section` (string, indexed) — one of: `common`, `nav`, `main`, `cito`, `premium`, `consult`, `finalStep`, `success`, `about`, `offerOverview`, `footer`, `aria`
       - `data` (JSON field) — contains ALL key-value pairs for that section as a JSON object
       - `sort` (integer, optional) — for ordering sections
    2. Add unique constraint on `(language, section)`
    3. Configure Public Role:
       - Grant `read` permission on `translations` collection
       - Fields: allow all (`*`)
       - Filter: none (public read of all rows)
    4. Verify CORS allows requests from `projektnacito.com.pl` origin (check Directus env `CORS_ORIGIN`)
  - All operations via `curl` to Directus API with admin Bearer token
  - If CORS is not configured, document the required env change for user

  **Must NOT do**:
  - Do NOT create junction tables or relational fields
  - Do NOT create Directus Translations Interface (we use simple JSON field, not the built-in i18n)
  - Do NOT modify any React code

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: API calls only, no complex logic
  - **Skills**: []
    - No special skills needed — pure curl/API operations

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3 (seeding needs collection to exist)
  - **Blocked By**: None

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/src/i18n/pl.ts` — Source of truth for section names (lines 6, 23, 42, 62, 91, 119, 139, 157, 168, 176, 229, 239). Read this file to know exactly which 12 sections exist.

  **API/Type References**:
  - Directus API docs for collection creation: `POST /collections` with `collection`, `fields`, `schema` body
  - Directus API for permissions: `POST /permissions` with `role: null` (public), `collection`, `action: "read"`

  **External References**:
  - Directus REST API: https://docs.directus.io/reference/system/collections.html
  - Directus Permissions: https://docs.directus.io/reference/system/permissions.html

  **WHY Each Reference Matters**:
  - `pl.ts` provides the exact section names that become rows in Directus — must match exactly
  - Directus API docs show the exact POST body format for creating collections + fields + permissions

  **Acceptance Criteria**:

  - [x] Collection `translations` exists in Directus
  - [x] Public role has read access to `translations`
  - [x] `curl -s https://directus.projektnacito.com.pl/items/translations` returns HTTP 200 (not 403)

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Collection accessible without auth
    Tool: Bash (curl)
    Preconditions: Directus running, collection created, public role configured
    Steps:
      1. curl -s -o /dev/null -w '%{http_code}' https://directus.projektnacito.com.pl/items/translations
      2. Assert HTTP status is 200
      3. curl -s https://directus.projektnacito.com.pl/items/translations | jq '.data'
      4. Assert response has `data` array (may be empty at this point)
    Expected Result: HTTP 200, response body contains `{"data": [...]}`
    Failure Indicators: HTTP 403 (public role not configured), HTTP 404 (collection not created)
    Evidence: .sisyphus/evidence/task-1-public-access.json

  Scenario: Collection schema has correct fields
    Tool: Bash (curl)
    Preconditions: Admin token available
    Steps:
      1. curl -s -H 'Authorization: Bearer <ADMIN_TOKEN>' https://directus.projektnacito.com.pl/fields/translations | jq '[.data[].field]'
      2. Assert fields include: id, language, section, data
    Expected Result: Field list contains all required fields
    Failure Indicators: Missing fields, wrong field types
    Evidence: .sisyphus/evidence/task-1-schema.json
  ```

  **Commit**: NO (Directus config only, no code changes)

---

- [x] 2. Create `buildTranslations.ts` — reconstruction module

  **What to do**:
  - Create file `react-app/src/i18n/buildTranslations.ts`
  - Implement `buildTranslations(sections: DirectusSection[]): Translations` function that:
    1. Takes array of `{ section: string, data: Record<string, unknown> }` from Directus
    2. For each section, assigns `data` to the corresponding property on a `Translations`-shaped object
    3. For FUNCTION-type keys (exactly these 5), reconstructs functions from template strings:
       - `premium.removeKitchenAriaLabel`: template `"Usuń kuchnię {{index1}}"` → `(idx: number) => template.replace('{{index1}}', String(idx + 1))`
       - `premium.removeBathAriaLabel`: template `"Usuń łazienkę {{index1}}"` → same pattern
       - `premium.kitchenAriaLabel`: template `"Powierzchnia kuchni {{index1}} (m²)"` → same pattern
       - `premium.bathAriaLabel`: template `"Powierzchnia łazienki {{index1}} (m²)"` → same pattern
       - `finalStep.subtitle`: template `"Zostaw dane dla pakietu {{packageName}}."` → `(packageName: string) => template.replace('{{packageName}}', packageName)`
    4. For ARRAY-type keys (summaryItems, citoItems, premiumItems, consultItems), JSON-parses string values if they come as strings (Directus JSON fields may already return parsed)
    5. Deep-merges with bundled `pl` fallback — Directus data overrides, fallback fills any gaps
    6. Wraps ALL JSON.parse calls in try-catch — falls back to bundled value on parse error
    7. Returns object satisfying the `Translations` type
  - Export `DirectusSection` type: `{ section: string; data: Record<string, unknown> }`
  - Import `pl` and `Translations` from `./pl`
  - The KNOWN_FUNCTIONS map should be a const object listing the 5 function keys and their param names

  **Must NOT do**:
  - Do NOT build a generic template engine — hardcode the 5 known function keys
  - Do NOT import any external libraries
  - Do NOT modify `pl.ts`
  - Do NOT create React hooks or context

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core logic requiring careful type reconstruction and edge case handling
  - **Skills**: []
    - No special skills needed — pure TypeScript module

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 5 (i18n rewrite imports this module)
  - **Blocked By**: None

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/src/i18n/pl.ts:99-102` — The 4 `premium` function signatures with `idx + 1` pattern. Executor MUST see these to understand that `idx + 1` is used (not raw `idx`).
  - `react-app/src/i18n/pl.ts:141` — `finalStep.subtitle` takes `packageName: string` (not a number). Different param type than premium functions.
  - `react-app/src/i18n/pl.ts:78-85` — `cito.summaryItems` array structure `{title: string, desc: string}[]`. All 5 array fields follow this shape.
  - `react-app/src/i18n/pl.ts:209` — `premiumCost` contains `\n` newlines. Verify these survive JSON round-trip.

  **API/Type References**:
  - `react-app/src/i18n/pl.ts:249` — `export type Translations = typeof pl` — the target type that `buildTranslations` must satisfy
  - `react-app/src/i18n/index.ts:1-3` — Import pattern: `import { pl, Translations } from './pl'`

  **External References**:
  - None needed — pure TypeScript, no libraries

  **WHY Each Reference Matters**:
  - `pl.ts:99-102`: Without seeing `idx + 1`, executor might use raw `idx` in templates — breaking aria labels
  - `pl.ts:141`: `subtitle` param is `string` not `number` — different reconstruction logic needed
  - `pl.ts:78-85`: Array structure must be preserved exactly for `.map()` in components
  - `pl.ts:249`: The `Translations` type IS `typeof pl` — reconstruction must match structurally

  **Acceptance Criteria**:

  - [x] File `react-app/src/i18n/buildTranslations.ts` exists
  - [x] `npx tsc --noEmit` passes (in react-app/)
  - [x] Function reconstructs the 5 known functions correctly
  - [x] Deep-merge with fallback fills any missing keys
  - [x] JSON parse errors fall back gracefully

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Happy path — full Directus data builds valid Translations object
    Tool: Bash (bun/node REPL or temporary test script)
    Preconditions: buildTranslations.ts compiled successfully
    Steps:
      1. Create a temporary script that imports buildTranslations and pl
      2. Call buildTranslations with mock data matching all 12 sections
      3. Verify returned object has all sections (common, nav, main, etc.)
      4. Verify premium.removeKitchenAriaLabel(0) returns 'Usuń kuchnię 1'
      5. Verify premium.kitchenAriaLabel(2) returns 'Powierzchnia kuchni 3 (m²)'
      6. Verify finalStep.subtitle('Pakiet na Cito') returns 'Zostaw dane dla pakietu Pakiet na Cito.'
      7. Verify cito.summaryItems is an array of 6 items with title and desc
      8. Delete the temporary script
    Expected Result: All assertions pass, type-safe Translations object returned
    Failure Indicators: TypeError on function call, undefined sections, wrong array length
    Evidence: .sisyphus/evidence/task-2-build-translations-happy.txt

  Scenario: Partial data — missing section falls back to bundled pl
    Tool: Bash (bun/node REPL or temporary test script)
    Preconditions: buildTranslations.ts compiled
    Steps:
      1. Call buildTranslations with data for only 3 of 12 sections
      2. Verify the missing 9 sections are filled from bundled pl
      3. Verify returned object still satisfies Translations type (all keys present)
    Expected Result: Complete Translations object with mix of Directus + fallback data
    Failure Indicators: undefined properties for missing sections
    Evidence: .sisyphus/evidence/task-2-build-translations-fallback.txt

  Scenario: Malformed JSON in array field
    Tool: Bash (bun/node REPL)
    Preconditions: buildTranslations.ts compiled
    Steps:
      1. Call buildTranslations with a section where summaryItems value is '{invalid json'
      2. Verify it falls back to bundled summaryItems instead of throwing
    Expected Result: Graceful fallback, no thrown error
    Failure Indicators: Unhandled exception, empty array
    Evidence: .sisyphus/evidence/task-2-build-translations-malformed.txt
  ```

  **Commit**: YES (groups with Task 5)
  - Message: `feat(i18n): migrate translations source from hardcoded pl.ts to Directus CMS`
  - Files: `src/i18n/buildTranslations.ts`
  - Pre-commit: `cd react-app && npm run lint`

---

- [x] 3. Seed Directus with translation data from `pl.ts`

  **What to do**:
  - Read `react-app/src/i18n/pl.ts` and extract each of the 12 sections
  - For each section, create a POST request to Directus API:
    ```
    POST /items/translations
    Authorization: Bearer <ADMIN_TOKEN>
    Content-Type: application/json
    {
      "language": "pl",
      "section": "<section_name>",
      "data": { <all key-value pairs for this section> },
      "sort": <order_index>
    }
    ```
  - For FUNCTION-type values in sections `premium` and `finalStep`, store as TEMPLATE strings:
    - `premium.removeKitchenAriaLabel` → `"Usuń kuchnię {{index1}}"`
    - `premium.removeBathAriaLabel` → `"Usuń łazienkę {{index1}}"`
    - `premium.kitchenAriaLabel` → `"Powierzchnia kuchni {{index1}} (m²)"`
    - `premium.bathAriaLabel` → `"Powierzchnia łazienki {{index1}} (m²)"`
    - `finalStep.subtitle` → `"Zostaw dane dla pakietu {{packageName}}."`
  - For ARRAY-type values, store as JSON arrays directly in the `data` JSON field (Directus JSON field handles nested objects)
  - For strings containing `\n` (like `premiumCost`), ensure newlines are preserved
  - Verify all 12 sections are created

  **Must NOT do**:
  - Do NOT modify `pl.ts` or any React code
  - Do NOT create a migration script file — do it inline with curl commands
  - Do NOT re-create the collection (Task 1 already did that)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Data entry via curl — repetitive but straightforward
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (after Task 1)
  - **Blocks**: Task 5 (i18n rewrite needs data in Directus), Task 7 (QA)
  - **Blocked By**: Task 1 (collection must exist)

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/src/i18n/pl.ts:4-247` — ENTIRE file. Every key-value pair must be extracted and POSTed to Directus. Executor must read this file completely.

  **API/Type References**:
  - Directus REST: `POST /items/translations` with body `{language, section, data, sort}`

  **External References**:
  - Directus Items API: https://docs.directus.io/reference/items.html

  **WHY Each Reference Matters**:
  - `pl.ts` is the ONLY source of truth for what data to seed. Missing any section = missing translations in app.

  **Acceptance Criteria**:

  - [x] 12 rows in `translations` collection (one per section)
  - [x] All string values match `pl.ts` exactly
  - [x] Function-type values stored as template strings with `{{param}}`
  - [x] Array-type values stored as JSON arrays
  - [x] `premiumCost` value contains newlines

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All 12 sections exist with correct data
    Tool: Bash (curl)
    Preconditions: Task 1 completed (collection exists), admin token available
    Steps:
      1. curl -s https://directus.projektnacito.com.pl/items/translations?filter[language][_eq]=pl | jq '.data | length'
      2. Assert count is 12
      3. curl -s https://directus.projektnacito.com.pl/items/translations?filter[language][_eq]=pl | jq '[.data[].section] | sort'
      4. Assert sections are: about, aria, cito, common, consult, finalStep, footer, main, nav, offerOverview, premium, success
    Expected Result: 12 rows, all sections present
    Failure Indicators: Count != 12, missing section names
    Evidence: .sisyphus/evidence/task-3-sections-count.json

  Scenario: Template strings stored correctly for function-type values
    Tool: Bash (curl)
    Preconditions: Data seeded
    Steps:
      1. curl -s 'https://directus.projektnacito.com.pl/items/translations?filter[section][_eq]=premium&filter[language][_eq]=pl' | jq '.data[0].data.removeKitchenAriaLabel'
      2. Assert value is 'Usuń kuchnię {{index1}}'
      3. curl -s 'https://directus.projektnacito.com.pl/items/translations?filter[section][_eq]=finalStep&filter[language][_eq]=pl' | jq '.data[0].data.subtitle'
      4. Assert value is 'Zostaw dane dla pakietu {{packageName}}.'
    Expected Result: Template strings with {{placeholders}} stored correctly
    Failure Indicators: Raw function code stored, missing placeholders
    Evidence: .sisyphus/evidence/task-3-templates.json

  Scenario: Array values stored as JSON arrays
    Tool: Bash (curl)
    Preconditions: Data seeded
    Steps:
      1. curl -s 'https://directus.projektnacito.com.pl/items/translations?filter[section][_eq]=cito&filter[language][_eq]=pl' | jq '.data[0].data.summaryItems | length'
      2. Assert count is 6
      3. curl -s 'https://directus.projektnacito.com.pl/items/translations?filter[section][_eq]=cito&filter[language][_eq]=pl' | jq '.data[0].data.summaryItems[0].title'
      4. Assert value is 'Układ funkcjonalny'
    Expected Result: summaryItems is a JSON array of 6 objects with title+desc
    Failure Indicators: String instead of array, wrong count, missing title/desc
    Evidence: .sisyphus/evidence/task-3-arrays.json
  ```

  **Commit**: NO (Directus data only, no code changes)


- [x] 4. Add `VITE_DIRECTUS_URL` to `.env` files

  **What to do**:
  - Add `VITE_DIRECTUS_URL=https://directus.projektnacito.com.pl` to `react-app/.env`
  - Add `VITE_DIRECTUS_URL=https://directus.projektnacito.com.pl` to `react-app/.env.example` with comment
  - Follow existing pattern from `.env.example` (line 5: `VITE_API_URL=...`)

  **Must NOT do**:
  - Do NOT add admin tokens to .env (those are for manual/CI use only)
  - Do NOT modify any other files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two-line edit in two files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 2, 3)
  - **Parallel Group**: Can run anytime in Wave 1 or 2
  - **Blocks**: Task 5
  - **Blocked By**: None

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/.env.example:4-5` — Existing env var pattern: comment line + `VITE_` prefixed var. Follow this exact format.
  - `react-app/.env` — Current env file. Add the new var below existing ones.

  **WHY Each Reference Matters**:
  - `.env.example` shows the naming convention (`VITE_` prefix required for Vite to expose to client)

  **Acceptance Criteria**:

  - [x] `react-app/.env` contains `VITE_DIRECTUS_URL`
  - [x] `react-app/.env.example` contains `VITE_DIRECTUS_URL` with descriptive comment
  - [x] Value format matches: `https://directus.projektnacito.com.pl`

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Env var is accessible in Vite
    Tool: Bash
    Preconditions: .env file updated
    Steps:
      1. grep 'VITE_DIRECTUS_URL' react-app/.env
      2. Assert line exists with correct URL
      3. grep 'VITE_DIRECTUS_URL' react-app/.env.example
      4. Assert line exists with correct URL
    Expected Result: Both files contain the env var
    Failure Indicators: Missing var, wrong URL, missing VITE_ prefix
    Evidence: .sisyphus/evidence/task-4-env-vars.txt
  ```

  **Commit**: YES (groups with Task 5)
  - Message: `feat(i18n): migrate translations source from hardcoded pl.ts to Directus CMS`
  - Files: `.env.example` (NOT `.env` — never commit .env)
  - Pre-commit: N/A

---

- [x] 5. Rewrite `i18n/index.ts` — fetch from Directus + localStorage cache + fallback

  **What to do**:
  - Rewrite `react-app/src/i18n/index.ts` to:
    1. **Keep existing exports**: `t()`, `setLanguage()`, `getLanguage()`, `Language` type, `Translations` type, `pl`
    2. **`t()` remains synchronous**: Always returns a `Translations` object immediately, never undefined/null/Promise
    3. **On module load** (top-level):
       a. Initialize `currentTranslations` with bundled `pl` (immediate fallback)
       b. Check localStorage for cached translations:
          - Key: `translations_pl` (or `translations_${lang}` for future multi-lang)
          - If cache exists AND not expired (TTL 1 hour): parse and use `buildTranslations()` to reconstruct, set as `currentTranslations`
          - If cache expired or missing: use bundled `pl`, trigger background fetch
       c. Start background fetch from Directus (fire-and-forget):
          - `fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/translations?filter[language][_eq]=${currentLanguage}`)` 
          - On success: save to localStorage with timestamp, reconstruct via `buildTranslations()`, update `currentTranslations`
          - On error: silently fail (console.warn at most), keep using fallback
    4. **`t()` implementation**: `return currentTranslations`
    5. **Cache structure in localStorage**:
       ```json
       {
         "timestamp": 1709123456789,
         "sections": [ {"section": "common", "data": {...}}, ... ]
       }
       ```
    6. **Error resilience**:
       - `fetch` wrapped in try-catch (network errors)
       - `JSON.parse` of localStorage wrapped in try-catch (corrupt cache)
       - `localStorage.setItem` wrapped in try-catch (quota exceeded)
       - Every error silently falls back to bundled `pl`
  - Import `buildTranslations` from `./buildTranslations`
  - Import `pl` from `./pl`
  - Keep `pl.ts` completely unchanged

  **CRITICAL BEHAVIOR CONSTRAINT**:
  - `t()` is called synchronously in component render functions
  - It MUST return a complete `Translations` object on the VERY FIRST call
  - Background fetch updates `currentTranslations` for NEXT calls to `t()`
  - There is NO re-render trigger when fetch completes — translations update on next navigation/re-render
  - This is acceptable because changes are rare (weekly)

  **Must NOT do**:
  - Do NOT add React.useState, useEffect, useContext, createContext, Provider
  - Do NOT add any npm dependencies
  - Do NOT modify the `t()` return type
  - Do NOT add loading states or async returns
  - Do NOT modify `pl.ts`
  - Do NOT modify any component files

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core integration logic with cache, fetch, error handling, and type safety
  - **Skills**: []
    - No special skills needed — pure TypeScript

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential after Wave 1)
  - **Blocks**: Task 6 (compilation check)
  - **Blocked By**: Tasks 2 (buildTranslations), 3 (Directus data), 4 (.env)

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/src/i18n/index.ts:1-25` — ENTIRE current file. Executor must preserve the EXACT export signatures: `t(): Translations`, `setLanguage(lang: Language): void`, `getLanguage(): Language`, `Language` type, `Translations` type, `pl` value. Read this file first.
  - `react-app/src/i18n/pl.ts:1,249` — `pl` object and `Translations` type exports. Unchanged.
  - `react-app/.env.example:5` — Pattern for `import.meta.env.VITE_*` usage in Vite apps.

  **API/Type References**:
  - `react-app/src/i18n/buildTranslations.ts` (created in Task 2) — `buildTranslations(sections: DirectusSection[]): Translations`
  - Directus REST: `GET /items/translations?filter[language][_eq]=pl` returns `{ data: [{section, data, ...}] }`

  **WHY Each Reference Matters**:
  - `index.ts` current file: Must preserve ALL exports exactly — 10 components depend on `import { t } from '../i18n'`
  - `buildTranslations.ts`: This is the reconstruction layer — converts flat Directus rows to nested Translations object
  - `.env.example`: Shows how Vite exposes env vars via `import.meta.env`

  **Acceptance Criteria**:

  - [x] `react-app/src/i18n/index.ts` exports: `t`, `setLanguage`, `getLanguage`, `Language`, `Translations`, `pl`
  - [x] `t()` returns `Translations` synchronously on first call (never undefined)
  - [x] Background fetch fires on module load
  - [x] localStorage cache written after successful fetch
  - [x] Cache TTL is 1 hour
  - [x] Fetch errors silently fall back to bundled `pl`
  - [x] `npx tsc --noEmit` passes

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Happy path — app loads translations from Directus
    Tool: Playwright (playwright skill)
    Preconditions: App running (npm run dev), Directus populated with data
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for page load (timeout: 10s)
      3. Assert page contains text 'Projekt na Cito' (nav.brandName from Directus)
      4. Assert page contains text 'Wybierz swój' (main.headline)
      5. Navigate to Cito configurator page
      6. Assert summary panel contains 'Układ funkcjonalny' (first summaryItem title)
      7. Count summary items — assert 6 items visible
      8. Take screenshot
    Expected Result: All text renders correctly from Directus data
    Failure Indicators: Missing text, 'undefined' displayed, empty sections
    Evidence: .sisyphus/evidence/task-5-happy-path.png

  Scenario: Offline fallback — app works when Directus is unreachable
    Tool: Playwright (playwright skill)
    Preconditions: App running
    Steps:
      1. Use page.route() to intercept and abort all requests to directus.projektnacito.com.pl
      2. Clear localStorage via page.evaluate(() => localStorage.clear())
      3. Navigate to http://localhost:5173
      4. Wait for page load (timeout: 10s)
      5. Assert page contains text 'Projekt na Cito' (from bundled fallback)
      6. Assert page contains text 'Wybierz swój' (from bundled fallback)
      7. Take screenshot
    Expected Result: App renders fully with bundled pl.ts translations
    Failure Indicators: Blank page, console errors, 'undefined' text
    Evidence: .sisyphus/evidence/task-5-offline-fallback.png

  Scenario: Cache populated in localStorage after load
    Tool: Playwright (playwright skill)
    Preconditions: App running, Directus populated, localStorage clear
    Steps:
      1. Clear localStorage via page.evaluate(() => localStorage.clear())
      2. Navigate to http://localhost:5173
      3. Wait 3 seconds (for background fetch to complete)
      4. Evaluate: page.evaluate(() => localStorage.getItem('translations_pl'))
      5. Assert result is not null
      6. Parse the JSON, assert it has 'timestamp' and 'sections' keys
      7. Assert sections array has 12 items
    Expected Result: localStorage contains cached translations with timestamp
    Failure Indicators: null value, missing timestamp, wrong section count
    Evidence: .sisyphus/evidence/task-5-cache-populated.txt

  Scenario: Function-type translations work (aria labels)
    Tool: Playwright (playwright skill)
    Preconditions: App running with Directus data
    Steps:
      1. Navigate to Premium configurator page
      2. Click '+ Dodaj kuchnię' button
      3. Find element with aria-label containing 'Powierzchnia kuchni 2'
      4. Assert element exists
      5. Click button with aria-label containing 'Usuń kuchnię 2'
      6. Assert element is removed
      7. Take screenshot
    Expected Result: Dynamic aria labels render correctly with index substitution
    Failure Indicators: aria-label shows '{{index1}}' literally, or undefined
    Evidence: .sisyphus/evidence/task-5-aria-labels.png
  ```

  **Commit**: YES
  - Message: `feat(i18n): migrate translations source from hardcoded pl.ts to Directus CMS`
  - Files: `src/i18n/index.ts`, `src/i18n/buildTranslations.ts`, `.env.example`
  - Pre-commit: `cd react-app && npm run lint`

---

- [x] 6. Verify compilation, build, and lint

  **What to do**:
  - Run `npx tsc --noEmit` in react-app/ — verify zero type errors
  - Run `npm run build` in react-app/ — verify production build succeeds
  - Run `npm run lint` in react-app/ — verify linting passes
  - Run `git diff --name-only` and verify NO component files are in the diff:
    - None of: Navigation.tsx, MainView.tsx, ConsultConfigurator.tsx, SubmissionSuccess.tsx, ONas.tsx, Footer.tsx, PremiumConfigurator.tsx, CitoConfigurator.tsx, OfferOverview.tsx, FinalStep.tsx
  - If any check fails: FIX the issue in i18n files only (never touch components), then re-run

  **Must NOT do**:
  - Do NOT fix type errors by modifying components
  - Do NOT add `@ts-ignore` or `as any`
  - Do NOT change the `Translations` type

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Running 3 commands and checking output
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (after Task 5)
  - **Blocks**: Task 7 (QA)
  - **Blocked By**: Task 5

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/package.json` — For exact script names: `build`, `lint`
  - `react-app/tsconfig.json` — TypeScript config with `strict: true`

  **WHY Each Reference Matters**:
  - Need exact script names to run verification commands
  - `strict: true` means any type mismatch will be caught

  **Acceptance Criteria**:

  - [x] `npx tsc --noEmit` exit code 0
  - [x] `npm run build` exit code 0
  - [x] `npm run lint` exit code 0
  - [x] `git diff --name-only` contains NONE of the 10 component files

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All compilation checks pass
    Tool: Bash
    Preconditions: Tasks 2, 4, 5 completed
    Steps:
      1. cd react-app && npx tsc --noEmit
      2. Assert exit code 0 and no error output
      3. npm run build
      4. Assert exit code 0
      5. npm run lint
      6. Assert exit code 0
      7. git diff --name-only | grep -c 'components/'
      8. Assert output is 0 (no component files changed)
    Expected Result: All 3 checks pass, zero component file modifications
    Failure Indicators: Type errors, build failures, lint warnings, component files in diff
    Evidence: .sisyphus/evidence/task-6-compilation.txt
  ```

  **Commit**: NO (verification only, no file changes)

---

- [x] 7. Full End-to-End QA — Playwright + curl + offline resilience

  **What to do**:
  - Run the app locally (`npm run dev` in react-app/)
  - Execute comprehensive QA covering ALL user-facing scenarios:
    1. **API verification**: curl all 12 sections from Directus, verify data integrity
    2. **Full page walkthrough**: Visit every page/view, verify all text renders
    3. **Dynamic content**: Premium configurator — add/remove kitchens/baths, verify aria labels
    4. **Final step flow**: Go through Cito or Premium flow to final step, verify `subtitle` interpolation
    5. **Offline resilience**: Block Directus via Playwright request interception, clear cache, reload — verify fallback
    6. **Cache behavior**: Clear localStorage, load page, verify cache is populated
    7. **Stale cache**: Set old timestamp in cache, reload, verify fresh data is fetched
  - Capture screenshots and evidence for every scenario

  **Must NOT do**:
  - Do NOT modify any code files — this is read-only verification
  - Do NOT fix bugs found — report them for a fix cycle

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive QA requiring Playwright automation and curl
  - **Skills**: [`playwright`]
    - `playwright`: Required for browser automation, request interception, DOM assertions

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Wave 2)
  - **Blocks**: Final Verification Wave
  - **Blocked By**: Task 6

  **References** (CRITICAL):

  **Pattern References**:
  - `react-app/src/i18n/pl.ts` — Ground truth for ALL expected text. Executor should have this open as reference while verifying every page.
  - Every component file (10 total) — To understand which sections appear on which pages:
    - Navigation.tsx → `nav.*`
    - MainView.tsx → `main.*`
    - CitoConfigurator.tsx → `cito.*`
    - PremiumConfigurator.tsx → `premium.*`
    - ConsultConfigurator.tsx → `consult.*`
    - FinalStep.tsx → `finalStep.*`
    - SubmissionSuccess.tsx → `success.*`
    - ONas.tsx → `about.*`
    - OfferOverview.tsx → `offerOverview.*`
    - Footer.tsx → `footer.*`

  **WHY Each Reference Matters**:
  - `pl.ts` is the expected-value reference for all assertions
  - Component-to-section mapping tells the executor which text to verify on which page

  **Acceptance Criteria**:

  - [x] All 12 sections verified via curl against Directus
  - [x] All 10 pages/views render correct text
  - [x] Dynamic aria labels work (Premium configurator)
  - [x] `finalStep.subtitle` interpolates correctly
  - [x] Offline fallback renders all content
  - [x] localStorage cache populated after fresh load
  - [x] All evidence files captured

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Full page walkthrough — every section renders
    Tool: Playwright (playwright skill)
    Preconditions: App running (npm run dev), Directus populated
    Steps:
      1. Navigate to http://localhost:5173 (main page)
      2. Assert 'Projekt na Cito' visible (nav)
      3. Assert 'Wybierz swój' visible (main.headline)
      4. Assert 'zakres wsparcia' visible (main.headlineAccent)
      5. Assert 'Najczęściej wybierany' visible (main.citoTag)
      6. Screenshot: .sisyphus/evidence/task-7-main-page.png
      7. Navigate to Cito configurator
      8. Assert 'Konfigurator Pakietu na Cito' visible (cito.title)
      9. Assert 6 summary items in side panel
      10. Screenshot: .sisyphus/evidence/task-7-cito-page.png
      11. Navigate to Premium configurator
      12. Assert 'Konfigurator Pakietu Premium' visible (premium.title)
      13. Screenshot: .sisyphus/evidence/task-7-premium-page.png
      14. Navigate to Consultation page
      15. Assert 'Umów Konsultację' visible (consult.title)
      16. Screenshot: .sisyphus/evidence/task-7-consult-page.png
      17. Navigate to About page
      18. Assert 'Projekt na CITO' visible (about.title)
      19. Screenshot: .sisyphus/evidence/task-7-about-page.png
      20. Navigate to Offer Overview
      21. Assert 'Proces' visible (offerOverview.headline)
      22. Screenshot: .sisyphus/evidence/task-7-offer-page.png
      23. Check footer: Assert 'Kontakt' visible (footer.contact)
    Expected Result: All pages render correct Polish text from Directus
    Failure Indicators: '{{' visible in UI, 'undefined', empty sections, missing text
    Evidence: .sisyphus/evidence/task-7-*.png (6 screenshots)

  Scenario: Complete offline resilience test
    Tool: Playwright (playwright skill)
    Preconditions: App running
    Steps:
      1. page.route('**/*directus*/**', route => route.abort())
      2. page.evaluate(() => localStorage.clear())
      3. Navigate to http://localhost:5173
      4. Wait for page load (timeout: 10s)
      5. Assert 'Projekt na Cito' visible (bundled fallback)
      6. Navigate through Cito, Premium, About pages
      7. Assert all text renders from fallback
      8. Screenshot: .sisyphus/evidence/task-7-offline-full.png
    Expected Result: Full app functionality with bundled translations
    Failure Indicators: Blank page, console.error about fetch, missing text
    Evidence: .sisyphus/evidence/task-7-offline-full.png

  Scenario: Directus content edit reflects in app (after cache expiry)
    Tool: Bash (curl) + Playwright
    Preconditions: App running, admin token available
    Steps:
      1. Via curl: PATCH the nav section in Directus, change brandName to 'Projekt na Cito TEST'
      2. In Playwright: clear localStorage
      3. Reload page
      4. Wait 3s for background fetch
      5. Reload again (to pick up updated currentTranslations)
      6. Assert page contains 'Projekt na Cito TEST'
      7. Via curl: PATCH brandName back to 'Projekt na Cito'
      8. Screenshot: .sisyphus/evidence/task-7-edit-reflects.png
    Expected Result: Edited content from Directus appears in app after cache refresh
    Failure Indicators: Old text persists, change not picked up
    Evidence: .sisyphus/evidence/task-7-edit-reflects.png
  ```

  **Commit**: NO (verification only)
---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npm run lint` + `npm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` + `playwright` skill
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (Directus data → cache → render). Test edge cases: Directus down, malformed JSON in cache, empty localStorage. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance — especially: zero component file modifications, no @directus/sdk, no React context. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **After Wave 1 (Directus)**: No code commit (Directus config only)
- **After Wave 2 (React integration)**: `feat(i18n): migrate translations source from hardcoded pl.ts to Directus CMS` — `src/i18n/index.ts`, `src/i18n/buildTranslations.ts`, `.env.example`
- **Pre-commit check**: `cd react-app && npm run lint`

---

## Success Criteria

### Verification Commands
```bash
cd react-app && npx tsc --noEmit          # Expected: exit 0, no output
cd react-app && npm run build              # Expected: exit 0
cd react-app && npm run lint               # Expected: exit 0
git diff --name-only HEAD | grep -c "components/"  # Expected: 0
curl -s https://directus.projektnacito.com.pl/items/translations | jq '.data | length'  # Expected: 12
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] TypeScript compiles without errors
- [x] Build succeeds
- [x] Lint passes
- [x] Directus API returns 12 translation sections
- [x] App renders correctly with Directus data
- [x] App renders correctly with Directus offline (fallback)
- [x] localStorage cache populated after first load  ⚠️ KNOWN ISSUE: only when CORS is configured on Directus server (server-side env var required)
