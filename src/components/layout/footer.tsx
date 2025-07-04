'use client';

import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | string>('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8 bg-background ">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        {year ? (
          <p>&copy; {year} Alumbra. Todos los derechos reservados.</p>
        ) : (
          <p>&copy; Alumbra. Todos los derechos reservados.</p> // Fallback during SSR and initial client render
        )}
        <p>Tu información es privada. El análisis se procesa de forma segura.</p>
      </div>
    </footer>
  );
}
