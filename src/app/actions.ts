
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, doc, deleteDoc } from 'firebase/firestore';
import type { QuestionnaireData, UserDetailsData, FeedbackData as ClientFeedbackData } from '@/lib/schemas';
import { analyzeConversation, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';

// Combined interface for data expected by handleFeedbackSubmission
export interface FeedbackSubmissionData extends Omit<ClientFeedbackData, 'rating'> {
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
  profession?: string; // Add profession field
}

interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function handleFeedbackSubmission(data: FeedbackSubmissionData): Promise<ActionResult> {
  console.log("SERVER_ACTION_LOG: Raw data received by handleFeedbackSubmission:", JSON.stringify(data, null, 2));

  // Rating validation removed

  if (!data.userType || !['usuario', 'profesional'].includes(data.userType)) {
    console.error("SERVER_ACTION_ERROR: Invalid user type. Received:", data.userType);
    return { success: false, error: "El tipo de usuario proporcionado no es válido." };
  }

  if (!data.feedbackText || data.feedbackText.trim() === "") {
    console.error("SERVER_ACTION_ERROR: Feedback text is empty.");
    return { success: false, error: "El comentario no puede estar vacío." };
  }

  try {
    const reviewData = {
      userId: data.userId,
      userName: data.userName || "Anónimo",
      userPhotoURL: data.userPhotoURL || null,
      text: data.feedbackText,
      userType: data.userType,
      profession: data.profession || null, // Include profession, default to null if not provided
      createdAt: serverTimestamp(),
    };

    console.log("SERVER_ACTION_LOG: Attempting to save reviewData to Firestore:", JSON.stringify(reviewData, null, 2));

    if (!db) {
      console.error("SERVER_ACTION_ERROR: Firestore db instance is not available.");
      return { success: false, error: 'Error de configuración de la base de datos.' };
    }

    const docRef = await addDoc(collection(db, "reviews"), reviewData);
    console.log("SERVER_ACTION_LOG: Feedback saved successfully with ID:", docRef.id);
    return { success: true, message: 'Comentario guardado con éxito.' };

  } catch (e: any) {
    console.error("SERVER_ACTION_ERROR: Error saving feedback to Firestore:", e);
    let errorMessage = 'Ocurrió un error inesperado al guardar tu comentario.';
    if (e && typeof e.message === 'string') {
      errorMessage = e.message;
    } else if (typeof e === 'string') {
      errorMessage = e;
    }
    if (typeof e === 'object' && e !== null && 'stack' in e) {
      console.error("SERVER_ACTION_ERROR_STACK:", e.stack);
    }
    return { success: false, error: `Error al guardar el comentario: ${errorMessage}` };
  }
}

export interface Review {
  id: string;
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
  text: string;
  userType?: 'usuario' | 'profesional';
  profession?: string | null; // Add profession field to Review interface
  createdAt: number; // Milliseconds since epoch
}


export async function getReviews(): Promise<ActionResult<Review[]>> {
  console.log("SERVER_ACTION_LOG: Executing getReviews...");
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("createdAt", "desc"), limit(8)); 
    const querySnapshot = await getDocs(q);
    console.log("SERVER_ACTION_LOG: Firestore querySnapshot size:", querySnapshot.size);

    const reviews: Review[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        userId: data.userId,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
        text: data.text,
        userType: data.userType as ('usuario' | 'profesional' | undefined),
        profession: data.profession as (string | null | undefined), // Retrieve profession
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
      });
    });
    console.log("SERVER_ACTION_LOG: Reviews data being returned:", JSON.stringify(reviews.map(r => ({id: r.id, name: r.userName, userType: r.userType})), null, 2));
    return { success: true, data: reviews };
  } catch (e) {
    console.error("SERVER_ACTION_ERROR: Error fetching reviews:", e);
    const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado al obtener los comentarios.';
    return { success: false, error: errorMessage };
  }
}

export async function handleQuestionnaireSubmission(data: QuestionnaireData): Promise<ActionResult<QuestionnaireData>> {
  console.log("SERVER_ACTION_LOG: handleQuestionnaireSubmission received data:", JSON.stringify(data, null, 2));
  try {
    // In a real app, you might save this data to Firestore or another database
    // For now, just returning success
    return { success: true, data, message: "Datos del cuestionario recibidos con éxito." };
  } catch (error: any) {
    console.error("SERVER_ACTION_ERROR: Error in handleQuestionnaireSubmission:", error);
    return { success: false, error: error.message || "Error al procesar el cuestionario." };
  }
}

export async function handleUserDetailsSubmission(data: UserDetailsData): Promise<ActionResult<UserDetailsData>> {
  console.log("SERVER_ACTION_LOG: handleUserDetailsSubmission received data:", JSON.stringify(data, null, 2));
  try {
    // In a real app, you might save this data or associate it with a user profile
    // For now, just returning success
    return { success: true, data, message: "Detalles de usuario recibidos con éxito." };
  } catch (error: any) {
    console.error("SERVER_ACTION_ERROR: Error in handleUserDetailsSubmission:", error);
    return { success: false, error: error.message || "Error al procesar los detalles del usuario." };
  }
}

export async function handleConversationAnalysis(conversationText: string): Promise<ActionResult<AnalyzeConversationOutput>> {
  console.log("SERVER_ACTION_LOG: handleConversationAnalysis received text:", conversationText.substring(0, 100) + "...");
  if (!conversationText || conversationText.trim().length < 10) {
    return { success: false, error: "El texto de la conversación es demasiado corto para el análisis." };
  }
  try {
    const analysisResult = await analyzeConversation({ conversationText });
    console.log("SERVER_ACTION_LOG: Genkit analysis result:", JSON.stringify(analysisResult, null, 2));
    return { success: true, data: analysisResult, message: "Análisis completado." };
  } catch (error: any) {
    console.error("SERVER_ACTION_ERROR: Error in handleConversationAnalysis (Genkit flow):", error);
    const errorMessage = (error as Error).message || "Error al analizar la conversación con IA.";
    if ((error as any).details) {
      console.error("SERVER_ACTION_ERROR_DETAILS: Genkit error details:", (error as any).details);
    }
    return { success: false, error: errorMessage };
  }
}
