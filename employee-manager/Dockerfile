ARG BUILD_FROM
FROM $BUILD_FROM

# 1. Instalacja Node.js, NPM
RUN apk add --no-cache nodejs npm

# 2. Instalacja Node-RED i WebSocket
RUN npm install -g --unsafe-perm node-red \
    && npm install -g node-red-contrib-home-assistant-websocket

# 3. Katalog roboczy
WORKDIR /data

# 4. PRZYGOTOWANIE STARTU (METODA S6 SERVICES)
# Tworzymy katalog usługi
RUN mkdir -p /etc/services.d/employee

# Tworzymy skrypt startowy bezpośrednio w folderze usług S6.
# Używamy "with-contenv bashio", co zapewnia dostęp do zmiennych środowiskowych HA.
RUN echo "#!/usr/bin/with-contenv bashio" > /etc/services.d/employee/run \
    && echo "echo 'Startowanie Employee Manager (S6 Mode)...'" >> /etc/services.d/employee/run \
    && echo "cd /data" >> /etc/services.d/employee/run \
    && echo "# Uruchamiamy Node-RED (bez hardcodowania ścieżki, szukamy w PATH)" >> /etc/services.d/employee/run \
    && echo "exec node-red -s settings.js --max-old-space-size=256" >> /etc/services.d/employee/run \
    && chmod a+x /etc/services.d/employee/run

# 5. Kopiowanie plików
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json
COPY ui /data/ui

# UWAGA: Brak CMD na końcu! 
# Obraz bazowy sam uruchomi wszystko z folderu /etc/services.d