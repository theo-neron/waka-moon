'use client'

import React from 'react';
import { AnalysisReport, AgentType } from '@/types/agent';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// Créer les styles pour le PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#334155',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#334155',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#1e40af',
  },
  infoBox: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
  },
});

// Composant PDF pour le rapport
const ReportPDF = ({ report }: { report: AnalysisReport }) => (
  <Document>
    {/* Page de couverture */}
    <Page size="A4" style={styles.page}>
      <View style={{ marginTop: 150, marginBottom: 50 }}>
        <Text style={[styles.title, { fontSize: 32, textAlign: 'center' }]}>
          Rapport d'analyse SaaS
        </Text>
        <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
          {report.projectName}
        </Text>
        <Text style={[styles.text, { textAlign: 'center', marginTop: 30, fontStyle: 'italic' }]}>
          Généré le {new Date(report.date).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      
      <View style={{ marginTop: 100 }}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Informations sur le projet :</Text>
        <Text style={styles.text}>Secteur : {report.formData.sector}</Text>
        <Text style={styles.text}>Modèle de revenus : {report.formData.revenueModel}</Text>
        <Text style={styles.text}>Prix moyen mensuel : {report.formData.averagePrice} €</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Wakamoon - Rapport d'analyse SaaS automatisé</Text>
      </View>
    </Page>
    
    {/* Page du résumé exécutif */}
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Résumé exécutif</Text>
        <Text style={styles.text}>{report.summary}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Wakamoon - Rapport d'analyse SaaS automatisé</Text>
      </View>
    </Page>
    
    {/* Une page par agent */}
    {Object.values(AgentType).map((agentType) => {
      const agentResult = report.agents[agentType];
      if (!agentResult || agentResult.status !== 'completed') return null;
      
      return (
        <Page key={agentType} size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>{agentResult.agentName}</Text>
            <Text style={styles.text}>{agentResult.content}</Text>
          </View>
          
          <View style={styles.footer}>
            <Text>Wakamoon - Rapport d'analyse SaaS automatisé</Text>
          </View>
        </Page>
      );
    })}
  </Document>
);

interface ReportPDFExportProps {
  report: AnalysisReport;
}

// Composant d'exportation PDF
export function ReportPDFExport({ report }: ReportPDFExportProps) {
  return (
    <PDFDownloadLink
      document={<ReportPDF report={report} />}
      fileName={`${report.projectName.replace(/\s+/g, '_')}_Rapport.pdf`}
    >
      {({ loading }) => (loading ? 'Chargement du PDF...' : 'Télécharger le rapport PDF')}
    </PDFDownloadLink>
  );
}

// Composant de prévisualisation PDF pour tests/debugging
export function ReportPDFPreview({ report }: ReportPDFExportProps) {
  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <ReportPDF report={report} />
    </PDFViewer>
  );
}