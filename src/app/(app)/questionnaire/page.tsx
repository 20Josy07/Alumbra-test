
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/questionnaire-form';
import UserDetailsModal from '@/components/user-details-modal';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import type { QuestionnaireData, UserDetailsData, CombinedDataForAnalysis } from '@/lib/schemas';
import { handleQuestionnaireSubmission, handleUserDetailsSubmission } from '@/app/actions';

const LOCAL_STORAGE_KEY = 'alumbraAnalysisContext';

export default function QuestionnairePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = React.useState(false);
  const [initialQuestionnaireData, setInitialQuestionnaireData] = React.useState<QuestionnaireData | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Overall submission state

  const handleInitialFormSuccess = async (data: QuestionnaireData) => {
    // setIsSubmitting(true); // This is handled by the QuestionnaireForm via the prop, parent just reacts
    const result = await handleQuestionnaireSubmission(data);
    if (result.success && result.data) {
      setInitialQuestionnaireData(result.data);
      setIsUserDetailsModalOpen(true);
      // No toast here, wait for the full flow or modal cancel
    } else {
      toast({
        variant: 'destructive',
        title: 'Error en Cuestionario',
        description: result.error || 'No se pudo enviar la primera parte del cuestionario.',
      });
    }
    setIsSubmitting(false); // Stop primary spinner once modal is ready or error shown
  };

  const handleUserDetailsSubmit = async (userDetails: UserDetailsData) => {
    if (!initialQuestionnaireData) {
      toast({ variant: 'destructive', title: 'Error', description: 'Faltan datos del cuestionario inicial.' });
      setIsUserDetailsModalOpen(false);
      return;
    }
    setIsSubmitting(true); // Restart spinner for this step
    const userDetailsResult = await handleUserDetailsSubmission(userDetails);

    if (userDetailsResult.success && userDetailsResult.data) {
      const combinedData: CombinedDataForAnalysis = {
        questionnaire: initialQuestionnaireData,
        userDetails: userDetailsResult.data,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedData));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        toast({ variant: "destructive", title: "Error de Almacenamiento Local", description: "No se pudieron guardar los datos para el análisis."});
      }

      toast({
        title: 'Datos Completados',
        description: 'Gracias. Serás redirigido a la página de análisis.',
      });
      setIsUserDetailsModalOpen(false);
      router.push('/analyze');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error en Datos Adicionales',
        description: userDetailsResult.error || 'No se pudieron guardar los datos adicionales.',
      });
    }
    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    setIsUserDetailsModalOpen(false);
    if (initialQuestionnaireData) {
       toast({
        title: 'Modal Cerrado',
        description: 'Puedes continuar al análisis, pero algunos datos no fueron guardados.',
        action: (
          <button
            onClick={() => {
                const combinedData: CombinedDataForAnalysis = { questionnaire: initialQuestionnaireData };
                 try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedData));
                  } catch (error) {
                    console.error("Error saving to localStorage:", error);
                  }
                router.push('/analyze')
            }}
            className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90"
          >
            Continuar sin datos
          </button>
        ),
      });
    }
  };

  return (
    <div className="w-full py-8">
      <QuestionnaireForm
        onSuccess={handleInitialFormSuccess}
        isSubmittingPrimary={isSubmitting}
        setIsSubmitting={setIsSubmitting} // Pass the setIsSubmitting function as a prop
      />
      {initialQuestionnaireData && (
        <UserDetailsModal
          isOpen={isUserDetailsModalOpen}
          onClose={handleModalClose}
          onSubmit={handleUserDetailsSubmit}
          isSubmitting={isSubmitting} // Pass isSubmitting to the modal as well
        />
      )}
    </div>
  );
}
