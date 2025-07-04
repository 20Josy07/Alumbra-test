
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Add Input import
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription as ShadCNCardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { handleFeedbackSubmission, type FeedbackSubmissionData as ServerFeedbackSubmissionData } from '@/app/actions';
import { FeedbackSchema, type FeedbackData } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Send, MessageSquare, Info } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { user } = useAuth();

  const form = useForm<FeedbackData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedbackText: '',
      userType: 'usuario', // Default to 'usuario'
      profession: '', // Initialize profession field
    },
  });

  const userType = form.watch('userType'); // Watch userType to conditionally render profession field

  async function onSubmit(data: FeedbackData) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Inicio de Sesión Requerido',
        description: 'Debes iniciar sesión con Google para enviar comentarios.',
      });
      return;
    }

    if (!user.uid) {
      toast({
        variant: 'destructive',
        title: 'Error de Usuario',
        description: 'No se pudo obtener el ID de usuario. Intenta iniciar sesión de nuevo.',
      });
      return;
    }
    
    console.log("CLIENT_SUBMIT_LOG: Data from form before sending to server action:", JSON.stringify(data, null, 2));

    setIsSubmitting(true);
    try {
      const fullData: ServerFeedbackSubmissionData = {
        feedbackText: data.feedbackText,
        userType: data.userType,
        userId: user.uid,
        userName: user.displayName,
        userPhotoURL: user.photoURL,
        profession: data.profession, // Include profession in submission data
      };

      const result = await handleFeedbackSubmission(fullData);

      if (result.success) {
        toast({
          title: 'Comentario Enviado',
          description: result.message || '¡Gracias por tu valioso feedback!',
        });
        form.reset({
          feedbackText: '',
          userType: 'usuario',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error al Enviar',
          description: result.error || 'No se pudo enviar tu comentario. Inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error("Error submitting feedback from page:", error);
      toast({
        variant: 'destructive',
        title: 'Error Inesperado',
        description: 'Ocurrió un error inesperado al enviar tu comentario.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4">
      <Card className="shadow-2xl bg-gradient-to-br from-card to-card/80 text-card-foreground border border-primary/20">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="flex flex-col items-center text-3xl md:text-4xl font-bold text-primary mb-2">
            <MessageSquare className="mb-3 h-10 w-10 text-primary" />
            Comparte tu Opinión
          </CardTitle>
          <ShadCNCardDescription className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ¡Tu opinión es muy importante para nosotros! Ayúdanos a mejorar AlumbraAI compartiendo tus ideas, sugerencias o cualquier problema que encuentres. Nos tomamos muy en serio cada comentario para seguir evolucionando y brindarte la mejor experiencia posible.
          </ShadCNCardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
           <div className="p-5 bg-muted/40 dark:bg-muted/20 rounded-xl border border-border/60 shadow-inner">
            <div className="flex items-center text-xl font-semibold text-card-foreground mb-4">
              <Info className="mr-3 h-6 w-6 text-primary flex-shrink-0" />
              ¿Qué tipo de feedback nos ayuda más?
            </div>
            <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground pl-3">
              <li>Sugerencias para nuevas funcionalidades o mejoras.</li>
              <li>Informes de errores o comportamientos inesperados.</li>
              <li>Comentarios sobre la facilidad de uso y la experiencia general.</li>
              <li>Ideas sobre cómo AlumbraAI podría ayudarte mejor.</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg font-semibold text-card-foreground">Soy un/una:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-8 pt-1"
                        disabled={isSubmitting}
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="usuario" id="userTypeUsuario" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel htmlFor="userTypeUsuario" className="font-normal text-muted-foreground text-base cursor-pointer">
                            Usuario General
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="profesional" id="userTypeProfesional" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel htmlFor="userTypeProfesional" className="font-normal text-muted-foreground text-base cursor-pointer">
                            Profesional (Psicólogo, Terapeuta, etc.)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {userType === 'profesional' && (
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="profession" className="text-lg font-semibold text-card-foreground">Tu Profesión</FormLabel>
                      <FormControl>
                        <Input
                          id="profession"
                          placeholder="Ej: Psicólogo Clínico, Terapeuta Familiar"
                          className="bg-background text-foreground placeholder:text-muted-foreground mt-2 border-border focus-visible:ring-primary/50"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="feedbackText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="feedbackText" className="text-lg font-semibold text-card-foreground">Tu Comentario</FormLabel>
                    <FormControl>
                      <Textarea
                        id="feedbackText"
                        placeholder="Escribe aquí tus comentarios detallados y sugerencias..."
                        className="min-h-[180px] resize-y bg-background text-foreground placeholder:text-muted-foreground mt-2 border-border focus-visible:ring-primary/50"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-5 w-5" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Comentario
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
