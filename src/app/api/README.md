# API Routes de Wakamoon

Ce dossier contient les routes API utilisées par l'application Wakamoon.

## Structure des dossiers

```
api/
├── ai/
│   ├── analyze/
│   │   └── route.ts    - API pour générer une analyse complète
│   └── converse/
│       └── route.ts    - API pour converser avec un agent
└── ...
```

## Routes AI

### /api/ai/analyze

Cette route génère une analyse complète basée sur les données du formulaire.

**Méthode**: `POST`

**Données d'entrée**:
```typescript
{
  // Données du formulaire (FormData)
  companyName: string;
  developmentStage: "idea" | "less-1y" | "1-3y" | "more-3y";
  sector: "fintech" | "hrtech" | "martech" | "saas" | "ecommerce" | "other";
  // etc...
}
```

**Réponse**:
```typescript
{
  report: {
    id: string;
    projectName: string;
    date: string;
    formData: FormData;
    agents: {
      // Résultats pour chaque agent
      'market-research': { /* Résultat de l'agent */ },
      'legal': { /* Résultat de l'agent */ },
      // etc...
    },
    summary: string;
    conversations: {
      // Conversations pour chaque agent
      'market-research': { /* Conversation */ },
      // etc...
    },
    externalSources: [
      // Sources externes pertinentes
      { id, title, url, description, type, relevance }
    ]
  }
}
```

**Utilisation**:
```typescript
const response = await fetch('/api/ai/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

const data = await response.json();
const report = data.report;
```

### /api/ai/converse

Cette route permet de continuer une conversation avec un agent spécifique.

**Méthode**: `POST`

**Données d'entrée**:
```typescript
{
  reportId: string;       // ID du rapport
  agentType: AgentType;   // Type d'agent pour la conversation
  message: string;        // Message de l'utilisateur
}
```

**Réponse**:
```typescript
{
  report: {
    // Rapport mis à jour avec la nouvelle conversation
    id: string;
    // ...autres champs du rapport
    conversations: {
      // Conversations mises à jour
    }
  }
}
```

**Utilisation**:
```typescript
const response = await fetch('/api/ai/converse', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reportId: report.id,
    agentType: 'market-research',
    message: 'Qui sont mes concurrents principaux?'
  })
});

const data = await response.json();
const updatedReport = data.report;
```

## Runtime

Toutes les routes API utilisent l'Edge Runtime de Next.js pour de meilleures performances.

```typescript
export const runtime = 'edge';
```

## Gestion des erreurs

Toutes les routes API incluent une gestion d'erreur appropriée et renvoient des codes HTTP correspondants :
- 200: Succès
- 400: Erreur de requête (données manquantes ou incorrectes)
- 404: Ressource non trouvée
- 500: Erreur serveur