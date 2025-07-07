
"use client"

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context'; // Import useAuth
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface NavLink {
  label: string;
  href: string;
  cta?: boolean;
}

const universalNavLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Misión", href: "#mission" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Iniciar sesión", href: "/login", cta: true },
];

const authenticatedUserNavLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Análisis nuevo", href: "/questionnaire" },
  { label: "Mis resultados", href: "/resultados" },
  { label: "Cuenta", href: "/cuenta" },
  { label: "Cerrar sesión", href: "/logout" }
];

const psychologistNavLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pacientes", href: "/dashboard/pacientes" },
  { label: "Alertas", href: "/dashboard/alertas" },
  { label: "Recursos", href: "/dashboard/recursos" },
  { label: "Cuenta", href: "/cuenta" },
  { label: "Cerrar sesión", href: "/logout" }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, setUser } = useAuth(); // Use the auth context
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

  let currentNavLinks: NavLink[] = universalNavLinks;

  if (!loading && user) {
    if (user.type === 'psychologist') {
      currentNavLinks = psychologistNavLinks.filter(link => link.href !== "/logout").map(link => link.href === "/cuenta" ? { ...link, href: "/profile" } : link);
    } else {
      currentNavLinks = authenticatedUserNavLinks.filter(link => link.href !== "/logout").map(link => link.href === "/cuenta" ? { ...link, href: "/profile" } : link);
    }
  } else {
    currentNavLinks = universalNavLinks.filter(link => link.href !== "/logout");
  }

  return (
    <header className="fixed top-0 w-full bg-alumbra-purple shadow-md z-50 border-b border-alumbra-purple">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/og-image.png" alt="Alumbra Logo" width={36} height={36} />
            <span className="ml-2 text-xs font-semibold text-white border border-white/50 px-2 py-0.5 rounded-full">BETA</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-white">
            {currentNavLinks.map((link) => (
              link.cta ? (
                <Button asChild key={link.label} className="bg-white hover:bg-gray-100 text-alumbra-purple font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-white/80 transition-all duration-300 ease-in-out relative group text-base font-medium"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
              )
            ))}
          </nav>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center justify-start p-2 text-white hover:bg-white/10 hover:text-white">
                    <Avatar className="h-7 w-7 mr-2">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />
                      ) : (
                        <UserCircle className="h-full w-full text-white/70" />
                      )}
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user.displayName || user.email}</span>
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
            )}

          <button className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              {currentNavLinks.map((link) => (
                link.cta ? (
                  <Button asChild key={link.label} className="bg-white hover:bg-gray-100 text-alumbra-purple font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-base">
                    <Link href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                  </Button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-white hover:text-white/80 transition-colors text-base font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
            {user && (
              <>
                <div className="border-t border-white/20 pt-4 mt-4"></div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full flex items-center justify-start p-2 text-white hover:bg-white/10 hover:text-white">
                      <Avatar className="h-7 w-7 mr-2">
                        {user.photoURL ? (
                          <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />
                        ) : (
                          <UserCircle className="h-full w-full text-white/70" />
                        )}
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{user.displayName || user.email}</span>
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
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
