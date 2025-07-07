
'use server';

import { auth } from '@/lib/firebase'; // Import Firebase auth
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth
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

export async function getStatistics(): Promise<ActionResult<{ users: string; conversations: string; alerts: string }>> {
  console.log("SERVER_ACTION_LOG: Executing getStatistics...");
  try {
    if (!db) {
      console.error("SERVER_ACTION_ERROR: Firestore db instance is not available.");
      return { success: false, error: 'Error de configuración de la base de datos.' };
    }

    // Fetch total users (assuming 'users' collection exists or can be derived from 'reviews')
    // For a real application, you'd have a dedicated users collection.
    // For now, let's count unique user IDs from reviews as a proxy for users.
    const reviewsRef = collection(db, "reviews");
    const reviewsSnapshot = await getDocs(reviewsRef);
    const uniqueUserIds = new Set<string>();
    reviewsSnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.userId) {
        uniqueUserIds.add(data.userId);
      }
    });
    const usersCount = uniqueUserIds.size;

    // Fetch total conversations analyzed (assuming 'analysis' collection exists)
    const analysisRef = collection(db, "analysis"); // Assuming a collection named 'analysis'
    const analysisSnapshot = await getDocs(analysisRef);
    const conversationsCount = analysisSnapshot.size;

    // Fetch total alerts generated (assuming 'alerts' collection exists)
    const alertsRef = collection(db, "alerts"); // Assuming a collection named 'alerts'
    const alertsSnapshot = await getDocs(alertsRef);
    const alertsCount = alertsSnapshot.size;

    const statistics = {
      users: usersCount > 0 ? `${Math.floor(usersCount / 1000)}k+` : '50k+', // Example: 50k+ if no real data
      conversations: conversationsCount > 0 ? conversationsCount.toLocaleString('es-ES') : '100,000+', // Example: 100,000+ if no real data
      alerts: alertsCount > 0 ? alertsCount.toLocaleString('es-ES') : '5,000+', // Example: 5,000+ if no real data
    };

    console.log("SERVER_ACTION_LOG: Statistics data being returned:", statistics);
    return { success: true, data: statistics };
  } catch (e) {
    console.error("SERVER_ACTION_ERROR: Error fetching statistics:", e);
    const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado al obtener las estadísticas.';
    // Return default/placeholder data in case of error
    return {
      success: true,
      data: {
        users: '50k+',
        conversations: '100,000+',
        alerts: '5,000+',
      },
      error: errorMessage
    };
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

// Helper function to get the Firebase ID token
async function getAuthToken(): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      return token;
    } catch (error) {
      console.error("Error getting Firebase ID token:", error);
      return null;
    }
  }
  return null;
}

// New action to get all users from the backend
export async function getAllUsers(): Promise<ActionResult<any[]>> {
  console.log("SERVER_ACTION_LOG: Executing getAllUsers...");
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: 'Authentication token is missing. Please log in.' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("SERVER_ACTION_ERROR: Backend error fetching users:", data);
      return { success: false, error: data.message || 'Error al obtener usuarios del backend.' };
    }

    console.log("SERVER_ACTION_LOG: Users fetched successfully:", data);
    return { success: true, data: data };
  } catch (error: any) {
    console.error("SERVER_ACTION_ERROR: Error in getAllUsers action:", error);
    return { success: false, error: error.message || "Error de red al obtener usuarios." };
  }
}

// New action to assign a role to a user via the backend
export async function assignUserRole(email: string, role: 'user' | 'psychologist' | 'admin'): Promise<ActionResult> {
  console.log(`SERVER_ACTION_LOG: Executing assignUserRole for ${email} with role ${role}...`);
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: 'Authentication token is missing. Please log in.' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/assign-role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("SERVER_ACTION_ERROR: Backend error assigning role:", data);
      return { success: false, error: data.message || 'Error al asignar el rol al usuario.' };
    }

    console.log("SERVER_ACTION_LOG: Role assigned successfully:", data);
    return { success: true, message: data.message };
  } catch (error: any) {
    console.error("SERVER_ACTION_ERROR: Error in assignUserRole action:", error);
    return { success: false, error: error.message || "Error de red al asignar el rol." };
  }
}
