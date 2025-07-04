
'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Política de Privacidad de Alumbra AI</h1>
        

        <div className="space-y-6 text-muted-foreground prose prose-invert lg:prose-xl">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introducción</h2>
            <p>Bienvenido/a a Alumbra AI. Nos comprometemos a proteger tu privacidad y garantizar la confidencialidad de tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, divulgamos y protegemos tu información al utilizar la pagina Alumbra AI. Al acceder o utilizar Alumbra, aceptas los términos descritos a continuación.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Información que Recopilamos</h2>
            <p>Podemos recopilar diversos tipos de información para proporcionarte nuestros servicios de manera efectiva:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Datos personales:</strong> nombre, apellido, edad, género y correo electrónico. También podemos recopilar información de contacto de emergencia si decides proporcionarla.
              </li>
              <li>
                <strong>Datos del cuestionario:</strong> respuestas al cuestionario inicial sobre tu relación y percepción emocional de las personas involucradas en las conversaciones analizadas.
              </li>
              <li>
                <strong>Datos de conversación:</strong> texto de los mensajes ingresados para análisis. Alumbra procesa esta información de forma temporal y no la almacena de forma permanente asociada a tu identidad sin tu consentimiento explícito.
              </li>
              <li>
                <strong>Datos de retroalimentación:</strong> comentarios y sugerencias que envías a través de la función de retroalimentación, posiblemente vinculados a tu ID de usuario.
              </li>
              <li>
                <strong>Datos de uso:</strong> dirección IP, tipo de navegador, sistema operativo, tiempos de acceso y páginas visitadas antes o después de usar la Aplicación.
              </li>
              <li>
                <strong>Datos del dispositivo móvil:</strong> modelo, fabricante, identificador del dispositivo, sistema operativo y ubicación (si lo permites).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Uso de la Información</h2>
            <p>La información recopilada se utiliza con los siguientes fines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Crear y administrar tu cuenta.</li>
              <li>Procesar conversaciones para detectar señales de abuso emocional.</li>
              <li>Generar informes personalizados con alertas y recomendaciones.</li>
              <li>Personalizar la experiencia de usuario.</li>
              <li>Activar funciones de emergencia configuradas por ti.</li>
              <li>Mejorar continuamente la Aplicación mediante análisis de uso y retroalimentación.</li>
              <li>Notificarte sobre actualizaciones o nuevas funciones.</li>
              <li>Brindar soporte técnico y responder a tus solicitudes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Divulgación de la Información</h2>
            <p>Podemos compartir tu información únicamente en los siguientes casos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Obligación legal o protección de derechos:</strong> cuando sea requerido por ley o necesario para proteger derechos propios o de terceros.
              </li>
              <li>
                <strong>Proveedores de servicios:</strong> terceros que nos prestan soporte en análisis, autenticación y alertas (como Google AI, Firebase o servicios de email vía webhook).
              </li>
              <li>
                <strong>Transferencias comerciales:</strong> en caso de fusión, adquisición o reestructuración corporativa, tu información podría transferirse conforme a los términos aplicables.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Cookies y Tecnologías de Seguimiento</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar la funcionalidad de la Aplicación. No usamos estas tecnologías para recolectar información personal sin tu consentimiento. Puedes rechazar el uso de cookies modificando la configuración de tu navegador, aunque esto puede afectar tu experiencia de uso.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Seguridad de la Información</h2>
            <p>Aplicamos medidas administrativas, técnicas y físicas para proteger tu información personal. Aunque nos esforzamos por garantizar la seguridad de los datos, ningún sistema es completamente invulnerable. Recomendamos no compartir información altamente sensible por medios no cifrados.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Política para Menores de Edad</h2>
            <p>No recopilamos intencionalmente datos de menores de 13 años. Si descubrimos que se ha recopilado información de un menor sin el consentimiento de sus tutores, eliminaremos esa información de inmediato. Si eres padre/madre o tutor legal y crees que tu hijo/a nos ha proporcionado datos personales, contáctanos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Derechos del Usuario</h2>
            <p>Dependiendo de tu país de residencia, puedes tener derechos sobre tus datos personales, como el acceso, rectificación, eliminación o restricción de uso. Puedes ejercer estos derechos escribiéndonos a nuestro correo de privacidad.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Cambios en esta Política de Privacidad</h2>
            <p>Esta Política podrá actualizarse ocasionalmente. Cualquier cambio será comunicado en la Aplicación y se considerará vigente desde su publicación. Te recomendamos revisarla periódicamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">10. Contacto</h2>
            <p>Para cualquier consulta sobre esta Política de Privacidad, puedes escribirnos a:</p>
            <p>
              <span role="img" aria-label="email emoji">📧</span> <a href="mailto:alumbraia@gmail.com" className="text-primary hover:underline font-semibold">alumbraia@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
