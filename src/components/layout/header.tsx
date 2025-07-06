
"use client"

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context'; // Import useAuth

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
  const { user, loading } = useAuth(); // Use the auth context

  let currentNavLinks: NavLink[] = universalNavLinks;

  if (!loading && user) {
    if (user.type === 'psychologist') {
      currentNavLinks = psychologistNavLinks;
    } else {
      currentNavLinks = authenticatedUserNavLinks;
    }
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
          </nav>
        )}
      </div>
    </header>
  )
}
