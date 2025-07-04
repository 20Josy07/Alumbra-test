# Alumbra AI: Iluminando Conversaciones y Vínculos

**Alumbra AI** es una aplicación web diseñada para ayudar a las personas a identificar posibles señales de abuso emocional, manipulación y dinámicas tóxicas en sus conversaciones digitales. Utilizando inteligencia artificial, la herramienta analiza el texto proporcionado y ofrece percepciones sobre el nivel de riesgo, categorías de posible abuso, ejemplos concretos y recomendaciones personalizadas, todo ello con un fuerte enfoque en la privacidad del usuario.

## Funcionalidades Principales

La aplicación se divide en dos componentes principales: un frontend interactivo construido con Next.js y un backend (conceptualizado) con Node.js/Express para manejar ciertas lógicas de servicio.

### Frontend (AlumbraIA - Next.js)

*   **Página de Bienvenida:** Presenta la aplicación, sus beneficios y cómo funciona a alto nivel.
*   **Cuestionario Inicial Opcional:**
    *   Permite a los usuarios proporcionar contexto sobre la relación y sus preocupaciones antes de analizar una conversación.
    *   Los datos del cuestionario se almacenan localmente en el navegador del usuario.
    *   Se solicitan datos adicionales (nombre, edad, género, correo de emergencia opcional) para personalizar la experiencia y habilitar alertas.
*   **Análisis de Conversación Impulsado por IA (Genkit):**
    *   Los usuarios pueden pegar texto de conversaciones para su análisis.
    *   Se utiliza **Genkit** con modelos de Google AI (Gemini) para procesar el texto.
    *   El análisis identifica:
        *   Puntuación de riesgo.
        *   Resumen del riesgo.
        *   Categorías de abuso detectadas (ej. gaslighting, menosprecio).
        *   Ejemplos relevantes extraídos del texto.
        *   Recomendaciones personalizadas.
    *   Los resultados se presentan de forma clara y estructurada.
*   **Autenticación de Usuarios (Firebase):**
    *   Permite a los usuarios iniciar sesión con Google.
    *   El inicio de sesión es opcional para el análisis básico, pero necesario para enviar comentarios.
*   **Sistema de Comentarios:**
    *   Los usuarios autenticados pueden enviar comentarios sobre la aplicación.
    *   Los comentarios (texto, tipo de usuario) se almacenan en **Firestore Database**, junto con el nombre y foto de perfil del usuario.
    *   Los comentarios se muestran públicamente en un carrusel en la página de inicio.
*   **Páginas Informativas:**
    *   "Cómo Funciona": Detalla el proceso de uso de la herramienta.
    *   "Soporte": Proporciona FAQs y un medio de contacto.
    *   "Política de Privacidad" y "Política de Seguridad".
*   **Interfaz de Usuario Moderna y Responsiva:**
    *   Construida con React, Next.js (App Router), ShadCN UI y Tailwind CSS.

### Backend (alumbra-backend - Node.js/Express)

*Actualmente, gran parte de la lógica crítica (análisis de IA, almacenamiento de comentarios, autenticación) se maneja directamente en el frontend a través de Firebase y Genkit. El backend como está definido en la estructura sirve principalmente como un concepto para funcionalidades que podrían ser centralizadas o requerir un entorno de servidor más tradicional, como el envío de correos de alerta.*

*   **Servicio de Alerta de Emergencia (Conceptualizado):**
    *   Si el análisis de IA en el frontend detecta un riesgo muy alto y el usuario ha proporcionado un correo de emergencia (durante el cuestionario, manejado por el frontend), el frontend podría instruir al backend (o directamente a un servicio de webhook) para enviar una alerta.
    *   El backend está configurado con una `WEBHOOK_URL` (ej. Make.com) para delegar el envío real del correo electrónico.
    *   **Privacidad:** El backend está diseñado para NO almacenar la información de contacto de emergencia. Esta se pasaría transaccionalmente al servicio de webhook.
*   **API RESTful (Conceptual):**
    *   Estructura para manejar rutas, controladores, servicios y modelos.
    *   El `analysis.controller.js` y `analysis.service.js` son actualmente placeholders, ya que el análisis principal se realiza en el frontend.
    *   Incluye plantillas HTML (`views/emails/`) como referencia para los correos que enviaría el servicio de webhook.

## Cómo Funciona (Flujo del Usuario)

1.  **Visita la Página de Inicio:** El usuario conoce la aplicación.
2.  **(Opcional) Completa el Cuestionario:** El usuario responde preguntas para dar contexto y, si lo desea, proporciona un correo de emergencia. Esta información se guarda en `localStorage`.
3.  **Analiza una Conversación:** El usuario va a la sección de análisis, pega el texto de una conversación y lo envía.
4.  **Procesamiento con IA:** La acción del servidor en Next.js invoca un flujo de Genkit que utiliza un modelo de IA (Gemini) para analizar el texto. La IA devuelve una estructura con la puntuación de riesgo, resumen, categorías, ejemplos y recomendaciones.
5.  **Visualización de Resultados:** El frontend muestra el análisis detallado al usuario.
6.  **(Opcional) Inicio de Sesión y Comentarios:** El usuario puede iniciar sesión con Google para enviar comentarios sobre la aplicación.
7.  **Alerta de Emergencia (si aplica):** Si el análisis indica un riesgo alto y se proporcionó un correo de emergencia, la lógica del frontend (o una llamada al backend) activaría el webhook para enviar un correo al contacto de emergencia.

## Tecnologías Utilizadas

*   **Frontend:**
    *   Next.js (con App Router)
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   ShadCN UI (para componentes)
    *   Genkit (para interacción con modelos de IA de Google)
    *   Firebase Authentication (para inicio de sesión con Google)
    *   Firebase Firestore (para almacenar comentarios)
    *   Lucide React (para iconos)
*   **Backend (Conceptual):**
    *   Node.js
    *   Express.js
    *   Make.com (o similar, para webhooks de envío de correo)
*   **Otros:**
    *   ESLint, Prettier (para calidad de código)

## Enfoque en la Privacidad

*   El cuestionario inicial y los detalles del usuario se almacenan en `localStorage` del navegador y solo se envían para procesamiento si el usuario decide continuar.
*   El contacto de emergencia, si se proporciona, no se almacena de forma persistente en la base de datos principal junto con el análisis, sino que se maneja transaccionalmente para el envío de alertas.
*   Las conversaciones analizadas no se almacenan por defecto asociadas al usuario a largo plazo, a menos que se implemente una función explícita para ello con consentimiento.

# Firebase Studio (Alumbra AI Frontend)

This is a Next.js project for the Alumbra AI application frontend.

To get started, take a look at `src/app/page.tsx`.

## Developer Instructions (Linux y Visual Studio Code)

Sigue estos pasos para clonar y ejecutar el proyecto en un entorno de desarrollo Linux utilizando Visual Studio Code:

1.  **Clonar el repositorio desde GitHub:**
    Abre tu terminal y ejecuta el siguiente comando. Reemplaza `[URL_DEL_REPOSITORIO]` con la URL real del repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DEL_REPOSITORIO_CLONADO] # Navega al directorio del proyecto clonado
    ```
    (Donde `[NOMBRE_DEL_REPOSITORIO_CLONADO]` es usualmente el nombre del repositorio, ej. `alumbra-ai-project`)

2.  **Abrir el proyecto en Visual Studio Code:**
    *   Abre Visual Studio Code.
    *   Ve a `File > Open Folder...` (o `Archivo > Abrir Carpeta...`).
    *   Selecciona la carpeta raíz del proyecto que acabas de clonar (ej. `[NOMBRE_DEL_REPOSITORIO_CLONADO]`) y haz clic en "Open" (o "Abrir").

3.  **Instalar dependencias:**
    Este proyecto tiene dos partes principales: el frontend (Next.js, en la raíz del proyecto) y el backend (Node.js/Express, en la carpeta `alumbra-backend/`). Cada una tiene sus propias dependencias.
    *   **Frontend (Next.js - raíz del proyecto):**
        En la terminal integrada de VS Code (puedes abrirla con Ctrl+\` o Cmd+\`), asegúrate de estar en la raíz del proyecto y ejecuta:
        ```bash
        npm install
        ```
    *   **Backend (Node.js - `alumbra-backend`):**
        Navega al directorio del backend y ejecuta para instalar sus dependencias:
        ```bash
        cd alumbra-backend
        npm install
        cd .. # Vuelve a la raíz del proyecto
        ```

4.  **Variables de Entorno:**
    Asegúrate de configurar las variables de entorno necesarias.
    *   **Frontend:** En la raíz del proyecto, si existe un archivo `.env.example`, renómbralo o copia su contenido a un nuevo archivo llamado `.env.local` y completa los valores necesarios. Para la funcionalidad de Genkit (Google AI), necesitarás una `GOOGLE_API_KEY`. También necesitarás la configuración de Firebase (apiKey, authDomain, projectId, etc.).
        ```env
        # src/.env.local (o en la raíz del proyecto, dependiendo de cómo Genkit y Firebase SDK lo lean)
        GOOGLE_API_KEY=TU_GOOGLE_API_KEY_AQUI

        # Firebase Config (estos también están en src/lib/firebase.ts, pero pueden ser redundantes si se cargan desde .env)
        # NEXT_PUBLIC_FIREBASE_API_KEY="TU_FIREBASE_API_KEY"
        # NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="TU_FIREBASE_AUTH_DOMAIN"
        # NEXT_PUBLIC_FIREBASE_PROJECT_ID="TU_FIREBASE_PROJECT_ID"
        # NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="TU_FIREBASE_STORAGE_BUCKET"
        # NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="TU_FIREBASE_MESSAGING_SENDER_ID"
        # NEXT_PUBLIC_FIREBASE_APP_ID="TU_FIREBASE_APP_ID"
        ```
    *   **Backend:** Dentro de la carpeta `alumbra-backend/`, crea un archivo `.env`. Puedes basarte en `alumbra-backend/config/env.config.js` para saber qué variables son esperadas. Para la funcionalidad de envío de correos (como los comentarios o alertas futuras), la variable `WEBHOOK_URL` debe estar configurada. Por ejemplo:
        ```env
        # alumbra-backend/.env
        PORT=3001
        NODE_ENV=development
        # GEMINI_API_KEY=tu_api_key_de_gemini_si_el_backend_lo_usara_directamente
        WEBHOOK_URL=https://hook.us2.make.com/3qpuhf3p4yv1t3c2l5udpnsn9g7mtik7 # Ejemplo
        ```
    *Nota: Asegúrate de tener la API de Gemini habilitada en tu proyecto de Google Cloud y las APIs de Firebase necesarias.*

5.  **Ejecutar el programa:**
    Necesitarás ejecutar tanto el frontend como el backend, idealmente en terminales separadas dentro de VS Code.

    *   **Para ejecutar el Frontend (Aplicación Next.js):**
        En una terminal, desde la raíz del proyecto (ej. `[NOMBRE_DEL_REPOSITORIO_CLONADO]`), ejecuta:
        ```bash
        npm run dev
        ```
        Esto iniciará el servidor de desarrollo del frontend. Usualmente estará disponible en `http://localhost:9002` (según `package.json`).

    *   **Para ejecutar el Backend (Servidor Node.js):**
        En otra terminal, navega al directorio `alumbra-backend/` y ejecuta:
        ```bash
        npm run dev
        ```
        Esto iniciará el servidor del backend. Usualmente estará disponible en `http://localhost:3001` (según `alumbra-backend/package.json`).

    *   **Usando F5 (Configuración de Debug en VS Code):**
        Para usar la tecla F5 para iniciar la depuración, necesitarás configurar el archivo `launch.json` dentro de una carpeta `.vscode` en la raíz de tu proyecto. VS Code puede ayudarte a generar configuraciones básicas para Node.js (para el backend) y para el navegador (para el frontend, usualmente adjuntándose al proceso de Node.js que sirve la app Next.js).
        *   **Comando/Archivo "Principal" para el Frontend:** Al presionar F5 (con la configuración adecuada en `launch.json`), VS Code típicamente ejecutaría el script definido en `package.json` para `dev`, que es `next dev -p 9002`. No hay un único "archivo ejecutable" para el frontend en modo desarrollo; `next dev` maneja la compilación y el servicio de archivos como `src/app/page.tsx` y otros bajo `src/app/`.
        *   **Comando/Archivo "Principal" para el Backend:** Para el backend, el script `dev` en `alumbra-backend/package.json` ejecuta `nodemon server.js`. Por lo tanto, el archivo principal que se ejecuta (y que nodemon monitorea) es `alumbra-backend/server.js`. Una configuración de `launch.json` para el backend apuntaría a ejecutar este script o el comando `npm run dev` en el directorio `alumbra-backend`.

Una vez que ambos servidores (frontend y backend) estén en funcionamiento, puedes acceder a la aplicación a través de la URL del frontend (generalmente `http://localhost:9002`).
