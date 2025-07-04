'use client';

import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion'; // Import motion
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Tags,
  MessageSquareQuote,
  Lightbulb,
  Activity,
  ListChecks,
  ClipboardCheck,
} from 'lucide-react';

interface AnalysisResultsProps {
  analysis: AnalyzeConversationOutput;
}

const getRiskPresentation = (score: number) => {
  if (score <= 3) return { label: "Riesgo Bajo", color: "text-green-500 dark:text-green-400", Icon: ShieldCheck, progressIndicatorClass: "bg-green-500", cardBgClass: "bg-gradient-to-r from-green-600/20 to-green-500/10 border-green-500/30" };
  if (score <= 7) return { label: "Riesgo Medio", color: "text-yellow-500 dark:text-yellow-400", Icon: ShieldAlert, progressIndicatorClass: "bg-yellow-500", cardBgClass: "bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 border-yellow-500/30" };
  return { label: "Riesgo Alto", color: "text-destructive", Icon: ShieldX, progressIndicatorClass: "bg-destructive", cardBgClass: "bg-gradient-to-r from-red-600/20 to-red-500/10 border-red-500/30" };
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { riskAssessment, detectedCategories, relevantExamples, recommendations } = analysis;
  const riskPresentation = getRiskPresentation(riskAssessment.riskScore);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6 w-full"
    >
      <motion.div variants={cardVariants}>
        <Card className={`shadow-lg text-card-foreground ${riskPresentation.cardBgClass}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-card-foreground">
              <Activity className="mr-3 h-7 w-7 text-primary" />
              Evaluación de Riesgo
            </CardTitle>
            <CardDescription className="text-muted-foreground">Nivel de riesgo general identificado en la conversación.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <riskPresentation.Icon className={`h-8 w-8 ${riskPresentation.color}`} />
              <span className={`text-2xl font-bold ${riskPresentation.color}`}>
                {riskAssessment.riskScore}/10 - {riskPresentation.label}
              </span>
            </div>
            <Progress
              value={riskAssessment.riskScore * 10}
              className="h-3 bg-muted"
              indicatorClassName={riskPresentation.progressIndicatorClass}
            />
            <div>
              <h4 className="font-semibold text-card-foreground">Resumen:</h4>
              <p className="text-muted-foreground">{riskAssessment.riskSummary}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="shadow-lg bg-card text-card-foreground border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-card-foreground">
              <ListChecks className="mr-3 h-7 w-7 text-primary" />
              Categorías Detectadas
            </CardTitle>
            <CardDescription className="text-muted-foreground">Categorías de posible preocupación identificadas.</CardDescription>
          </CardHeader>
          <CardContent>
            {detectedCategories.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {detectedCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-secondary text-secondary-foreground rounded-full shadow-sm">
                      <Tags className="mr-2 h-4 w-4 text-primary" />
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No se detectaron categorías específicas.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="shadow-lg bg-card text-card-foreground border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-card-foreground">
              <MessageSquareQuote className="mr-3 h-7 w-7 text-primary" />
              Ejemplos Relevantes
            </CardTitle>
            <CardDescription className="text-muted-foreground">Fragmentos de texto específicos que ilustran las categorías detectadas.</CardDescription>
          </CardHeader>
          <CardContent>
            {relevantExamples.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {relevantExamples.map((example, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-border">
                    <AccordionTrigger className="text-left hover:no-underline text-card-foreground">
                      Ejemplo {index + 1}
                    </AccordionTrigger>
                    <AccordionContent>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        {example}
                      </blockquote>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground">No hay ejemplos específicos destacados por el análisis.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="shadow-lg bg-card text-card-foreground border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-card-foreground">
              <ClipboardCheck className="mr-3 h-7 w-7 text-primary" />
              Recomendaciones
            </CardTitle>
            <CardDescription className="text-muted-foreground">Sugerencias personalizadas basadas en el análisis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recommendations.split('\n').map((rec, index) => (
              rec.trim() && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start p-3 bg-muted/30 rounded-lg border border-border/50"
                >
                  <Lightbulb className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                  <p className="text-muted-foreground flex-1">{rec}</p>
                </motion.div>
              )
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
