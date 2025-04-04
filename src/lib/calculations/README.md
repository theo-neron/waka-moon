# Module de Calculs Financiers

Ce module contient toutes les fonctions nécessaires pour effectuer les calculs financiers utilisés dans les projections de l'application Wakamoon.

## Fichiers principaux

- `financialCalculations.ts` - Fonctions principales pour les calculs financiers

## Fonctionnalités

### Calcul des projections financières

La fonction `calculateFinancialData` génère des projections financières sur 8 trimestres (2 ans) en fonction des données saisies par l'utilisateur dans le formulaire.

Ces projections incluent:
- Revenus trimestriels et cumulatifs
- Coûts trimestriels et cumulatifs
- Profit/perte trimestriels et cumulatifs

Pour chaque métrique, deux scénarios sont calculés:
1. Sans Wakastart
2. Avec Wakastart (avec des améliorations de performance)

### Détermination du point de rentabilité

La fonction `getBreakevenPoint` calcule le trimestre où le projet devient rentable (lorsque les revenus cumulatifs dépassent les coûts cumulatifs).

### Calcul des métriques récapitulatives

La fonction `calculateChartSummary` génère des métriques récapitulatives incluant:
- Point de rentabilité pour chaque scénario
- Gain financier avec Wakastart
- Gain de temps en trimestres pour atteindre la rentabilité
- Données du dernier trimestre pour l'affichage de statistiques

## Constantes d'amélioration Wakastart

Les améliorations apportées par l'utilisation de Wakastart sont définies dans les constantes suivantes:

```typescript
const WAKASTART_IMPROVEMENTS = {
  CAC_REDUCTION: 0.30,               // Réduction de 30% du CAC
  CHURN_REDUCTION: 0.25,             // Réduction de 25% du taux de churn
  SALES_CYCLE_REDUCTION: 0.20,       // Réduction de 20% du cycle de vente
  CLIENT_ACQUISITION_BOOST: 0.25,    // 25% de clients supplémentaires
  MONTHLY_COST_FACTOR: 0.15          // Coût de Wakastart (15% du budget mensuel)
};
```

## Formules de calcul

Les principales formules utilisées sont:

1. **Calcul du nombre de clients**: Acquisition progressive des clients avec prise en compte du churn
2. **Calcul des revenus**: Nombre de clients × Prix moyen × 3 mois
3. **Calcul des coûts**: Coûts d'acquisition + Coûts opérationnels + (si applicable) Coûts Wakastart
4. **Calcul du profit/perte**: Revenus - Coûts

## Utilisation dans l'application

Ces calculs sont principalement utilisés par le hook `useFinancialData` qui expose les données calculées aux composants de graphiques.

Exemple d'utilisation:

```typescript
import { useFinancialData } from '@/hooks/useFinancialData';

function FinancialChartComponent({ formData }) {
  const {
    chartData,
    breakevenWithoutWakastart,
    breakevenWithWakastart,
    financialBenefit,
    timeGain
  } = useFinancialData(formData);
  
  // Utiliser ces données pour afficher des graphiques...
}
```