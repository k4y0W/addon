ARG BUILD_FROM=ghcr.io/hassio-addons/base:19.0.0
FROM ${BUILD_FROM}

# ==============================
# 1. Instalacja Node.js + npm
# ==============================
RUN apk add --no-cache \
    nodejs \
    npm

# ==============================
# 2. Instalacja Node-RED + HA WS
# ==============================
RUN npm install -g --unsafe-perm \
    node-red \
    node-red-contrib-home-assistant-websocket

# ==============================
# 3. Katalog roboczy
# ==============================
WORKDIR /data

# ==============================
# 4. S6 SERVICE (s6-overlay v3)
# ==============================
RUN mkdir -p /etc/services.d/employee

RUN echo '#!/command/with-contenv bashio' > /etc/services.d/employee/run \
 && echo 'echo "▶️ Startowanie Employee Manager (Node-RED)..."' >> /etc/services.d/employee/run \
 && echo 'cd /data' >> /etc/services.d/employee/run \
 && echo 'exec node-red -s settings.js --max-old-space-size=256' >> /etc/services.d/employee/run \
 && chmod +x /etc/services.d/employee/run

# ==============================
# 5. Pliki aplikacji
# ==============================
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json
COPY ui /data/ui

# ==============================
# ❗ BRAK CMD / ENTRYPOINT
# s6-overlay zrobi wszystko samo
# ==============================
