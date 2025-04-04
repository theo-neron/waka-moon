import { NextRequest, NextResponse } from 'next/server';
import { runCompleteAnalysis } from '@/lib/ai/orchestrator';
import { FormData } from '@/types/form';

export const runtime = 'edge';

/**
 * API Route pour générer une analyse complète
 */
export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();
    
    // Vérification basique des données
    if (!formData.companyName) {
      return NextResponse.json(
        { error: "Données de formulaire incomplètes" },
        { status: 400 }
      );
    }

    // Lancer l'analyse complète
    const analysisReport = await runCompleteAnalysis(formData);
    
    return NextResponse.json({ report: analysisReport });
  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse" },
      { status: 500 }
    );
  }
}