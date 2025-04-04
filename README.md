# Wakamoon - Plateforme d'analyse SaaS

Wakamoon est une application Next.js qui génère des études de marché et des projections financières personnalisées pour les startups SaaS. Elle utilise l'IA pour fournir des analyses détaillées dans différents domaines (marché, finance, juridique, etc.) et aide les entrepreneurs à mieux comprendre leur potentiel de croissance.

## Fonctionnalités principales

- **Formulaire détaillé** pour recueillir les informations sur votre projet SaaS
- **Projections financières visuelles** montrant l'évolution des revenus et coûts sur 8 trimestres
- **Analyse comparative** entre un scénario standard et un scénario optimisé avec Wakastart
- **Génération de rapports IA complets** avec six agents spécialisés
- **Interface de conversation** avec chaque agent pour poser des questions spécifiques
- **Visualisations de données** adaptées à chaque type d'analyse

## Stack technique

- **Frontend:** Next.js 14 avec React 18
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI (composants accessibles)
- **Graphiques:** Recharts pour les visualisations de données
- **IA:** Intégration avec l'API OpenAI GPT-4
- **Déploiement:** Optimisé pour Vercel

## Démarrage rapide

### Prérequis

- Node.js 18.0.0 ou version ultérieure
- Clé API OpenAI (pour les fonctionnalités d'IA)

### Installation

1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   cd wakamoon
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer un fichier `.env.local` avec votre clé API OpenAI :
   ```
   OPENAI_API_KEY=votre-cle-api-openai
   ```

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Architecture du projet

Le projet suit une architecture basée sur les principes de modularité et de séparation des préoccupations :

```
wakamoon/
├── public/               # Assets statiques
├── src/
│   ├── app/              # Routes Next.js App Router
│   ├── components/       # Composants React réutilisables
│   │   ├── charts/       # Composants de graphiques
│   │   ├── forms/        # Formulaires
│   │   ├── layout/       # Composants de mise en page
│   │   ├── reports/      # Composants pour les rapports
│   │   ├── results/      # Composants pour les résultats
│   │   └── ui/           # Composants UI de base
│   ├── context/          # Contextes React et providers
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Fonctions utilitaires et logiques
│   │   ├── ai/           # Services IA et prompts
│   │   ├── calculations/ # Calculs financiers
│   │   └── utils/        # Utilitaires génériques
│   └── types/            # Définitions de types TypeScript
```

## Modules IA

L'application utilise six agents IA spécialisés pour générer une analyse complète :

1. **Agent d'étude de marché** - Analyse le marché, les concurrents et les tendances
2. **Agent juridique** - Conseils sur les aspects juridiques et réglementaires
3. **Agent financier** - Analyse financière et stratégies de pricing
4. **Agent typologie client** - Personas clients et parcours d'achat
5. **Agent stratégie** - Stratégie globale et feuille de route
6. **Agent statisticien** - Benchmarks sectoriels et prévisions

## Personnalisation

- Modifier `src/lib/calculations/financialCalculations.ts` pour ajuster les calculs financiers
- Personnaliser les prompts dans `src/lib/ai/prompt-templates.ts` pour améliorer les réponses IA
- Ajuster les styles dans `src/app/globals.css` pour personnaliser l'apparence

## Déploiement

L'application est optimisée pour un déploiement sur Vercel. Consultez le fichier [todo.md](./todo.md) pour les étapes détaillées de déploiement.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou signaler des problèmes.

## Licence

MIT