"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-alumbra-purple shadow-lg rounded-lg p-6 max-w-sm z-50">
      <p className="text-sm text-white mb-4">
        Este sitio web utiliza cookies para complementar una dieta equilibrada y proporcionar una recompensa muy merecida a los sentidos después de consumir comidas insípidas pero nutritivas.
        Aceptar nuestras cookies es opcional pero recomendado, ya que son deliciosas. Consulta nuestra <Link href="/privacy-policy" className="text-blue-300 hover:underline">política de cookies</Link>.
      </p>
      <div className="flex space-x-2">
        <Button onClick={handleAccept} className="bg-white hover:bg-gray-100 text-alumbra-purple font-semibold px-4 py-2 rounded-md">
          Aceptar todas
        </Button>
        <Button onClick={handleReject} variant="outline" className="border-white text-white hover:bg-white/10 px-4 py-2 rounded-md">
          Rechazar todas
        </Button>
      </div>
    </div>
  );
}