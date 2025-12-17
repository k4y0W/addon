#!/bin/with-contenv bashio
set -e
echo "Starting Employee Manager Add-on..."
exec node --max-old-space-size=256 /usr/local/bin/node-red -s /data/settings.js