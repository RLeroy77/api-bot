# Étape 1 : Construire l’image
FROM node:18-alpine

# Définir dossier de travail
WORKDIR /app

# Copier les fichiers
COPY package*.json ./
RUN npm install --only=production

COPY . .

# Exposer le port utilisé par Express
EXPOSE 3000

# Lancer l’application
CMD ["npm", "start"]
