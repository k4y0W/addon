ARG BUILD_FROM
FROM $BUILD_FROM

# 1. Instalacja Node.js i NPM (Alpine Linux)
RUN apk add --no-cache nodejs npm

# 2. Instalacja Node-RED i integracji Home Assistant
# Instalujemy globalnie, żeby mieć polecenie 'node-red'
RUN npm install -g --unsafe-perm node-red \
    && npm install -g node-red-contrib-home-assistant-websocket

# 3. Przygotowanie katalogów
WORKDIR /data

# 4. Kopiowanie plików dodatku
COPY run.sh /run.sh
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json

# 5. Kopiowanie Twojego Frontend'u (UI)
COPY ui /data/ui

# 6. Nadanie uprawnień skryptowi startowemu
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]