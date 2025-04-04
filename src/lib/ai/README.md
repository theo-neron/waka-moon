# Module d'Intelligence Artificielle de Wakamoon

Ce dossier contient tous les composants nécessaires pour gérer les agents IA utilisés dans l'application Wakamoon.

## Structure des fichiers

- `agent-service.ts` - Service principal pour l'exécution des agents IA
- `external-data-service.ts` - Service pour l'intégration de sources de données externes
- `orchestrator.ts` - Orchestrateur qui coordonne les différents agents
- `prompt-templates.ts` - Templates de prompts utilisés par les agents

## Architecture des agents IA

L'architecture est basée sur un système multi-agents, où chaque agent est spécialisé dans un domaine spécifique :

1. **Agent d'étude de marché** - Analyse le marché, les concurrents et les tendances
2. **Agent juridique** - Fournit des conseils sur les aspects juridiques et réglementaires
3. **Agent financier** - Analyse les aspects financiers et propose des stratégies de pricing
4. **Agent typologie client** - Identifie les personas clients et leurs parcours d'achat
5. **Agent stratégie** - Définit la stratégie globale et la feuille de route
6. **Agent statisticien** - Fournit des analyses statistiques et des benchmarks

## Flux de données

1. L'utilisateur remplit un formulaire avec les informations sur son projet
2. Ces informations sont envoyées à l'API `/api/ai/analyze`
3. L'orchestrateur lance tous les agents en parallèle
4. Chaque agent génère une analyse spécifique à son domaine
5. L'orchestrateur collecte les résultats et génère un résumé exécutif
6. L'utilisateur peut ensuite interagir avec chaque agent via l'interface de conversation

## Personnalisation des agents

Chaque agent utilise un template de prompt spécifique défini dans `prompt-templates.ts`. Ces prompts peuvent être personnalisés pour adapter les réponses aux besoins spécifiques.

## Intégration des données externes

Le service `external-data-service.ts` permet d'enrichir les analyses avec des références à des sources de données externes pertinentes pour le secteur du projet.

## Utilisation dans les composants React

Exemple d'utilisation dans un composant React :

```typescript
import { useFormContext } from '@/context/FormContext';

function MyComponent() {
  const { reportData, handleSendMessageToAgent } = useFormContext();
  
  // Accéder aux résultats d'un agent
  const marketResearchResult = reportData?.agents['market-research'];
  
  // Envoyer un message à un agent
  const handleSendMessage = async (message: string) => {
    await handleSendMessageToAgent('market-research', message);
  };
  
  return (
    // ...
  );
}
```

## Extensibilité

Pour ajouter un nouvel agent :

1. Ajouter le type d'agent dans `types/agent.ts`
2. Créer un template de prompt dans `prompt-templates.ts`
3. Mettre à jour l'orchestrateur pour inclure le nouvel agent
4. Ajouter l'interface utilisateur correspondante