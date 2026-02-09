#!/usr/bin/env bash
set -euo pipefail

# Usage: GH_TOKEN=<token> ./create_pr.sh

if [ -z "${GH_TOKEN:-}" ]; then
  echo "GH_TOKEN environment variable is required. Export a personal access token with repo scope and re-run."
  exit 1
fi

OWNER="lukaszkotowski-git"
REPO="projektnacito"
HEAD="feat/remove-darkmode-email-phone"
BASE="main"
TITLE="refactor: remove dark mode; add EmailInput + validations; adjust consult date/time layout"

if [ ! -f PR_BODY.md ]; then
  echo "PR_BODY.md not found in repository root. Create PR_BODY.md with the PR description."
  exit 1
fi

BODY=$(python3 - <<'PY'
import sys, json
text = open('PR_BODY.md', 'r', encoding='utf-8').read()
print(json.dumps(text))
PY
)

API_URL="https://api.github.com/repos/${OWNER}/${REPO}/pulls"

echo "Creating PR ${TITLE} -> ${BASE} from ${HEAD}"

response=$(curl -sS -X POST "$API_URL" \
  -H "Authorization: token ${GH_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  -d "{\"title\": \"${TITLE}\", \"head\": \"${HEAD}\", \"base\": \"${BASE}\", \"body\": ${BODY}}")

echo "$response" | python3 -c "import sys, json; r=json.load(sys.stdin); print(r.get('html_url') or r)"
