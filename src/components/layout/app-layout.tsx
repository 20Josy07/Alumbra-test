'use client';

import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquareText, LifeBuoy, FileQuestion, MessageCircle, Shield, Lock, LayoutDashboard, User, Users, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Header } from './header'; // Import the Header component

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
  const { user } = useAuth(); // setUser, toast, getInitials, handleSignOut are now in Header
  const pathname = usePathname();
  const [year, setYear] = useState<number | string>('');
  const [pageTitle, setPageTitle] = useState('AlumbraIA');

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
    <React.Fragment>
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-background pt-16">
        {children}
      </main>
    </React.Fragment>
  );
}
