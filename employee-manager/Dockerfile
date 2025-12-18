# (Twój nagłówek FROM, np. FROM node:18-alpine lub similar)
FROM node:18-alpine 

# Ustawiamy katalog roboczy
WORKDIR /usr/src/app

# Instalacja Node-RED (pewnie już to masz)
RUN npm install -g --unsafe-perm node-red

# KOPIOWANIE PLIKÓW PROJEKTU
# To jest kluczowe - kopiujemy wszystko z Twojego folderu do obrazu
COPY . .

# Nadajemy uprawnienia wykonywania dla skryptu run.sh
RUN chmod a+x /usr/src/app/run.sh

# Ustawiamy start kontenera przez nasz skrypt
CMD [ "/usr/src/app/run.sh" ]