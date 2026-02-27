# Decisions — directus-translations

## Architectural Decisions
- Keep custom t() — zero component changes
- JSON per section (not key-value rows) — 12 rows total in Directus
- Plain fetch (no @directus/sdk)
- localStorage cache, TTL 1 hour
- pl.ts kept as permanent offline fallback
- Deep-merge Directus + bundled fallback
- No React Context/Provider/hooks for translations
- t() always synchronous — background fetch updates for next call

## Function Template Decisions
- premium functions use idx + 1: store as {{index1}} where index1 = idx+1
- finalStep.subtitle param is string, not number: use {{packageName}}
- Hardcode the 5 known function keys (no generic template engine)

## Error Handling
- All JSON.parse in try-catch → fallback to bundled value
- localStorage operations in try-catch → silent fail
- fetch errors → console.warn only, keep fallback
