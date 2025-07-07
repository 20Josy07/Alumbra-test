'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const appRoutePrefixes = ['/questionnaire', '/analyze', '/feedback', '/support', '/dashboard']; // Añadir /dashboard
  const isAppPage = appRoutePrefixes.some(prefix => pathname.startsWith(prefix));

  return (
    <SidebarProvider defaultOpen>
      {!isAppPage && <Header />}
      <main>{children}</main>
    </SidebarProvider>
  );
}