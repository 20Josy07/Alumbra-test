
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageSquare, HelpCircle, LifeBuoy } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    id: "faq-1",
    question: "¿Es seguro compartir mis conversaciones con Alumbra?",
    answer: "Sí, la seguridad y privacidad de tus conversaciones son nuestra máxima prioridad. Utilizamos encriptación y medidas de seguridad robustas para proteger tus datos. Las conversaciones se analizan de forma anónima y no se almacenan permanentemente a menos que tú decidas guardarlas."
  },
  {
    id: "faq-2",
    question: "¿Qué tipos de abuso psicológico puede detectar Alumbra?",
    answer: "Alumbra está diseñado para identificar patrones comunes de abuso emocional y manipulación, como gaslighting, menosprecio, control coercitivo, aislamiento, amenazas veladas, entre otros. El análisis proporciona una visión general y no un diagnóstico definitivo."
  },
  {
    id: "faq-3",
    question: "¿Cómo funciona el sistema de alerta de emergencia?",
    answer: "Si habilitas la función y proporcionas un contacto de emergencia, Alumbra puede enviar una notificación a ese contacto si el análisis de una conversación indica un nivel de riesgo muy alto. Esta función es opcional y requiere tu configuración explícita."
  },
  {
    id: "faq-4",
    question: "¿Qué tan preciso es el análisis de Alumbra?",
    answer: "Alumbra utiliza inteligencia artificial avanzada, pero es importante recordar que es una herramienta de apoyo y no un sustituto del juicio humano o profesional. La precisión puede variar según la complejidad y el contexto de la conversación. Siempre recomendamos buscar asesoramiento profesional si tienes preocupaciones serias."
  },
  {
    id: "faq-5",
    question: "¿Puedo usar Alumbra para analizar conversaciones en cualquier idioma?",
    answer: "Actualmente, Alumbra está optimizado principalmente para el análisis de conversaciones en español. Estamos trabajando para ampliar el soporte a más idiomas en el futuro."
  }
];

export default function SupportPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Centro de Soporte de Alumbra AI</h1>
        <p className="text-md md:text-lg text-muted-foreground">
          Estamos aquí para ayudarte. Encuentra respuestas o contáctanos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg bg-card text-card-foreground md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <HelpCircle className="mr-3 h-6 w-6 text-primary" />
              Preguntas Frecuentes (FAQ)
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Encuentra respuestas rápidas a las preguntas más comunes sobre Alumbra AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="bg-background/50 border-border rounded-lg shadow-sm">
                  <AccordionTrigger className="px-4 py-3 text-left text-card-foreground hover:no-underline font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-1 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <Mail className="mr-3 h-6 w-6 text-primary" />
              Contacto por Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Envíanos un correo electrónico con tus consultas o problemas técnicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">
              Puedes contactarnos en:
            </p>
            <Button variant="default" className="w-full" asChild>
              <Link href="mailto:soporte@alumbra.ai">
                <Mail className="mr-2 h-4 w-4" />
                soporte@alumbra.ai
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Nuestro equipo te responderá lo antes posible.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <MessageSquare className="mr-3 h-6 w-6 text-primary" />
              Guías y Tutoriales
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Aprende a usar Alumbra AI y saca el máximo provecho de sus funciones con nuestras guías detalladas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Estamos preparando guías completas para ayudarte a entender cada aspecto de la aplicación. ¡Vuelve pronto para revisarlas!
            </p>
             <Button variant="outline" className="w-full" disabled>
              Ver Guías (Próximamente)
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="mt-12 text-center">
            <p className="text-muted-foreground">
                ¿No encuentras lo que buscas? Visita nuestra comunidad o contáctanos de otras formas.
            </p>
       </div>
    </div>
  );
}
