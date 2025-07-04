
# Alumbra Backend

## Descripción del Proyecto

Alumbra Backend es el servicio de servidor para la aplicación Alumbra AI. Su propósito principal es analizar textos de conversaciones para identificar posibles signos de abuso emocional, manipulación y evaluar niveles de riesgo. Proporciona a los usuarios información detallada sobre sus interacciones y, opcionalmente, puede alertar a un contacto de emergencia designado a través de un servicio de correo electrónico externo.

Este backend está diseñado con un fuerte enfoque en la privacidad del usuario, asegurando que la información sensible, como los detalles del contacto de emergencia, no se almacene en el servidor.

## Funcionalidades Principales

1.  **Análisis de Conversaciones:**
    *   Recibe texto de conversaciones enviado por los usuarios.
    *   Utiliza un servicio de IA (conceptualizado para usar Gemini o similar) para analizar el texto en busca de patrones de abuso emocional, manipulación y otros indicadores de riesgo.
    *   Devuelve un informe de análisis detallado que incluye:
        *   Puntuación de riesgo.
        *   Resumen del riesgo.
        *   Categorías de abuso detectadas (por ejemplo, gaslighting, menosprecio).
        *   Ejemplos relevantes extraídos del texto.
        *   Recomendaciones personalizadas.

2.  **Gestión de Cuestionarios (Conceptual):**
    *   Permite a los usuarios enviar un cuestionario inicial para proporcionar contexto sobre su situación, lo que puede ayudar a personalizar el análisis y las alertas.

3.  **Sistema de Alertas de Emergencia:**
    *   Si un análisis supera un umbral de riesgo predefinido y el usuario ha configurado un contacto de emergencia, el sistema puede iniciar una alerta.
    *   **Importante:** El backend NO almacena la información de contacto de emergencia (por ejemplo, correo electrónico). En su lugar, pasa los detalles necesarios (sin el contacto directo) a un servicio de correo electrónico externo a través de un webhook seguro. Este servicio externo es responsable de enviar el correo electrónico al contacto de emergencia.
    *   Registra el envío de alertas (sin datos sensibles del contacto) para fines de auditoría.

4.  **Manejo de Webhooks:**
    *   Recibe actualizaciones de estado del servicio de correo electrónico externo (por ejemplo, correo enviado, entregado, rebotado) para rastrear el estado de las alertas.

## Flujo de Funcionamiento (Alto Nivel)

1.  **Usuario (Frontend):** Envía texto de una conversación para analizar. Opcionalmente, puede haber enviado previamente un cuestionario.
2.  **Backend (Analysis Controller & Service):**
    *   Recibe la solicitud.
    *   Sanitiza y valida la entrada.
    *   Llama al `GeminiService` (o servicio de IA equivalente) para realizar el análisis del lenguaje natural.
    *   El `AnalysisService` formatea los resultados.
3.  **Respuesta al Usuario:** El backend devuelve el informe de análisis detallado al frontend.
4.  **Proceso de Alerta (si aplica):**
    *   Si el análisis indica un alto riesgo y hay un contacto de emergencia configurado (gestionado por el frontend y pasado de forma segura para esta transacción específica):
        *   `AlertService` prepara la información no sensible para la alerta.
        *   `EmailService` envía una solicitud a un webhook externo (servicio de correo) con los detalles para la plantilla de correo y la información del destinatario (manejada por el servicio externo).
        *   Se registra un `AlertModel` en la base de datos (sin el contacto de emergencia).
5.  **Actualización de Estado de Alerta (Webhook):**
    *   El servicio de correo externo envía un webhook al backend (`WebhookController` y `WebhookService`) con actualizaciones sobre el estado del correo de alerta (enviado, entregado, etc.).
    *   El `AlertModel` se actualiza correspondientemente.

## Consideraciones de Seguridad y Privacidad

*   **No Almacenamiento de Contactos de Emergencia:** La principal medida de privacidad es que el backend *nunca* almacena la información de contacto de emergencia. Esta información se maneja de forma transaccional y se pasa directamente al servicio de webhook de correo para su envío.
*   **Sanitización de Entradas:** Se deben implementar middlewares para sanitizar las entradas y evitar la persistencia o el registro de datos no deseados.
*   **Análisis Temporal de Datos:** Los resultados del análisis pueden almacenarse temporalmente si es necesario para la funcionalidad de la aplicación, pero se debe considerar el uso de TTL (Time-To-Live) para la eliminación automática.
*   **Comunicación Segura:** Se asume HTTPS para todas las comunicaciones.
*   **Autenticación (Opcional):** Si se implementa la autenticación de usuarios, se deben seguir las mejores prácticas para la gestión de tokens y contraseñas.

## Tecnologías (Ejemplo)

*   **Node.js**
*   **Express.js** (Framework web)
*   **MongoDB** (o similar, para almacenamiento temporal y modelos de datos si es necesario)
*   **API de Gemini de Google AI** (o similar, para el análisis de PLN)
*   Servicio de Webhook Externo para correos (por ejemplo, SendGrid, Mailgun, o un servicio personalizado)

## Estructura del Proyecto

El proyecto sigue una estructura modular para separar las preocupaciones:

*   `config/`: Configuraciones de base de datos, variables de entorno.
*   `controllers/`: Lógica de manejo de solicitudes HTTP.
*   `middleware/`: Funciones para procesar solicitudes antes de llegar a los controladores.
*   `models/`: Definiciones de esquemas de datos (si se usa ORM/ODM).
*   `routes/`: Definición de las rutas API.
*   `services/`: Lógica de negocio principal y comunicación con servicios externos.
*   `utils/`: Utilidades compartidas (logger, manipulación de texto/correo).
*   `views/`: Plantillas de correo (conceptuales, ya que el renderizado final lo hace el servicio externo).

## Instalación y Ejecución (Desarrollo)

1.  **Clonar el repositorio:**
    ```bash
    git clone <repository_url>
    cd alumbra-backend
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar variables de entorno:**
    *   Crear un archivo `.env` en la raíz de `alumbra-backend/`.
    *   Añadir las variables necesarias (ver `alumbra-backend/config/env.config.js` y los servicios que las usan, como `GEMINI_API_KEY`, `WEBHOOK_URL`).
    ```env
    PORT=3001
    NODE_ENV=development
    GEMINI_API_KEY=tu_api_key_de_gemini
    WEBHOOK_URL=la_url_de_tu_servicio_de_webhook_de_correo
    # MONGODB_URI=mongodb://localhost:27017/alumbra_db (si se usa MongoDB)
    ```
4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor estará disponible en `http://localhost:3001` (o el puerto configurado).

## Endpoints API Principales (Ejemplos)

*   `POST /api/analysis`: Envía texto de conversación para análisis.
*   `POST /api/questionnaires` (si aplica): Envía un cuestionario.
*   `POST /api/alerts/trigger` (interno o protegido): Inicia una alerta.
*   `POST /api/webhooks/email-service`: Endpoint para recibir webhooks del servicio de correo.

---

Este README proporciona una visión general del proyecto Alumbra Backend. Para detalles específicos sobre la implementación de cada módulo, consulte el código fuente y los comentarios dentro de cada archivo.
