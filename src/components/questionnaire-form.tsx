
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import type { QuestionnaireData } from '@/lib/schemas';
import { QuestionnaireSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionnaireFormProps {
  onSuccess: (data: QuestionnaireData) => void;
  isSubmittingPrimary: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function QuestionnaireForm({ onSuccess, isSubmittingPrimary, setIsSubmitting }: QuestionnaireFormProps) {
  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(QuestionnaireSchema),
    defaultValues: {
      relationshipType: undefined,
      makesYouDoubt: undefined,
      controlsOrLimits: undefined,
      feltGuiltyIncapable: undefined,
      wantsEvaluation: undefined,
      acceptedTerms: false,
    },
  });

  async function onSubmit(data: QuestionnaireData) {
    setIsSubmitting(true); // Signal to parent that submission process has started from this form
    try {
      onSuccess(data);
      // Parent will handle actual submission and then decide to open modal or show error.
      // setIsSubmitting(false) will be called by the parent component after onSuccess completes its async tasks
    } catch (error) {
      console.error("Error during questionnaire submission in QuestionnaireForm:", error);
      setIsSubmitting(false); // Reset if error occurs here
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-card text-card-foreground">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Cuestionario Inicial</CardTitle>
        <CardDescription className="text-muted-foreground">
          Queremos conocerte mejor, por favor responde las siguientes preguntas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {[
              {
                name: 'relationshipType' as keyof QuestionnaireData,
                label: '1. ¿Esta conversación es con una pareja, amigo/a, familiar, colega o grupo?',
                options: [
                  { value: 'pareja', label: 'Pareja' },
                  { value: 'amistad', label: 'Amistad' },
                  { value: 'familiar', label: 'Familiar' },
                  { value: 'laboral', label: 'Laboral' },
                  { value: 'grupo', label: 'Grupo' },
                ],
              },
              {
                name: 'makesYouDoubt' as keyof QuestionnaireData,
                label: '2. ¿Sientes que esta persona (o personas en la conversación) te hace dudar de ti mismo/a o te hace sentir mal contigo mismo/a?',
                options: [
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' },
                ],
              },
              {
                name: 'controlsOrLimits' as keyof QuestionnaireData,
                label: '3. ¿Has sentido que esta persona (o personas) te controla o te limita?',
                options: [
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' },
                ],
              },
              {
                name: 'feltGuiltyIncapable' as keyof QuestionnaireData,
                label: '4. Si aplica (pareja, amistad, familiar), ¿alguna vez has querido cortar la relación, pero te sentiste culpable o incapaz?',
                options: [
                  { value: 'si', label: 'Sí' },
                  { value: 'no_no_aplica', label: 'No / No aplica' },
                ],
              },
              {
                name: 'wantsEvaluation' as keyof QuestionnaireData,
                label: '5. ¿Te gustaría recibir una evaluación sobre si la dinámica de esta conversación podría ser emocionalmente dañina?',
                options: [
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' },
                ],
              },
            ].map((q) => (
              <FormField
                key={q.name}
                control={form.control}
                name={q.name}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base text-card-foreground">{q.label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value} // Use value for controlled component
                        className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                        disabled={isSubmittingPrimary}
                      >
                        {q.options.map((option) => (
                          <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.value} id={`${q.name}-${option.value}`} />
                            </FormControl>
                            <FormLabel htmlFor={`${q.name}-${option.value}`} className="font-normal text-muted-foreground">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="acceptedTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmittingPrimary}
                      id="acceptedTerms"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="acceptedTerms" className="text-muted-foreground">
                      He leído y acepto la{' '}
                      <Link href="/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Política de Privacidad
                      </Link>
                      {' '}y la{' '}
                      <Link href="/security-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Política de Seguridad
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmittingPrimary}>
              {isSubmittingPrimary ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Procesando...
                </>
              ) : (
                'Continuar'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
