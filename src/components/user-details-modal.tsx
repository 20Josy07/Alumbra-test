
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { UserDetailsData } from '@/lib/schemas';
import { UserDetailsSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { X } from 'lucide-react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserDetailsData) => Promise<void>; // Make onSubmit async
  initialData?: Partial<UserDetailsData>;
}

export default function UserDetailsModal({ isOpen, onClose, onSubmit, initialData }: UserDetailsModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<UserDetailsData>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: initialData?.name || '',
      lastName: initialData?.lastName || '',
      age: initialData?.age || undefined,
      gender: initialData?.gender || undefined,
      emergencyEmail: initialData?.emergencyEmail || '',
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset(initialData || {
        name: '',
        lastName: '',
        age: undefined,
        gender: undefined,
        emergencyEmail: '',
      });
    }
  }, [isOpen, initialData, form]);

  const handleSubmit = async (data: UserDetailsData) => {
    setIsSubmitting(true);
    await onSubmit(data); // Call the passed onSubmit prop
    setIsSubmitting(false);
    // onClose will be called by parent component after successful submission and navigation
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-card text-card-foreground p-6 rounded-lg shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold text-primary">Ingresa tus Datos</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Estos datos se usarán para personalizar tu experiencia y permitir funciones como alertas de emergencia. No se almacenarán de forma permanente sin tu consentimiento explícito.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} disabled={isSubmitting} />
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
                    <Input placeholder="Tu apellido" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Tu edad" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)} value={field.value ?? ''} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                      disabled={isSubmitting}
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="hombre" id="hombre" />
                        </FormControl>
                        <FormLabel htmlFor="hombre" className="font-normal text-muted-foreground">Hombre</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="mujer" id="mujer" />
                        </FormControl>
                        <FormLabel htmlFor="mujer" className="font-normal text-muted-foreground">Mujer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="prefiero_no_decirlo" id="prefiero_no_decirlo" />
                        </FormControl>
                        <FormLabel htmlFor="prefiero_no_decirlo" className="font-normal text-muted-foreground">Prefiero no decirlo</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo de Emergencia (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ejemplo@dominio.com" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6 sm:justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isSubmitting ? <Spinner className="mr-2 h-4 w-4" /> : null}
                Guardar y Continuar
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogClose onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
