import { NextRequest, NextResponse } from 'next/server';
import { continueAgentConversation } from '@/lib/ai/orchestrator';
import { AgentType, AnalysisReport } from '@/types/agent';

export const runtime = 'edge';

// Stockage temporaire des rapports - dans une vraie application, utilisez une DB
const reportStore: Record<string, AnalysisReport> = {};

/**
 * API Route pour continuer une conversation avec un agent
 */
export async function POST(request: NextRequest) {
  try {
    const { reportId, agentType, message } = await request.json();
    
    // Vérifications
    if (!reportId || !agentType || !message) {
      return NextResponse.json(
        { error: "Données incomplètes" },
        { status: 400 }
      );
    }
    
    // Récupérer le rapport depuis le stockage ou localStorage
    let report = reportStore[reportId];
    
    if (!report) {
      return NextResponse.json(
        { error: "Rapport non trouvé" },
        { status: 404 }
      );
    }
    
    // Continuer la conversation
    const updatedReport = await continueAgentConversation(
      report,
      agentType as AgentType,
      message
    );
    
    // Mettre à jour le rapport dans le stockage
    reportStore[reportId] = updatedReport;
    
    return NextResponse.json({ report: updatedReport });
  } catch (error) {
    console.error('Error processing conversation request:', error);
    return NextResponse.json(
      { error: "Erreur lors de la conversation" },
      { status: 500 }
    );
  }
}