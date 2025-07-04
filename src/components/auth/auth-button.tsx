
'use client';

import React from 'react';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, UserCircle, Settings } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

export default function AuthButton() {
  const { user, setUser } = useAuth();
  const { state: sidebarState } = useSidebar(); // 'expanded' or 'collapsed'
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      toast({ title: "Inicio de Sesión Exitoso", description: `¡Bienvenido, ${result.user.displayName || 'Usuario'}!` });
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      // Display more specific error messages if available
      let description = "No se pudo iniciar sesión con Google. Inténtalo de nuevo.";
      if (error.code === 'auth/popup-closed-by-user') {
        description = "El proceso de inicio de sesión fue cancelado.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        description = "Se canceló la solicitud de inicio de sesión.";
      } else if (error.code === 'auth/unauthorized-domain') {
        description = "Este dominio no está autorizado para la autenticación. Revisa la configuración de Firebase.";
      }
      toast({ variant: "destructive", title: "Error de Inicio de Sesión", description: description });
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast({ title: "Cierre de Sesión Exitoso", description: "Has cerrado sesión." });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ variant: "destructive", title: "Error de Cierre de Sesión", description: "No se pudo cerrar sesión. Inténtalo de nuevo." });
    }
  };

  if (!user) {
    return (
      <Button onClick={handleSignIn} variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <LogIn className="mr-2 h-4 w-4" />
        {sidebarState === 'expanded' && <span>Iniciar Sesión con Google</span>}
      </Button>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full flex items-center justify-start p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Avatar className="h-7 w-7 mr-2">
              {user.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />
              ) : (
                 <UserCircle className="h-full w-full text-sidebar-foreground/70" />
              )}
              <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
            {sidebarState === 'expanded' && (
              <span className="truncate text-sm">{user.displayName || user.email}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground">
          <DropdownMenuLabel className="truncate">{user.displayName || user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled> {/* Placeholder for future actions */}
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
