'use server';

/**
 * @fileOverview Analyzes conversation text for potential emotional abuse, manipulation, and risk levels.
 *
 * - analyzeConversation - A function that handles the conversation analysis process.
 * - AnalyzeConversationInput - The input type for the analyzeConversation function.
 * - AnalyzeConversationOutput - The return type for the analyzeConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeConversationInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The conversation text to analyze for emotional abuse, manipulation, and risk levels.'),
});
export type AnalyzeConversationInput = z.infer<typeof AnalyzeConversationInputSchema>;

const AnalyzeConversationOutputSchema = z.object({
  riskAssessment:
      z.object({
        riskScore: z.number().describe('A score indicating the overall risk level (e.g., 1-10).'),
        riskSummary: z.string().describe('A brief summary of the potential risks identified.'),
      }),
  detectedCategories: z
    .array(z.string())
    .describe('Categories of abuse detected in the conversation (e.g., emotional abuse, manipulation).'),
  relevantExamples: z
    .array(z.string())
    .describe('Specific examples from the text that demonstrate the identified abuse categories.'),
  recommendations: z
    .string()
    .describe('Tailored recommendations based on the analysis (e.g., seek professional help, set boundaries).'),
});
export type AnalyzeConversationOutput = z.infer<typeof AnalyzeConversationOutputSchema>;

export const analyzeConversationFlow = ai.defineFlow(
  {
    name: 'analyzeConversationFlow',
    inputSchema: AnalyzeConversationInputSchema,
    outputSchema: AnalyzeConversationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function analyzeConversation(input: AnalyzeConversationInput): Promise<AnalyzeConversationOutput> {
  return analyzeConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeConversationPrompt',
  input: {schema: AnalyzeConversationInputSchema},
  output: {schema: AnalyzeConversationOutputSchema},
  prompt: `You are an AI expert in analyzing conversations for emotional abuse, manipulation, and risk levels.

  Eres un experto en el análisis de conversaciones para detectar abuso emocional, manipulación y niveles de riesgo. Tu objetivo es proporcionar un análisis muy preciso, detallado y CONSISTENTE.

  Al analizar el texto, presta especial atención a:
  - **Humillación y desvalorización**: Comentarios que denigran, critican constantemente o minimizan los sentimientos del otro.
  - **Control y celos**: Intentos de controlar la vida social, las decisiones o las emociones del otro; expresiones de celos excesivos.
  - **Manipulación emocional**: Uso de culpa, victimización, amenazas veladas o chantaje para influir en el comportamiento del otro.
  - **Aislamiento**: Intentos de separar a la persona de su red de apoyo (amigos, familia).
  - **Gaslighting**: Negación de la realidad o de los sentimientos del otro para hacerle dudar de su propia percepción.
  - **Amenazas o intimidación**: Directas o indirectas, que generen miedo o ansiedad.
  - **Patrones de comunicación**: Observa si hay un desequilibrio de poder, interrupciones constantes, invalidación o falta de escucha.

  **Criterios para la Puntuación de Riesgo (1-10):**
  - **1-3 (Bajo)**: Indicios muy leves o aislados de comportamientos problemáticos.
  - **4-6 (Medio)**: Presencia clara de uno o más tipos de abuso, pero no constantes o severos.
  - **7-8 (Alto)**: Múltiples tipos de abuso o un patrón constante y significativo de un tipo. Impacto potencial considerable.
  - **9-10 (Muy Alto)**: Abuso severo y persistente, con múltiples tácticas y un claro impacto negativo en la víctima. Riesgo inminente.

  Evalúa el siguiente texto de conversación y proporciona una evaluación de riesgo, categorías de abuso identificadas, ejemplos relevantes y recomendaciones personalizadas.

  Texto de Conversación: {{{conversationText}}}

  La salida del análisis debe estar en español y en el formato estructurado descrito por el esquema de salida. Sé extremadamente preciso, objetivo y conciso en tus respuestas. Los ejemplos relevantes deben ser citas directas del texto. Asegura que el resumen de riesgo sea una síntesis coherente y no solo una lista de categorías. Prioriza la consistencia en la puntuación y el resumen para textos similares.
  `,
});
