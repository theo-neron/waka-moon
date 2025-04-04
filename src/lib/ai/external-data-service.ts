/**
 * Service pour l'intégration de données externes
 */
import { OpenAI } from "openai";
import { ExternalSource } from "@/types/agent";
import { FormData } from "@/types/form";
import { generateId } from "@/lib/utils";

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

/**
 * Sources de données externes pour les différents secteurs
 */
const EXTERNAL_DATA_SOURCES = {
  fintech: [
    { url: "https://www.cbinsights.com/research/report/fintech-trends-q4-2023/", name: "CB Insights Fintech Trends" },
    { url: "https://www.mckinsey.com/industries/financial-services/our-insights", name: "McKinsey Financial Services" },
    { url: "https://www.statista.com/topics/2404/fintech/", name: "Statista Fintech" }
  ],
  saas: [
    { url: "https://www.saastr.com/", name: "SaaStr" },
    { url: "https://www.softwareequity.com/reports/", name: "Software Equity Group" },
    { url: "https://www.statista.com/topics/3071/cloud-software/", name: "Statista SaaS" }
  ],
  hrtech: [
    { url: "https://joshbersin.com/hr-tech-market-2/", name: "Josh Bersin HR Tech" },
    { url: "https://www.capterra.com/hr-software/", name: "Capterra HR Tech" }
  ],
  martech: [
    { url: "https://chiefmartec.com/", name: "Chief Martec" },
    { url: "https://research.g2.com/insights/marketing-technology", name: "G2 MarTech" }
  ],
  ecommerce: [
    { url: "https://www.digitalcommerce360.com/article/quarterly-online-sales/", name: "Digital Commerce 360" },
    { url: "https://www.statista.com/outlook/dmo/ecommerce/worldwide", name: "Statista E-commerce" }
  ],
  general: [
    { url: "https://www.forrester.com/bold", name: "Forrester Research" },
    { url: "https://www.gartner.com/en/research/methodologies/magic-quadrant", name: "Gartner Magic Quadrant" }
  ]
};

/**
 * Trouve des sources externes pertinentes en fonction des données du formulaire
 */
export async function findRelevantExternalSources(formData: FormData): Promise<ExternalSource[]> {
  // Sélectionner les sources en fonction du secteur
  const sectorSources = EXTERNAL_DATA_SOURCES[formData.sector as keyof typeof EXTERNAL_DATA_SOURCES] || 
                        EXTERNAL_DATA_SOURCES.general;
  
  // Mélanger avec quelques sources générales
  const allSources = [...sectorSources, ...EXTERNAL_DATA_SOURCES.general];
  
  // Générer une description pour chaque source
  const sources: ExternalSource[] = [];
  
  for (const source of allSources.slice(0, 5)) { // Limiter à 5 sources
    try {
      const description = await generateSourceDescription(source.name, source.url, formData);
      
      sources.push({
        id: generateId(),
        title: source.name,
        url: source.url,
        description,
        type: getSourceType(source.name),
        relevance: Math.floor(Math.random() * 30) + 70 // Simuler un score de pertinence entre 70-100
      });
    } catch (error) {
      console.error(`Error generating description for ${source.name}:`, error);
    }
  }
  
  return sources;
}

/**
 * Génère une description pour une source externe
 */
async function generateSourceDescription(sourceName: string, sourceUrl: string, formData: FormData): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Tu es un assistant de recherche qui aide à trouver des sources pertinentes pour des études de marché SaaS." 
        },
        { 
          role: "user", 
          content: `Je cherche des informations pour un projet SaaS dans le secteur ${formData.sector} avec le modèle de revenus ${formData.revenueModel}.
          
          Peux-tu me générer une courte description (2-3 phrases) expliquant pourquoi la source "${sourceName}" (${sourceUrl}) serait pertinente pour mon projet?
          
          Sois précis sur le type d'informations qu'on pourrait y trouver et comment cela pourrait m'aider.` 
        }
      ],
      temperature: 0.3,
      max_tokens: 150,
    });
    
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error(`Error generating description:`, error);
    return `Source de données sur le marché ${formData.sector}.`;
  }
}

/**
 * Détermine le type de source en fonction de son nom
 */
function getSourceType(sourceName: string): ExternalSource['type'] {
  const nameLC = sourceName.toLowerCase();
  
  if (nameLC.includes('research') || nameLC.includes('insights') || nameLC.includes('report')) {
    return 'research';
  } else if (nameLC.includes('statista') || nameLC.includes('data')) {
    return 'statistics';
  } else if (nameLC.includes('article') || nameLC.includes('blog')) {
    return 'article';
  } else if (nameLC.includes('quadrant') || nameLC.includes('trends')) {
    return 'report';
  } else {
    return 'other';
  }
}