
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, Users, BarChart3, ShieldCheck, MessageSquareText, FileText, Eye, Smile, Search } from 'lucide-react';

// Removed metadata export as this is a Client Component

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="shadow-lg bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center space-x-3 pb-3">
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle className="text-xl text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function ComoFuncionaPage() {
  const router = useRouter();

  const steps = [
    {
      icon: FileText,
      title: "Paso 1: El Cuestionario Inicial (Opcional)",
      description: "Antes de analizar una conversación, puedes completar un cuestionario breve. Esto nos ayuda a entender mejor el contexto de la relación (pareja, familiar, laboral, etc.) y tus preocupaciones generales. Esta información, si la proporcionas, se almacena localmente en tu navegador y puede ayudar a refinar el análisis, aunque no es obligatoria."
    },
    {
      icon: MessageSquareText,
      title: "Paso 2: Análisis de Conversación",
      description: "Copia y pega el texto de la conversación que deseas analizar en el área designada. Nuestra IA, impulsada por Genkit y modelos avanzados, procesará el texto para identificar patrones, lenguaje y dinámicas que podrían indicar abuso emocional, manipulación o niveles de riesgo."
    },
    {
      icon: Eye,
      title: "Paso 3: Visualización de Resultados",
      description: "Una vez completado el análisis, te presentamos un informe detallado que incluye: una puntuación de riesgo, un resumen de los hallazgos, las categorías de posible abuso detectadas (ej. gaslighting, menosprecio), ejemplos específicos del texto que ilustran estos puntos, y recomendaciones personalizadas."
    },
    {
      icon: ShieldCheck,
      title: "Beneficios Clave",
      description: "Obtén claridad sobre dinámicas conversacionales complejas, identifica señales de alerta tempranas, recibe validación para tus sentimientos y accede a recomendaciones para tomar decisiones informadas sobre tus relaciones."
    },
    {
      icon: Users,
      title: "Casos de Uso Recomendados",
      description: "Ideal para analizar interacciones con parejas, familiares, amigos, o en el entorno laboral donde sientas que algo no está bien. Útil para entender mejor si estás experimentando manipulación, invalidación, o cualquier forma de abuso emocional sutil o evidente."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        <header className="text-center mb-10 md:mb-12">
          <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            ¿Cómo funciona esta herramienta?
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Alumbra AI está diseñada para ayudarte a obtener claridad sobre tus interacciones y relaciones, identificando posibles señales de alerta en tus conversaciones.
          </p>
        </header>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <StepCard key={index} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>

        <Card className="mt-12 shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-card-foreground">
              <Search className="mr-3 h-7 w-7 text-primary" />
              ¿Qué Analiza Exactamente la Herramienta?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>Alumbra AI se enfoca en detectar indicadores de:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Abuso Emocional:</strong> Tácticas como insultos, humillaciones, críticas constantes, intimidación.</li>
              <li><strong>Manipulación Psicológica:</strong> Técnicas como el gaslighting (hacerte dudar de tu propia percepción o memoria), el chantaje emocional, la victimización.</li>
              <li><strong>Control Coercitivo:</strong> Intentos de aislarte, controlar tus decisiones, tus finanzas o tus movimientos.</li>
              <li><strong>Niveles de Riesgo:</strong> Evalúa la intensidad y frecuencia de las conductas detectadas para ofrecer una perspectiva sobre el posible impacto en tu bienestar.</li>
            </ul>
            <p className="mt-4">
              Es importante recordar que Alumbra AI es una herramienta de apoyo y concienciación. No reemplaza el diagnóstico ni el consejo de un profesional de la salud mental o legal.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link href="/questionnaire" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Comenzar Análisis Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
