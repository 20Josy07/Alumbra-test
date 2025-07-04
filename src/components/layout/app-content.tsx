'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import type { ReactNode } from 'react';

export default function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const appRoutePrefixes = ['/questionnaire', '/analyze', '/feedback', '/support', '/dashboard']; // Añadir /dashboard
  const isAppPage = appRoutePrefixes.some(prefix => pathname.startsWith(prefix));

  return (
    <>
      {!isAppPage && <Header />}
      <main>{children}</main>
    </>
  );
}