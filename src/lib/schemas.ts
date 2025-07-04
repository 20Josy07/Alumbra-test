
import { z } from 'zod';

export const QuestionnaireSchema = z.object({
  relationshipType: z.enum(['pareja', 'amistad', 'familiar', 'laboral', 'grupo'], {
    required_error: 'Por favor selecciona el tipo de relación.',
  }),
  makesYouDoubt: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  controlsOrLimits: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  feltGuiltyIncapable: z.enum(['si', 'no_no_aplica'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  wantsEvaluation: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la Política de Privacidad y la Política de Seguridad para continuar.',
  }),
});

export type QuestionnaireData = z.infer<typeof QuestionnaireSchema>;

export const UserDetailsSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido.' }).max(50, { message: 'El nombre no puede exceder los 50 caracteres.' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido.' }).max(50, { message: 'El apellido no puede exceder los 50 caracteres.' }),
  age: z.preprocess(
    (val) => {
      const sVal = String(val).trim();
      return sVal === "" ? undefined : Number(sVal);
    },
    z.coerce.number({ invalid_type_error: 'La edad debe ser un número válido.' })
      .int({ message: 'La edad debe ser un número entero.' })
      .min(1, { message: 'La edad debe ser mayor a 0.' })
      .max(120, { message: 'La edad proporcionada no es válida.' })
      .optional() // Age is optional overall
  ),
  gender: z.enum(['hombre', 'mujer', 'prefiero_no_decirlo'], {
    required_error: 'Por favor selecciona una opción de género.', // Gender is a required choice
  }),
  emergencyEmail: z.preprocess(
    (val) => {
      const sVal = String(val).trim();
      return sVal === "" ? undefined : sVal;
    },
    z.string().email({ message: 'Debe ser un correo electrónico válido.' }).optional() // Emergency email is optional
  ),
});
export type UserDetailsData = z.infer<typeof UserDetailsSchema>;

// Schema for data potentially stored in localStorage to pass to analyze page
export const CombinedDataForAnalysisSchema = z.object({
  questionnaire: QuestionnaireSchema,
  userDetails: UserDetailsSchema.optional(), // User details can be optional if user cancels modal
});
export type CombinedDataForAnalysis = z.infer<typeof CombinedDataForAnalysisSchema>;

export const FeedbackSchema = z.object({
  feedbackText: z.string().min(10, {
    message: 'El comentario debe tener al menos 10 caracteres.',
  }).max(2000, {
    message: 'El comentario debe tener como máximo 2000 caracteres.'
  }),
  userType: z.enum(['usuario', 'profesional'], {
    required_error: 'Por favor selecciona tu tipo de usuario.',
  }),
  profession: z.string().optional(), // New field for profession
}).superRefine((data, ctx) => {
  if (data.userType === 'profesional' && (!data.profession || data.profession.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Por favor especifica tu profesión.',
      path: ['profession'],
    });
  }
});
export type FeedbackData = z.infer<typeof FeedbackSchema>;
