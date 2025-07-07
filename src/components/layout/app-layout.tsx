'use client';

import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { MessageSquareText, LifeBuoy, ArrowLeft, FileQuestion, MessageCircle, Shield, Lock, LayoutDashboard, User, Users, LogIn } from 'lucide-react';
import SidebarNav from './sidebar-nav';
import { usePathname } from 'next/navigation';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCircle, Settings } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/questionnaire', label: 'Cuestionario', icon: FileQuestion },
  { href: '/analyze', label: 'Analizar Conversación', icon: MessageSquareText },
  { href: '/feedback', label: 'Enviar Comentarios', icon: MessageCircle },
  { href: '/support', label: 'Soporte', icon: LifeBuoy },
  { href: '/profile', label: 'Mi Perfil', icon: User },
];

const psychologistNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const adminNavItems = [
  { href: '/admin', label: 'Panel de Admin', icon: Users },
];

const policyNavItems = [
  { href: '/privacy-policy', label: 'Política de Privacidad', icon: Shield },
  { href: '/security-policy', label: 'Política de Seguridad', icon: Lock },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, setUser } = useAuth();
  const pathname = usePathname();
  const [year, setYear] = useState<number | string>('');
  const [pageTitle, setPageTitle] = useState('AlumbraIA');
  const { state: sidebarState } = useSidebar();
  const { toast } = useToast();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast({ title: "Cierre de Sesión Exitoso", description: "Has cerrado sesión." });
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ variant: "destructive", title: "Error de Cierre de Sesión", description: "No se pudo cerrar sesión. Inténtalo de nuevo." });
    }
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const currentNavItem = navItems.find(item => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));
    const currentPolicyItem = policyNavItems.find(item => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));
    
    if (currentNavItem) {
      setPageTitle(currentNavItem.label);
    } else if (currentPolicyItem) {
      setPageTitle(currentPolicyItem.label);
    } else if (pathname === '/') {
        setPageTitle('Inicio');
    }
     else {
      setPageTitle('AlumbraIA');
    }
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="group-data-[collapsible=icon]/sidebar-wrapper:hidden md:ml-0">
              <Link href="/" passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                  aria-label="Volver a Inicio"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary ">
              <div className="flex-grow text-center md:text-left md:flex-none group-data-[collapsible=icon]/sidebar-wrapper:hidden">
                  <AnimatedShinyText
                      className={cn(
                      `text-2xl md:text-3xl font-bold inline animate-gradient bg-gradient-to-r from-purple-500 via-yellow-300 to-purple-500 bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent`
                      )}
                  >
                      Alumbra
                  </AnimatedShinyText>
              </div>
            </Link>
          </div>
          <p className="text-xs text-sidebar-foreground/70 mt-1 group-data-[collapsible=icon]/sidebar-wrapper:hidden text-center md:text-left md:pl-12">Iluminando tus conversaciones.</p>
        </SidebarHeader>
        <SidebarContent className="p-2">
          {user && (user as any).type === 'psychologist' && (
            <>
              <SidebarNav items={psychologistNavItems} currentPath={pathname} />
              <SidebarSeparator className="my-1" />
            </>
          )}
          {user && (user as any).type === 'admin' && (
            <>
              <SidebarNav items={adminNavItems} currentPath={pathname} />
              <SidebarSeparator className="my-1" />
            </>
          )}
          <SidebarNav items={navItems} currentPath={pathname} />
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border flex flex-col gap-2">
          {user ? (
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
                  <DropdownMenuItem disabled>
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
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LogIn className="mr-2 h-4 w-4" />
                {sidebarState === 'expanded' && <span>Iniciar Sesión</span>}
              </Button>
            </Link>
          )}
          <SidebarSeparator className="my-1 group-data-[collapsible=icon]/sidebar-wrapper:hidden" />
          <div className="space-y-1 group-data-[collapsible=icon]/sidebar-wrapper:hidden">
            {policyNavItems.map(item => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground/90 hover:bg-sidebar-accent/50"
                >
                  <item.icon className="mr-2 h-3.5 w-3.5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
          <p className="text-xs text-sidebar-foreground/60 text-center group-data-[collapsible=icon]/sidebar-wrapper:hidden mt-2">
            © {year} Alumbra AI
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="font-semibold text-lg text-foreground">
                {pageTitle}
              </h1>
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
