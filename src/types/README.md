# Types du projet Wakamoon

Ce dossier contient toutes les définitions de types TypeScript utilisées dans l'application.

## Structure des fichiers

- `agent.ts` - Types liés aux agents IA et à leurs résultats
- `chart.ts` - Types pour les données de graphiques financiers
- `chart-config.ts` - Types de configuration pour les graphiques
- `form.ts` - Types liés au formulaire principal et à ses données

## Types principaux

### Types d'agents IA

Le système utilise plusieurs types d'agents spécialisés, chacun avec un rôle spécifique :

```typescript
export enum AgentType {
  MARKET_RESEARCH = 'market-research', // Étude de marché
  LEGAL = 'legal',                     // Analyse juridique
  FINANCIAL = 'financial',             // Analyse financière
  CUSTOMER = 'customer',               // Typologie client
  STRATEGY = 'strategy',               // Stratégie de marché
  STATISTICS = 'statistics',           // Statistiques & prévisions
}
```

### Données de formulaire

Les données du formulaire sont typées avec Zod pour la validation :

```typescript
export const formDataSchema = z.object({
  // Identité et contexte
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  developmentStage: z.enum(["idea", "less-1y", "1-3y", "more-3y"]),
  sector: z.enum(["fintech", "hrtech", "martech", "saas", "ecommerce", "other"]),
  targetMarket: z.enum(["B2B", "B2C", "B2B2C"]),
  
  // Autres champs...
});

export type FormData = z.infer<typeof formDataSchema>;
```

### Données de graphiques

Les données de graphiques financiers sont structurées comme suit :

```typescript
export interface DataPoint {
  name: string;
  quarter: number;
  
  // Données trimestrielles sans Wakastart
  revenue: number;
  costs: number;
  profitLoss: number;
  
  // Données cumulatives sans Wakastart
  cumulativeRevenue: number;
  cumulativeCosts: number;
  cumulativeProfitLoss: number;
  
  // Etc...
}
```

## Extension des types

Pour ajouter de nouveaux types :

1. Créer ou étendre les fichiers existants
2. S'assurer que les nouveaux types suivent les conventions existantes
3. Utiliser des énumérations pour les valeurs constantes
4. Utiliser des interfaces pour les objets complexes
5. Documenter les types avec des commentaires JSDoc

## Validations

Les validations de formulaires utilisent Zod. Exemple d'utilisation :

```typescript
import { formDataSchema } from '@/types/form';

// Valider les données
const result = formDataSchema.safeParse(formData);
if (result.success) {
  // Données valides
  const validatedData = result.data;
} else {
  // Erreurs de validation
  const errors = result.error.format();
}
```