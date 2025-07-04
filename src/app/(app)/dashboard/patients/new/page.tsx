'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { UserPlus, ArrowLeft } from 'lucide-react';

const PatientSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  lastName: z.string().min(1, 'El apellido es requerido.'),
  email: z.string().email('Debe ser un correo electrónico válido.').optional().or(z.literal('')),
  dateOfBirth: z.string().optional(), // Consider using a date picker and Date type
  gender: z.enum(['masculino', 'femenino', 'otro', 'prefiero_no_decir'], {
    required_error: 'Por favor selecciona el género.',
  }),
  contactNumber: z.string().optional(),
  notes: z.string().optional(),
});

type PatientFormData = z.infer<typeof PatientSchema>;

export default function NewPatientPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: 'prefiero_no_decir',
      contactNumber: '',
      notes: '',
    },
  });

  React.useEffect(() => {
    if (!loading && (!user || user.type !== 'psychologist')) {
      router.push('/'); // Redirect if not a psychologist
    }
  }, [user, loading, router]);

  const onSubmit = async (data: PatientFormData) => {
    if (!user || !user.uid) {
      toast({
        variant: 'destructive',
        title: 'Error de Autenticación',
        description: 'Debes iniciar sesión como psicólogo para añadir pacientes.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if your backend requires it
          // 'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({ ...data, psychologistId: user.uid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al añadir paciente.');
      }

      toast({
        title: 'Paciente Añadido',
        description: `El paciente ${data.name} ${data.lastName} ha sido añadido con éxito.`,
      });
      form.reset(); // Reset form after successful submission
      router.push('/dashboard/patients'); // Redirect to patient list
    } catch (err: any) {
      console.error('Error submitting new patient:', err);
      toast({
        variant: 'destructive',
        title: 'Error al Añadir Paciente',
        description: err.message || 'Ocurrió un error inesperado al añadir el paciente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user || user.type !== 'psychologist') {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Añadir Nuevo Paciente</h1>
      </div>

      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Datos del Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del paciente" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido del paciente" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Opcional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@ejemplo.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Contacto (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: +34 123 456 789" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Nacimiento (Opcional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Género</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-2"
                        disabled={isSubmitting}
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="masculino" id="genderMasculino" />
                          </FormControl>
                          <FormLabel htmlFor="genderMasculino" className="font-normal">Masculino</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="femenino" id="genderFemenino" />
                          </FormControl>
                          <FormLabel htmlFor="genderFemenino" className="font-normal">Femenino</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="otro" id="genderOtro" />
                          </FormControl>
                          <FormLabel htmlFor="genderOtro" className="font-normal">Otro</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="prefiero_no_decir" id="genderPrefieroNoDecir" />
                          </FormControl>
                          <FormLabel htmlFor="genderPrefieroNoDecir" className="font-normal">Prefiero no decir</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Notas sobre el paciente..." className="min-h-[100px]" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Guardar Paciente
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