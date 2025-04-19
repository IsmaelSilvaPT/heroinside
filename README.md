# HeroInside

Application de suivi personnel et de développement personnel.

## Configuration requise

- Node.js 18+
- PostgreSQL 14+
- Compte Vercel
- Compte SMTP (Gmail, SendGrid, etc.)

## Installation locale

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-username/heroinside.git
cd heroinside
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Puis éditez le fichier `.env` avec vos configurations.

4. Initialiser la base de données :
```bash
npm run setup
```

5. Lancer l'application en développement :
```bash
npm run dev
```

## Déploiement sur Vercel

1. Installer Vercel CLI :
```bash
npm install -g vercel
```

2. Se connecter à Vercel :
```bash
vercel login
```

3. Configurer les variables d'environnement sur Vercel :
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
```

4. Déployer l'application :
```bash
npm run vercel:deploy
```

## Sécurité

L'application inclut plusieurs mesures de sécurité :

- Authentification JWT
- Hachage des mots de passe
- Protection CSRF
- Validation des données
- Journalisation des événements de sécurité
- Alertes par email
- HTTPS obligatoire

## Structure du projet

```
heroinside/
├── prisma/           # Configuration de la base de données
├── public/           # Fichiers statiques
├── src/
│   ├── components/   # Composants React
│   ├── lib/          # Services et utilitaires
│   ├── pages/        # Routes Next.js
│   └── styles/       # Styles CSS
├── .env             # Variables d'environnement
├── .vercelignore    # Fichiers ignorés par Vercel
└── vercel.json      # Configuration Vercel
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
