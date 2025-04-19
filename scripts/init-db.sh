#!/bin/bash

# Créer la base de données
createdb heroinside

# Exécuter les migrations Prisma
npx prisma migrate dev --name init

# Vérifier la connexion
psql -d heroinside -c "\dt" 