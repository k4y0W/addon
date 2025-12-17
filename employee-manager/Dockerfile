ARG BUILD_FROM=ghcr.io/hassio-addons/base:19.0.0
FROM ${BUILD_FROM}

# Node.js + npm
RUN apk add --no-cache nodejs npm

# Node-RED + HA websocket
RUN npm install -g --unsafe-perm node-red \
    && npm install -g node-red-contrib-home-assistant-websocket

WORKDIR /data

# S6 service
RUN mkdir -p /etc/services.d/employee

RUN echo '#!/usr/bin/with-contenv bashio' > /etc/services.d/employee/run \
 && echo 'echo "Startowanie Employee Manager (S6 Mode)..."' >> /etc/services.d/employee/run \
 && echo 'cd /data' >> /etc/services.d/employee/run \
 && echo 'exec node-red -s settings.js --max-old-space-size=256' >> /etc/services.d/employee/run \
 && chmod +x /etc/services.d/employee/run

# App files
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json
COPY ui /data/ui
