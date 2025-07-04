'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import { PlusCircle, Edit, Trash2, User } from 'lucide-react';

interface Patient {
  _id: string;
  name: string;
  lastName: string;
  email?: string;
  contactNumber?: string;
  // Add other patient fields as needed
}

export default function PatientsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.type !== 'psychologist')) {
      router.push('/'); // Redirect if not a psychologist
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user || !user.uid) {
        setIsLoadingPatients(false);
        return;
      }

      setIsLoadingPatients(true);
      setError(null);
      try {
        // Replace with your actual backend API endpoint
        const response = await fetch(`http://localhost:3000/api/patients/${user.uid}`); // Assuming backend runs on 3000
        if (!response.ok) {
          throw new Error(`Error fetching patients: ${response.statusText}`);
        }
        const data = await response.json();
        setPatients(data);
      } catch (err: any) {
        console.error('Error fetching patients:', err);
        setError(err.message || 'Error al cargar la lista de pacientes.');
      } finally {
        setIsLoadingPatients(false);
      }
    };

    if (user && user.type === 'psychologist') {
      fetchPatients();
    }
  }, [user]);

  if (loading || !user || user.type !== 'psychologist') {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Listado de Pacientes</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir Nuevo Paciente
        </Button>
      </div>

      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Tus Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingPatients ? (
            <div className="flex justify-center items-center py-8">
              <Spinner size={32} />
              <p className="ml-2 text-muted-foreground">Cargando pacientes...</p>
            </div>
          ) : error ? (
            <div className="text-center text-destructive py-8">
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">Reintentar</Button>
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <User className="h-12 w-12 mx-auto mb-4 text-muted" />
              <p className="text-lg">Aún no tienes pacientes registrados.</p>
              <p className="text-sm">Haz clic en "Añadir Nuevo Paciente" para empezar.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient._id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.lastName}</TableCell>
                    <TableCell>{patient.email || 'N/A'}</TableCell>
                    <TableCell>{patient.contactNumber || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}