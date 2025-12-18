echo "Kopiowanie settings.js do /data..."
cp /usr/src/app/settings.js /data/settings.js
echo "Startowanie Node-RED..."
exec node-red -u /data