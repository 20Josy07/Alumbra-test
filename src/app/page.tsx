

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertTriangle,
  Frown,
  Shield,
  Sparkles,
  Heart,
  Instagram,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Quote,
  Mail
} from 'lucide-react';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import TerminalTextAnimation from '@/components/ui/terminal-text-animation';
import { cn } from "@/lib/utils";
import { getReviews, getStatistics, type Review as ServerReview } from './actions';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Marquee } from "@/components/ui/marquee";


const conversationExampleText = "Eres estúpido, ¿Cómo pudiste hacer eso? ¡Eres un idiota!\nCálmate, fue un error...\n¡Un error! Siempre arruinas todo. No sirves para nada.";

interface HeroSectionProps {
  user: any; // Use a more specific type if available, e.g., CustomUser from auth-context
  loading: boolean;
}

export const HeroSection = React.memo(function HeroSection({ user, loading }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-[#581c87] via-[#301744] to-[#1e0a2b] flex flex-col items-center px-6 overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background lights */}
        <div className="absolute top-[10%] left-[15%] w-32 h-32 md:w-48 md:h-48 bg-purple-500/25 rounded-full blur-3xl animate-light-move-1 opacity-60"></div>
        <div className="absolute top-[25%] right-[10%] w-40 h-40 md:w-56 md:h-56 bg-pink-500/20 rounded-full blur-3xl animate-light-move-2 delay-700 opacity-50"></div>
        <div className="absolute bottom-[15%] left-[25%] w-36 h-36 md:w-52 md:h-52 bg-indigo-500/20 rounded-full blur-3xl animate-light-move-3 delay-1000 opacity-55"></div>
        <div className="absolute bottom-[20%] right-[20%] w-28 h-28 md:w-40 md:h-40 bg-fuchsia-500/30 rounded-full blur-2xl animate-light-move-4 delay-1300 opacity-65"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between text-center md:text-left flex-grow pt-16 pb-8 md:pt-24 md:pb-16">
        <div className="flex-1 flex flex-col items-start md:mr-24">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 mb-6">
            <span className="mr-2 text-purple-300">✨</span> Gratis • Privado • Impulsado por IA
          </div>

          {/* Main heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
             <AnimatedShinyText
              className="inline animate-gradient bg-gradient-to-r from-[#f8d851] via-[#a856f6] to-[#f8d851] bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent"
              style={{ '--shimmer-width': '200%' } as React.CSSProperties}
            >
              Alumbra
            </AnimatedShinyText>
            : Ponle luz a tus palabras, claridad a tus vínculos
        </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto md:mx-0 leading-relaxed">
            Analiza tus conversaciones gratis con IA y detecta abuso psicológico en segundos. Protege tu bienestar
            emocional con claridad y privacidad.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12">
            {loading ? (
              <Spinner size={24} className="text-white" />
            ) : user && (user as any).type === 'psychologist' ? (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/dashboard">
                  <Shield className="w-5 h-5 mr-2" />
                  Acceder a mi Panel
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/questionnaire">
                  <Shield className="w-5 h-5 mr-2" />
                  Probar Alumbra ahora
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 text-lg rounded-full"
            >
              <Link href="/como-funciona">
                Ver cómo funciona
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col gap-4 text-white/60 w-full items-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-fuchsia-500" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#8B5CF6]" />
                <span>Privacidad garantizada</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#f8d851]" />
              <span>Análisis en segundos</span>
            </div>
          </div>
        </div>

        {/* Terminal Screenshot Mockup */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-none md:w-[600px] h-[380px] md:h-[450px] rounded-xl shadow-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#1e0a2b] to-[#0a0d1a] flex flex-col transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl">
            {/* Terminal Header */}
            <div className="flex items-center p-3 bg-[#301744] border-b border-white/15">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></span>
              </div>
              <div className="flex-grow text-center text-white/70 text-sm font-mono tracking-wide">
                Análisis de Conversación
              </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-grow p-6 text-white/90 text-sm font-mono flex flex-col backdrop-blur-sm">
              {/* Conversation Text */}
              <div className="bg-[#301744]/70 rounded-lg p-5 mb-5 flex-grow flex items-center justify-center border border-white/5 shadow-inner h-[150px] overflow-hidden">
                <TerminalTextAnimation
                  textToType={conversationExampleText}
                  typingSpeed={40}
                  className="text-white/90 text-base md:text-lg leading-relaxed"
                />
              </div>

              {/* Emotional State */}
              <div className="mb-4">
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Estado Emocional</h3>
                <div className="flex items-center text-red-400 bg-red-600/20 rounded-md px-3 py-2">
                  <Frown className="w-5 h-5 mr-2 text-red-300" />
                  <span className="text-lg font-medium">Negativo</span>
                </div>
              </div>

              {/* Alert */}
              <div>
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Alerta</h3>
                <div className="flex items-center text-red-500 bg-red-600/20 rounded-md px-3 py-2">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  <span className="text-lg font-medium">Abuso / Manipulación</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    </section>
  )
});

interface Statistics {
  users: string;
  conversations: string;
  alerts: string;
}

interface StatisticsSectionProps {
  statistics: Statistics | null;
  isLoading: boolean;
}

export const StatisticsSection = React.memo(function StatisticsSection({ statistics, isLoading }: StatisticsSectionProps) {
  return (
    <section className="py-20 bg-background w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nuestro impacto en el mundo
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16">
          Estamos comprometidos con la protección del bienestar emocional. Aquí algunos números que demuestran nuestro alcance.
        </p>

        {isLoading ? (
          <Spinner size={48} className="text-primary" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Usuarios en la plataforma */}
            <Card className="bg-card p-6 rounded-2xl shadow-lg flex flex-col items-start text-left">
              <CardContent className="p-0">
                <h3 className="text-4xl font-bold text-foreground mb-2">{statistics?.users || 'Cargando...'}</h3>
                <p className="text-lg font-semibold text-muted-foreground mb-4">Usuarios en la plataforma</p>
                <p className="text-sm text-muted-foreground">
                  Personas que han utilizado Alumbra para analizar sus conversaciones.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Conversaciones analizadas */}
            <Card className="bg-[#1a1a2e] p-6 rounded-2xl shadow-lg flex flex-col items-start text-left text-white">
              <CardContent className="p-0">
                <h3 className="text-4xl font-bold mb-2">{statistics?.conversations || 'Cargando...'}</h3>
                <p className="text-lg font-semibold text-white/80 mb-4">
                  Conversaciones analizadas
                </p>
                <p className="text-sm text-white/60">
                  Número total de conversaciones procesadas por nuestra IA.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Alertas generadas */}
            <Card className="bg-[#6a0dad] p-6 rounded-2xl shadow-lg flex flex-col items-start text-left text-white">
              <CardContent className="p-0">
                <h3 className="text-4xl font-bold mb-2">{statistics?.alerts || 'Cargando...'}</h3>
                <p className="text-lg font-semibold text-white/80 mb-4">Alertas generadas</p>
                <p className="text-sm text-white/60">
                  Alertas de riesgo emitidas para proteger el bienestar de los usuarios.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
});

export const HowItWorks = React.memo(function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Completa el cuestionario",
      description: "Responde unas breves preguntas para dar contexto a tu situación",
    },
    {
      icon: Users,
      title: "Contacto de emergencia",
      description: "Ingresa un contacto de confianza (no almacenamos esta información)",
    },
    {
      icon: MessageSquare, 
      title: "Comparte la conversación",
      description: "Copia y pega una conversación reciente de WhatsApp o redes sociales",
    },
    {
      icon: BarChart3,
      title: "Recibe tu análisis",
      description: "Obtén un análisis privado con puntaje de riesgo y recomendaciones",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-muted/20 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¿Cómo funciona Alumbra?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            En solo 4 pasos simples, obtén claridad sobre tus relaciones digitales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group h-full">
              <div className="bg-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4 flex-grow">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const Features = React.memo(function Features() {
  const features = [
    {
      title: "Análisis instantáneo",
      description: "Resultados en segundos para conversaciones de WhatsApp y redes sociales",
    },
    {
      title: "Detección inteligente",
      description: "IA avanzada que identifica humillación, manipulación y control emocional",
    },
    {
      title: "Recomendaciones personalizadas",
      description: "Consejos específicos para proteger tu bienestar emocional",
    },
    {
      title: "Privacidad total",
      description: "Sin almacenamiento de datos sensibles, análisis completamente privado",
    },
    {
      title: "100% gratuito",
      description: "Acceso libre para todos, sin costos ocultos ni suscripciones",
    },
     {
      title: "Soporte Comunitario",
      description: "Conéctate con otros y comparte experiencias de forma segura.",
    },
    {
      title: "Multiplataforma",
      description: "Disponible en web, móvil y próximamente como app, para que siempre tengas apoyo a la mano.",
    },
    {
      title: "Alertas tempranas",
      description: "Recibe notificaciones cuando se detectan señales de posible abuso emocional o manipulación recurrente.",
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 text-center lg:text-left">
          <p className="text-sm font-semibold text-purple-700 mb-2">Funcionalidades que te protegen</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Herramienta potente para cuidar tu bienestar emocional</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            En Alumbra, buscamos empoderar a las personas para identificar el abuso emocional en sus relaciones digitales, con una herramienta privada, accesible y potenciada por IA que promueve el bienestar y decisiones informadas.
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

function ReviewCard({ review }: { review: ServerReview }) {
  const getInitials = (name: string | null | undefined): string => {
    if (!name || name.trim() === "") return "??";
    const names = name.trim().split(/\s+/);
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const userTypeDisplay = review.userType === 'profesional' ? (review.profession || 'Profesional') : 'Usuario';

  return (
    <div className="relative w-80 mx-2 flex-shrink-0 min-h-[18rem] flex flex-col bg-card rounded-2xl p-6 sm:p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300">
      <div className="flex items-start mb-4">
        <Quote className="w-10 h-10 text-primary mr-3 flex-shrink-0" />
        <blockquote className="text-muted-foreground text-sm leading-relaxed italic flex-grow break-words whitespace-pre-wrap">
          "{review.text}"
        </blockquote>
      </div>
      <div className="mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={review.userPhotoURL || undefined} alt={review.userName || 'Avatar de Usuario'} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                {getInitials(review.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-sm text-foreground">{review.userName || "Usuario Anónimo"}</h4>
              <p className="text-xs text-muted-foreground">
                {userTypeDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export const Testimonials = React.memo(function Testimonials({ reviews, isLoading }: { reviews: ServerReview[], isLoading: boolean }) {
  const uniqueReviews = React.useMemo(() => {
    return [...new Map(reviews.map(item => [item['text'], item])).values()];
  }, [reviews]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-12 md:py-20 bg-muted/20 w-full max-w-7xl mx-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Historias que iluminan</h2>
          <Spinner />
          <p className="text-muted-foreground mt-4">Cargando testimonios...</p>
        </div>
      </section>
    );
  }

  if (!uniqueReviews || uniqueReviews.length === 0) {
    return (
      <section id="testimonials" className="py-12 md:py-20 bg-muted/20 w-full max-w-7xl mx-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Historias que iluminan</h2>
          <p className="text-xl text-muted-foreground mt-4">¡Sé el primero en dejar un comentario!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-muted/20 w-full max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Historias que iluminan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo Alumbra ha ayudado a personas como tú a encontrar claridad y protección
          </p>
        </div>
        {uniqueReviews.length === 1 ? (
          <div className="flex justify-center">
            <ReviewCard review={uniqueReviews[0]} key={uniqueReviews[0].id} />
          </div>
        ) : (
          <Marquee pauseOnHover className="[--duration:30s] [--gap:0.5rem]">
            {uniqueReviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </Marquee>
        )}
      </div>
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted/20 to-transparent pointer-events-none z-10 md:block hidden"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted/20 to-transparent pointer-events-none z-10 md:block hidden"></div>
    </section>
  );
});

export const FeedbackCallToAction = React.memo(function FeedbackCallToAction() {
  return (
    <section className="py-12 bg-background w-full text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          ¿Tienes algo que decirnos?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Tu opinión nos ayuda a mejorar. ¡Danos tu feedback y sé parte de la comunidad Alumbra!
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link href="/feedback">
            <MessageSquare className="w-5 h-5 mr-2" />
            Danos tu Opinión
          </Link>
        </Button>
      </div>
    </section>
  );
});

export const Mission = React.memo(function Mission() {
  return (
    <section id="mission" className="py-20 bg-muted/30 w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Nuestra Misión</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          En Alumbra, nuestra misión es empoderar a las personas para que reconozcan y comprendan
          las dinámicas de abuso emocional y manipulación en sus relaciones digitales,
          proporcionando una herramienta accesible, privada y basada en IA para fomentar
          el bienestar y la toma de decisiones informadas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Empatía y Apoyo</h3>
            <p className="text-muted-foreground">
              Ofrecer un espacio seguro y comprensivo para que los usuarios exploren sus
              preocupaciones sin juicio.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Conciencia y Educación</h3>
            <p className="text-muted-foreground">
              Aumentar la conciencia sobre las señales sutiles y evidentes del abuso psicológico
              en las interacciones cotidianas.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Privacidad y Seguridad</h3>
            <p className="text-muted-foreground">
              Garantizar la máxima privacidad y seguridad de los datos del usuario,
              construyendo confianza a través de la transparencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});


export const FAQ = React.memo(function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cómo protege Alumbra mi privacidad?",
      answer:
        "Alumbra no almacena ninguna conversación ni dato personal. Todo el análisis se realiza en tiempo real y los resultados se entregan directamente a ti. Tu contacto de emergencia tampoco se guarda en nuestros sistemas.",
    },
    {
      question: "¿Qué tipos de abuso psicológico detecta?",
      answer:
        "Alumbra identifica patrones de humillación, chantaje emocional, manipulación, control excesivo, aislamiento social, y otras formas de violencia psicológica comunes en relaciones tóxicas.",
    },
    {
      question: "¿Es realmente gratuito para siempre?",
      answer:
        "Sí, Alumbra es completamente gratuito. No hay costos ocultos, suscripciones ni límites de uso. Creemos que el acceso a herramientas de bienestar emocional debe ser universal.",
    },
    {
      question: "¿Qué pasa con mi contacto de emergencia?",
      answer:
        "Tu contacto de emergencia solo recibe una alerta si detectamos un nivel alto de riesgo. No almacenamos esta información y solo se usa para enviarte apoyo cuando más lo necesitas.",
    },
    {
      question: "¿Puedo usar Alumbra con conversaciones de cualquier plataforma?",
      answer:
        "Actualmente Alumbra funciona con conversaciones de WhatsApp, Instagram, Facebook Messenger, Telegram y otras plataformas de mensajería. Solo necesitas copiar y pegar el texto.",
    },
    {
      question: "¿Qué tan preciso es el análisis de Alumbra?",
      answer:
        "Alumbra utiliza inteligencia artificial avanzada entrenada específicamente para detectar patrones de abuso psicológico. Aunque es muy preciso, siempre recomendamos buscar apoyo profesional para situaciones complejas.",
    },
    {
      question: "¿Alumbra reemplaza la terapia psicológica?",
      answer:
        "No, Alumbra es una herramienta de apoyo que te ayuda a identificar señales de alarma. Para situaciones complejas o tratamiento, siempre recomendamos consultar con un profesional de la salud mental.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Preguntas frecuentes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre Alumbra y su funcionamiento
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full bg-card rounded-lg p-6 text-left hover:shadow-md transition-all duration-300 border border-border"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>

                {openIndex === index && (
                  <div
                    id={`faq-content-${index}`}
                    className="mt-4 pt-4 border-t border-border/50"
                  >
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export const Footer = React.memo(function Footer() {
  const [currentYear, setCurrentYear] = useState<string | number>('');

  useEffect(() => {
    const year = new Date().getFullYear().toString();
    setCurrentYear(year);
  }, []);

  return (
    <footer className="bg-[#0a0d1a] py-12 w-full text-white/70">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white font-bold text-xl">Alumbra</span>
            </div>
            <p className="mb-6 max-w-xs">
              Ilumina tu bienestar emocional con inteligencia artificial. Detecta abuso psicológico en conversaciones
              digitales de forma gratuita y privada.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:hola@alumbra.ai"
                className="hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/alumbra.ia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <a href="#como-funciona" className="text-white/70 hover:text-white transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="text-white/70 hover:text-white transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hola@alumbra.ai"
                  className="text-white/70 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>hola@alumbra.ai</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/alumbra.ia/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © {currentYear || new Date().getFullYear()} Alumbra. Hecho con <Heart className="w-4 h-4 inline text-fuchsia-500" /> para proteger tu bienestar
            emocional.
          </p>
        </div>
      </div>
    </footer>
  )
});


export default function HomePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ServerReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);

  const fetchReviewsData = useCallback(async () => {
    setIsLoadingReviews(true);
    try {
      const result = await getReviews();
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error al Cargar Comentarios",
          description: result.error || "No se pudieron cargar los comentarios. Intenta de nuevo más tarde.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al cargar comentarios.";
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: errorMessage,
      });
    }
    setIsLoadingReviews(false);
  }, [toast]);

  const fetchStatisticsData = useCallback(async () => {
    setIsLoadingStatistics(true);
    try {
      const result = await getStatistics();
      if (result.success && result.data) {
        setStatistics(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error al Cargar Estadísticas",
          description: result.error || "No se pudieron cargar las estadísticas. Intenta de nuevo más tarde.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al cargar estadísticas.";
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: errorMessage,
      });
    }
    setIsLoadingStatistics(false);
  }, [toast]);

  useEffect(() => {
    fetchReviewsData();
    fetchStatisticsData();
  }, [fetchReviewsData, fetchStatisticsData]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground w-full">
      <HeroSection user={user} loading={isLoadingReviews} />
      <StatisticsSection statistics={statistics} isLoading={isLoadingStatistics} />
      <HowItWorks />
      <Features />
      <Testimonials reviews={reviews} isLoading={isLoadingReviews} />
      <FeedbackCallToAction />
      <Mission />
      <FAQ />
      <Footer />
    </main>
  );
}

