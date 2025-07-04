

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader as AlertDialogHeaderComponent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertTriangle,
  Frown,
  Shield,
  Sparkles,
  Heart,
  Instagram,
  Twitter,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Gauge,
  Lightbulb,
  Zap,
  Smartphone,
  Disc3,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Quote,
  MessageCircle,
  Brain,
  Mail,
  Github
} from 'lucide-react';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import { getReviews, type Review as ServerReview } from './actions';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Marquee } from "@/components/ui/marquee";


const conversationExampleText = "Eres estúpido, ¿Cómo pudiste hacer eso? ¡Eres un idiota!\nCálmate, fue un error...\n¡Un error! Siempre arruinas todo. No sirves para nada.";

interface HeroSectionProps {
  user: any; // Use a more specific type if available, e.g., CustomUser from auth-context
  loading: boolean;
}

export function HeroSection({ user, loading }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-[#581c87] via-[#301744] to-[#1e0a2b] flex flex-col items-center px-6 overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background lights */}
        <div className="absolute top-[10%] left-[15%] w-32 h-32 md:w-48 md:h-48 bg-purple-500/25 rounded-full blur-3xl animate-light-move-1 opacity-60"></div>
        <div className="absolute top-[25%] right-[10%] w-40 h-40 md:w-56 md:h-56 bg-pink-500/20 rounded-full blur-3xl animate-light-move-2 delay-700 opacity-50"></div>
        <div className="absolute bottom-[15%] left-[25%] w-36 h-36 md:w-52 md:h-52 bg-indigo-500/20 rounded-full blur-3xl animate-light-move-3 delay-1000 opacity-55"></div>
        <div className="absolute bottom-[20%] right-[20%] w-28 h-28 md:w-40 md:h-40 bg-fuchsia-500/30 rounded-full blur-2xl animate-light-move-4 delay-1300 opacity-65"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between text-center md:text-left flex-grow pt-16 pb-16 md:pt-24 md:pb-32">
        <div className="flex-1 flex flex-col items-center md:items-start md:mr-24">
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
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
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

        {/* Screenshot Placeholder */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-none md:w-[600px] h-[306px] md:h-[410px] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
            <img
              src="/Alumbra.png"
              alt="Captura de pantalla de Alumbra"
              className="w-full h-full object-cover scale-115"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
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
}

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Análisis instantáneo",
      description: "Resultados en segundos para conversaciones de WhatsApp y redes sociales",
    },
    {
      icon: Brain,
      title: "Detección inteligente",
      description: "IA avanzada que identifica humillación, manipulación y control emocional",
    },
    {
      icon: Heart,
      title: "Recomendaciones personalizadas",
      description: "Consejos específicos para proteger tu bienestar emocional",
      iconClassName: "text-primary-foreground", 
    },
    {
      icon: Shield,
      title: "Privacidad total",
      description: "Sin almacenamiento de datos sensibles, análisis completamente privado",
    },
    {
      icon: Smartphone,
      title: "100% gratuito",
      description: "Acceso libre para todos, sin costos ocultos ni suscripciones",
    },
     {
      icon: Disc3,
      title: "Soporte Comunitario",
      description: "Conéctate con otros y comparte experiencias de forma segura.",
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Funcionalidades que te protegen</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Herramientas poderosas diseñadas para tu bienestar emocional y privacidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group h-full">
              <div className="bg-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border h-full flex flex-col">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={cn("w-8 h-8", feature.iconClassName || "text-primary-foreground")} />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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


export function Testimonials({ reviews, isLoading }: { reviews: ServerReview[], isLoading: boolean }) {
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
}

export function FeedbackCallToAction() {
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
}

export function Mission() {
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
}


export function FAQ() {
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
}

export function Footer() {
  const [currentYear, setCurrentYear] = useState<string | number>('');

  useEffect(() => {
    const year = new Date().getFullYear().toString();
    setCurrentYear(year);
  }, []);

  return (
    <footer className="bg-[#1a0d26] py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
               {/* <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#6EE7B7] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div> */}
              <span className="text-white font-bold text-xl">Alumbra</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Ilumina tu bienestar emocional con inteligencia artificial. Detecta abuso psicológico en conversaciones
              digitales de forma gratuita y privada.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/60">
                <Heart className="w-4 h-4 text-fuchsia-500" />
                <span className="text-sm">100% Gratuito</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <Shield className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-sm">Privado</span>
              </div>
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
                <a href="https://github.com/alumbra-ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/AlumbraIA" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
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
}


export default function HomePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentYear, setCurrentYear] = useState<string | number>('');
  const [reviews, setReviews] = useState<ServerReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const fetchReviewsData = useCallback(async () => {
    setIsLoadingReviews(true);
    setReviewsError(null);
    try {
      const result = await getReviews();
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        setReviewsError(result.error || "No se pudieron cargar los comentarios.");
        toast({
          variant: "destructive",
          title: "Error al Cargar Comentarios",
          description: result.error || "No se pudieron cargar los comentarios. Intenta de nuevo más tarde.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al cargar comentarios.";
      setReviewsError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: errorMessage,
      });
    }
    setIsLoadingReviews(false);
  }, [toast]);

  useEffect(() => {
    const year = new Date().getFullYear().toString();
    setCurrentYear(year);
    fetchReviewsData();
  }, [fetchReviewsData]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground w-full">
      <HeroSection user={user} loading={isLoadingReviews} />
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

