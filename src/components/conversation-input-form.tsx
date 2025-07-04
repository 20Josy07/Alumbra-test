'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleConversationAnalysis } from '@/app/actions';
import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import { FileText, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const FormSchema = z.object({
  conversationText: z.string().min(10, {
    message: 'El texto de la conversación debe tener al menos 10 caracteres.',
  }).max(10000, {
    message: 'El texto de la conversación debe tener como máximo 10,000 caracteres.'
  }),
});

interface ConversationInputFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: AnalyzeConversationOutput) => void;
  onAnalysisError: (error: string) => void;
}

export default function ConversationInputForm({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
}: ConversationInputFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      conversationText: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    onAnalysisStart();

    const result = await handleConversationAnalysis(data.conversationText);

    if (result.error) {
      onAnalysisError(result.error);
      toast({
        variant: "destructive",
        title: "Análisis Fallido",
        description: result.error,
      });
    } else if (result.data) {
      onAnalysisComplete(result.data);
      toast({
        title: "Análisis Completo",
        description: "Las percepciones de la conversación están listas.",
      });
      form.reset(); // Clear form on successful submission
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-6 bg-card rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="conversationText"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="conversationText" className="flex items-center text-lg font-semibold text-card-foreground">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Ingresa el Texto de la Conversación
              </FormLabel>
              <FormControl>
                <Textarea
                  id="conversationText"
                  placeholder="Pega aquí la conversación que quieres analizar..."
                  className="min-h-[150px] md:min-h-[200px] resize-y bg-background text-foreground placeholder:text-muted-foreground"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Analizando...' : 'Analizar Conversación'}
        </Button>
      </form>
    </Form>
  );
}
