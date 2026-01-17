# Projekt na Cito — React + Docker

Zawiera konwersję statycznej strony do projektu React (Vite) oraz konfigurację Docker + docker-compose.

Szybkie instrukcje:

1. Build lokalnie (bez Dockera):
   - npm install
   - npm run dev

2. Build produkcyjny lokalnie:
   - npm install
   - npm run build
   - npm run preview (podgląd builda)

3. Uruchomienie z Docker Compose:
   - API backendu: ustaw zmienną środowiskową API_URL przed uruchomieniem.
   - Przykład:
     API_URL=https://api.mojbackend.pl docker-compose up --build

4. Jak działa runtime-config:
   - Nginx serwuje plik /env.js wygenerowany podczas startu kontenera.
   - Skrypt ustawia window.__APP_CONFIG__.API_URL.
   - Frontend odczytuje tę zmienną i wysyła formularze pod wskazany adres.

Pliki wygenerowane:
- Dockerfile
- docker-compose.yml
- docker/docker-entrypoint.sh
- docker/nginx.conf
- Vite + React w katalogu src/

Uwaga: Backend nie jest dostarczony — musisz podać URL do istniejącego serwera (API_URL).