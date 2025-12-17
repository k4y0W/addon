ARG BUILD_FROM
FROM $BUILD_FROM

# 1. Instalacja Node.js, NPM i dodatków
RUN apk add --no-cache nodejs npm

# 2. Instalacja Node-RED globalnie
RUN npm install -g --unsafe-perm node-red \
    && npm install -g node-red-contrib-home-assistant-websocket

# 3. Katalog roboczy
WORKDIR /data

# 4. Generowanie skryptu run.sh "w locie" (To naprawia błąd s6-overlay!)
# Używamy printf, aby wymusić poprawne znaki nowej linii (\n)
RUN printf "#!/bin/sh\n\
echo 'Uruchamianie Employee Manager...'\n\
# Uruchom Node-RED wskazując plik settings.js\n\
exec node --max-old-space-size=256 /usr/local/bin/node-red -s /data/settings.js\n\
" > /run.sh && chmod a+x /run.sh

# 5. Kopiowanie pozostałych plików (bez run.sh, bo stworzyliśmy go wyżej)
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json
COPY ui /data/ui

# 6. Start
CMD [ "/run.sh" ]