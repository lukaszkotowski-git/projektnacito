# Issues — directus-translations

## Potential Issues (flagged by Metis)
- CORS must be configured on Directus for projektnacito.com.pl origin
- premiumCost contains \n newlines — verify Directus JSON field preserves them
- pl.ts:99-102: premium functions use idx + 1 (not raw idx) — templates must account for this
- finalStep.subtitle param is string (packageName), not number — different reconstruction logic
- Race condition on first load: solved by bundled fallback (synchronous)

## Resolved Issues
- (none yet)

## Open Issues
- (none yet)
