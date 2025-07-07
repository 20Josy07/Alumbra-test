'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({ displayName });
      toast({
        title: "Perfil Actualizado",
        description: "Tus datos personales han sido guardados.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al Actualizar Perfil",
        description: error.message || "Hubo un problema al guardar tus datos.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: "Tema Actualizado",
      description: `El tema ha sido cambiado a ${value}.`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={48} />
        <p className="ml-2">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Acceso Denegado</h2>
        <p className="text-muted-foreground mb-6">Por favor, inicia sesión para ver tu perfil.</p>
        <Button asChild>
          <Link href="/login">Ir a Iniciar Sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-10">Mi Perfil</h1>

      {/* Personal Data Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Datos Personales</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div>
              <Label htmlFor="displayName">Nombre de Usuario</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tu nombre de usuario"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="mt-1 bg-muted/50 cursor-not-allowed"
              />
              <p className="text-sm text-muted-foreground mt-1">El correo electrónico no se puede cambiar.</p>
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Spinner size={16} className="mr-2" /> : null}
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Page Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de la Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-select">Tema de la Interfaz</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme-select" className="w-[180px]">
                <SelectValue placeholder="Seleccionar tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Oscuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Example of another setting: Notifications */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notificaciones por Correo</Label>
            <Switch id="notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}