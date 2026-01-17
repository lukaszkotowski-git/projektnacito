#!/bin/sh
set -e

# generate env.js at container start so the API_URL can be injected at runtime
cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_CONFIG__ = { API_URL: "${API_URL:-/api/submissions}" };
EOF

exec "$@"
