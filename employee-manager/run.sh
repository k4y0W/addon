#!/bin/sh
set -e

echo "Starting Employee Manager Add-on..."

# Opcjonalnie: Tutaj możesz dodać kod, który podmienia token w flows.json 
# jeśli używasz węzłów konfiguracyjnych, ale Ingress zazwyczaj to upraszcza.

# Uruchomienie Node-RED wskazując nasz plik ustawień
# --max-old-space-size ogranicza RAM, żeby dodatek nie zjadł całego RPi
exec node --max-old-space-size=256 /usr/local/bin/node-red -s /data/settings.js