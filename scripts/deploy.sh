#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Démarrage du processus de déploiement...${NC}"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI n'est pas installé. Installation en cours...${NC}"
    npm install -g vercel
fi

# Vérifier si l'utilisateur est connecté à Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}Vous n'êtes pas connecté à Vercel. Connexion en cours...${NC}"
    vercel login
fi

# Installer les dépendances
echo -e "${GREEN}Installation des dépendances...${NC}"
npm install

# Générer le client Prisma
echo -e "${GREEN}Génération du client Prisma...${NC}"
npm run prisma:generate

# Configurer les variables d'environnement
echo -e "${GREEN}Configuration des variables d'environnement...${NC}"
vercel env pull

# Déployer l'application
echo -e "${GREEN}Déploiement de l'application...${NC}"
npm run vercel:deploy

echo -e "${GREEN}Déploiement terminé avec succès !${NC}" 