#!/bin/sh
set -e

# Fix ownership of /app/uploads if running as root during container startup
if [ "$(id -u)" = "0" ]; then
  if [ -d "/app/uploads" ]; then
    chown -R node:node /app/uploads 2>/dev/null || true
    echo "Fixed /app/uploads ownership for non-root container"
  fi
  # Switch to node user and run the provided command
  exec su-exec node "$@"
else
  exec "$@"
fi
