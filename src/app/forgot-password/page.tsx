'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Correo de restablecimiento enviado",
        description: "Revisa tu bandeja de entrada (y spam) para restablecer tu contraseña.",
        variant: "success",
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: "Error al enviar correo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0e26] to-[#301744] p-4">
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in-up p-8 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <Image src="/og-image.png" alt="Alumbra Logo" width={64} height={64} className="rounded-full mb-4 animate-bounce-in" />
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Restablecer Contraseña</h1>
          <p className="text-white/70 text-center text-lg">Ingresa tu correo electrónico para recibir un enlace de restablecimiento.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white text-lg mb-2 block">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all duration-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#8B5CF6] hover:bg-[#7a4ad9] text-white font-bold py-3 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner size={20} className="mr-2" /> : null}
            {loading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white/70">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/login" className="text-[#8B5CF6] hover:text-[#7a4ad9] font-semibold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}