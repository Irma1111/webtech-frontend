# Stage 1: Node.js-Image zum Installieren von Abhängigkeiten und Bauen des Projekts
FROM node:16 AS build

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopieren der package.json und package-lock.json (falls vorhanden)
COPY package*.json ./

# Installieren der Projektabhängigkeiten
RUN npm install

# Kopieren des restlichen Projektcodes
COPY . .

# Bauen des Vue.js-Projekts
RUN npm run build

# Stage 2: Nginx-Image zum Servieren der gebauten statischen Dateien
FROM nginx:stable-alpine

# Kopieren der gebauten Dateien aus der Build-Stage
COPY --from=build /app/dist /usr/share/nginx/html

# Standardmäßiger Port für Nginx
EXPOSE 80

# Starten von Nginx im Vordergrund
CMD ["nginx", "-g", "daemon off;"]
