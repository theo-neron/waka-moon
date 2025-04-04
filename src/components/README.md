# Composants de l'Application Wakamoon

Ce dossier contient tous les composants React utilisés dans l'application Wakamoon.

## Structure des dossiers

```
components/
├── charts/          - Composants graphiques pour visualiser les données financières
├── forms/           - Formulaires pour la saisie des données utilisateur
├── layout/          - Composants de mise en page (header, footer, etc.)
├── reports/         - Composants pour l'affichage des rapports d'analyse
├── results/         - Composants pour l'affichage des résultats de projection
└── ui/              - Composants UI réutilisables (boutons, cartes, etc.)
```

## Composants UI

Les composants UI sont construits sur le modèle de Radix UI et personnalisés avec Tailwind CSS. Ils sont conçus pour être accessibles, réutilisables et cohérents.

Exemples :
- `Button` - Boutons avec plusieurs variantes
- `Card` - Conteneurs de cartes
- `Tabs` - Navigation par onglets
- `Select` - Sélecteurs déroulants
- `Input` - Champs de saisie de texte

## Composants de graphiques

Les composants de graphiques utilisent Recharts pour visualiser les données financières :

- `AreaChartComponent` - Graphique en aires pour visualiser revenus/coûts
- `CombinedChart` - Graphique combiné pour comparer les scénarios
- `DataVisualization` - Visualisations dynamiques basées sur les données des agents IA

## Composants de formulaire

Les composants de formulaire sont organisés par section :

- `CompanyInfoForm` - Informations sur l'entreprise
- `ProductForm` - Détails du produit et modèle économique
- `TeamFinanceForm` - Équipe et finances
- `SaasMetricsForm` - Métriques SaaS (CAC, churn, etc.)
- `GoalsForm` - Objectifs à 12 mois

## Composants de rapports

Ces composants affichent les résultats des analyses des agents IA :

- `AgentResultCard` - Carte affichant les résultats d'un agent
- `AgentConversationUI` - Interface de conversation avec un agent
- `DataVisualization` - Visualisations des données d'agent
- `ExternalSourcesList` - Liste des sources externes

## Utilisation des composants

Exemple d'utilisation d'un composant :

```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <div>
      <Button 
        variant="default" 
        onClick={() => console.log('Clicked')}
      >
        Cliquez-moi
      </Button>
    </div>
  );
}
```

## Convention de nommage

- Les noms de composants sont en PascalCase
- Les fichiers de composants sont en kebab-case.tsx
- Les composants d'interface utilisateur de base sont dans le dossier `ui/`
- Les composants spécifiques à une fonctionnalité sont dans des dossiers thématiques