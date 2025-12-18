ARG BUILD_FROM=ghcr.io/hassio-addons/base:19.0.0
FROM ${BUILD_FROM}

RUN apk add --no-cache \
    nodejs \
    npm

RUN npm install -g --unsafe-perm \
    node-red \
    node-red-contrib-home-assistant-websocket

# 1. Zmieniamy miejsce docelowe COPY na katalog tymczasowy (nie /data)
WORKDIR /usr/src/app
COPY settings.js /usr/src/app/settings.js
COPY flows.json /usr/src/app/flows.json
COPY ui /usr/src/app/ui

# 2. Tworzymy skrypt startowy, który kopiuje pliki do /data
RUN mkdir -p /etc/services.d/employee

RUN echo '#!/command/with-contenv bashio' > /etc/services.d/employee/run \
 && echo 'echo "▶️ Inicjalizacja Employee Manager..."' >> /etc/services.d/employee/run \
 && echo 'echo "⚙️ Kopiowanie settings.js..."' >> /etc/services.d/employee/run \
 && echo 'cp /usr/src/app/settings.js /data/settings.js' >> /etc/services.d/employee/run \
 && echo 'echo "⚙️ Kopiowanie UI..."' >> /etc/services.d/employee/run \
 && echo 'rm -rf /data/ui' >> /etc/services.d/employee/run \
 && echo 'cp -r /usr/src/app/ui /data/ui' >> /etc/services.d/employee/run \
 # Flows kopiujemy TYLKO jeśli nie istnieją (żeby nie nadpisać Twoich zmian)
 && echo 'if [ ! -f /data/flows.json ]; then echo "📄 Instalowanie domyślnych flows..."; cp /usr/src/app/flows.json /data/flows.json; fi' >> /etc/services.d/employee/run \
 && echo 'echo "🚀 Startowanie Node-RED..."' >> /etc/services.d/employee/run \
 && echo 'cd /data' >> /etc/services.d/employee/run \
 && echo 'exec node-red -s /data/settings.js --max-old-space-size=256' >> /etc/services.d/employee/run \
 && chmod +x /etc/services.d/employee/run

# Reszta argumentów budowania (opcjonalna, ale dobra praktyka)
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

CMD [ "/run.sh" ]