ARG BUILD_FROM=ghcr.io/hassio-addons/base:18.2.3
FROM ${BUILD_FROM}

RUN apk add --no-cache \
    nodejs \
    npm


RUN npm install -g --unsafe-perm \
    node-red \
    node-red-contrib-home-assistant-websocket


WORKDIR /data

RUN mkdir -p /etc/services.d/employee

RUN echo '#!/command/with-contenv bashio' > /etc/services.d/employee/run \
 && echo 'echo "▶️ Startowanie Employee Manager (Node-RED)..."' >> /etc/services.d/employee/run \
 && echo 'cd /data' >> /etc/services.d/employee/run \
 && echo 'exec node-red -s settings.js --max-old-space-size=256' >> /etc/services.d/employee/run \
 && chmod +x /etc/services.d/employee/run

COPY settings.js /data/settings.js
COPY flows.json /data/flows.json
COPY ui /data/ui


ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION