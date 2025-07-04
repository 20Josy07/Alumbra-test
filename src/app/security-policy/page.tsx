
'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SecurityPolicyPage: NextPage = () => {
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

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Política de Seguridad de Alumbra AI</h1>
        
        <div className="space-y-6 text-muted-foreground prose prose-invert lg:prose-xl">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Compromiso con la Seguridad</h2>
            <p>En Alumbra AI, la seguridad de tu información es una prioridad. Nos comprometemos a aplicar las mejores prácticas de seguridad para proteger los datos que nos confías, incluyendo tanto la información personal como las conversaciones analizadas por la plataforma.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Principios de Seguridad</h2>
            <p>Nuestra política de seguridad se basa en los siguientes principios:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Confidencialidad:</strong> Solo las personas autorizadas pueden acceder a los datos.</li>
              <li><strong>Integridad:</strong> Protegemos la exactitud y consistencia de los datos contra modificaciones no autorizadas.</li>
              <li><strong>Disponibilidad:</strong> Mantenemos nuestros servicios activos y accesibles, incluso ante fallos o ataques.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Medidas Técnicas Implementadas</h2>
            <p>Aplicamos diversas medidas de seguridad para garantizar la protección de la información:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Cifrado de datos en tránsito y en reposo:</strong> Toda la información se transmite a través de conexiones seguras (HTTPS/TLS). Los datos almacenados en Firebase o servidores asociados se cifran automáticamente.</li>
              <li><strong>Autenticación segura:</strong> Utilizamos mecanismos robustos de autenticación (como Firebase Auth) y tokens de sesión protegidos.</li>
              <li><strong>Control de acceso:</strong> El acceso a los datos está limitado a personal autorizado bajo el principio de menor privilegio.</li>
              <li><strong>Monitorización activa:</strong> Supervisamos eventos inusuales o intentos de acceso no autorizado mediante herramientas de monitoreo.</li>
              <li><strong>Backups automáticos:</strong> Realizamos copias de seguridad periódicas para evitar la pérdida de información crítica.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Seguridad en el Análisis de Conversaciones</h2>
            <p>El contenido ingresado en la plataforma para análisis emocional no se almacena de forma permanente sin consentimiento. La información es procesada en tiempo real mediante modelos de lenguaje y luego descartada, salvo que el usuario elija guardar resultados en su historial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Gestión de Vulnerabilidades</h2>
            <p>Contamos con un proceso continuo de identificación, análisis y mitigación de vulnerabilidades:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Aplicamos actualizaciones de seguridad periódicas en el software y dependencias.</li>
              <li>Utilizamos herramientas de análisis estático y dinámico para detectar fallos de seguridad.</li>
              <li>Evaluamos y mitigamos riesgos relacionados con el uso de modelos de IA, siguiendo buenas prácticas de alineamiento y revisión ética.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Compromiso con la Privacidad</h2>
            <p>La seguridad está estrechamente vinculada con la privacidad. Nuestras políticas están alineadas con la <strong>Política de Privacidad de Alumbra AI</strong>, garantizando que los datos se manejen de manera ética, segura y conforme a la ley.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Respuesta ante Incidentes</h2>
            <p>En caso de detectarse una violación de seguridad o fuga de datos, activaremos nuestro plan de respuesta que incluye:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Evaluación inmediata del incidente.</li>
              <li>Contención y mitigación del riesgo.</li>
              <li>Notificación a los usuarios afectados, si corresponde.</li>
              <li>Documentación y mejora de los controles de seguridad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Recomendaciones al Usuario</h2>
            <p>Para contribuir con la seguridad de tu cuenta, te recomendamos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Usar contraseñas seguras y no compartirlas.</li>
              <li>Cerrar sesión en dispositivos compartidos.</li>
              <li>Reportar cualquier actividad sospechosa a nuestro equipo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Actualizaciones de esta Política</h2>
            <p>Podemos actualizar esta Política de Seguridad para adaptarla a cambios tecnológicos o normativos. Notificaremos cualquier cambio importante a través de la aplicación o el sitio web.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">10. Contacto</h2>
            <p>Si tienes preguntas, inquietudes o deseas reportar una vulnerabilidad, puedes contactarnos a:</p>
            <p>
              <span role="img" aria-label="email emoji">📧</span> <a href="mailto:alumbraia@gmail.com" className="text-primary hover:underline font-semibold">alumbraia@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SecurityPolicyPage;
