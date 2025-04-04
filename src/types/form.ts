import { z } from "zod";

// Schéma de validation pour les données du formulaire
export const formDataSchema = z.object({
  // Identité et contexte
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  developmentStage: z.enum(["idea", "less-1y", "1-3y", "more-3y"]),
  sector: z.enum(["fintech", "hrtech", "martech", "saas", "ecommerce", "other"]),
  targetMarket: z.enum(["B2B", "B2C", "B2B2C"]),
  
  // Produit et modèle économique
  description: z.string().min(1, "La description est requise"),
  revenueModel: z.enum(["subscription", "freemium", "usage", "other"]),
  averagePrice: z.number().min(0),
  
  // Équipe et finances
  teamSize: z.number().min(1),
  monthlyBudget: z.number().min(0),
  capital: z.number().min(0),
  
  // Métriques SaaS
  cac: z.number().min(0),
  churnRate: z.number().min(0).max(100),
  salesCycle: z.number().min(1),
  
  // Objectifs
  clientTarget12m: z.number().min(0),
  mrrTarget12m: z.number().min(0),
  
  // Contact
  email: z.string().email("Email invalide"),
});

export type FormData = z.infer<typeof formDataSchema>;

// Valeurs par défaut pour le formulaire
export const initialFormData: FormData = {
  companyName: 'SaaS Vision',
  developmentStage: 'less-1y',
  sector: 'saas',
  targetMarket: 'B2B',
  description: 'Solution CRM pour les startups avec fonctionnalités d\'automatisation marketing, suivi des leads et analytique avancée.',
  revenueModel: 'subscription',
  averagePrice: 89,
  teamSize: 5,
  monthlyBudget: 15000,
  capital: 150000,
  cac: 950,
  churnRate: 4.5,
  salesCycle: 45,
  clientTarget12m: 200,
  mrrTarget12m: 18000,
  email: 'contact@saasvision.com',
};

// Énumérations pour les options de formulaire
export enum DevelopmentStage {
  IDEA = "idea",
  LESS_THAN_ONE_YEAR = "less-1y",
  ONE_TO_THREE_YEARS = "1-3y",
  MORE_THAN_THREE_YEARS = "more-3y"
}

export enum Sector {
  FINTECH = "fintech",
  HRTECH = "hrtech",
  MARTECH = "martech",
  SAAS = "saas",
  ECOMMERCE = "ecommerce",
  OTHER = "other"
}

export enum TargetMarket {
  B2B = "B2B",
  B2C = "B2C",
  B2B2C = "B2B2C"
}

export enum RevenueModel {
  SUBSCRIPTION = "subscription",
  FREEMIUM = "freemium",
  USAGE = "usage",
  OTHER = "other"
}