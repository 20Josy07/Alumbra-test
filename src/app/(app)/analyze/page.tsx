
'use client';

import { useState } from 'react';
import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import ConversationInputForm from '@/components/conversation-input-form';
import AnalysisResults from '@/components/analysis-results';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FullScreenLoading from '@/components/ui/full-screen-loading';


export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeConversationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto"> 
      <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Análisis de Conversación</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Ingresa el texto de tu conversación abajo para obtener percepciones impulsadas por IA.
          </p>
      </div>

      <ConversationInputForm
        onAnalysisStart={() => {
          setIsLoading(true);
          setError(null);
          setAnalysisResult(null);
        }}
        onAnalysisComplete={(result) => {
          setAnalysisResult(result);
          setIsLoading(false);
        }}
        onAnalysisError={(errorMessage) => {
          setError(errorMessage);
          setIsLoading(false);
        }}
      />

      <div aria-live="polite" aria-atomic="true" className="w-full mt-8">
        {isLoading && <FullScreenLoading />}
        {error && !isLoading && (
           <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error en el Análisis</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {analysisResult && !isLoading && (
          <AnalysisResults analysis={analysisResult} />
        )}
      </div>
    </div>
  );
}
