import React from 'react';
import { Rocket } from 'lucide-react';

/**
 * En-tête du site avec logo et message d'accueil
 * Apparaît en haut de la page principale et définit l'identité visuelle de l'application
 */
export function SiteHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Rocket className="h-12 w-12 text-cyan-400 mr-3" />
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
          Wakamoon
        </h1>
      </div>
      <p className="text-cyan-100 max-w-3xl mx-auto">Obtenez une étude de marché personnalisée pour lancer votre business SAAS !</p>
    </div>
  );
}