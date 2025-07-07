'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, assignUserRole } from '@/app/actions'; // Assuming these actions will be created

interface User {
  _id: string;
  email: string;
  displayName?: string;
  type: 'user' | 'psychologist' | 'admin';
}

export default function AdminPanelPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignEmail, setAssignEmail] = useState('');
  const [assignRole, setAssignRole] = useState<'user' | 'psychologist' | 'admin'>('user');
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        toast({
          title: 'Error al cargar usuarios',
          description: response.error || 'Ocurrió un error desconocido.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error de red',
        description: 'No se pudo conectar con el servidor para cargar usuarios.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignEmail || !assignRole) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor, ingrese un correo electrónico y seleccione un rol.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await assignUserRole(assignEmail, assignRole);
      if (response.success) {
        toast({
          title: 'Rol asignado',
          description: `El rol de ${assignEmail} se actualizó a ${assignRole}.`,
        });
        setAssignEmail('');
        setAssignRole('user');
        fetchUsers(); // Refresh user list
      } else {
        toast({
          title: 'Error al asignar rol',
          description: response.error || 'Ocurrió un error desconocido.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error de red',
        description: 'No se pudo conectar con el servidor para asignar el rol.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>

      <Card>
        <CardHeader>
          <CardTitle>Asignar/Actualizar Rol de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAssignRole} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@ejemplo.com"
                value={assignEmail}
                onChange={(e) => setAssignEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={assignRole} onValueChange={(value: 'user' | 'psychologist' | 'admin') => setAssignRole(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="psychologist">Psicólogo</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Asignar Rol</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Usuarios Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Correo</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.displayName || 'N/A'}</TableCell>
                      <TableCell>{user.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!loading && users.length === 0 && (
            <p className="text-center text-gray-500">No hay usuarios registrados.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}