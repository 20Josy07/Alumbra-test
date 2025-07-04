'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PsychologistDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== 'psychologist')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.type !== 'psychologist') {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Psicólogos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ver y gestionar a tus pacientes.</p>
            <Button className="mt-4" onClick={() => router.push('/dashboard/patients')}>Ver Pacientes</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Historial de Análisis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acceder a informes de análisis detallados.</p>
            <Button className="mt-4">Ver Historiales</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gestionar alertas activas para tus pacientes.</p>
            <Button className="mt-4">Ver Alertas</Button>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
      <div className="flex gap-4">
        <Button onClick={() => router.push('/dashboard/patients/new')}>Añadir Nuevo Paciente</Button>
        <Button variant="outline">Generar Informe</Button>
      </div>
    </div>
  );
}