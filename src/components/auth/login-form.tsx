"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/contexts/auth-context';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo...",
        variant: "success",
      });
      // Redirect based on user role
      const userRole = auth.currentUser?.uid ? (await auth.currentUser.getIdTokenResult(true)).claims.role : 'user';
      if (userRole === 'admin') {
        router.push('/admin');
      } else if (userRole === 'psychologist') {
        router.push('/dashboard/patients');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <div>
        <Label htmlFor="password" className="text-white text-lg mb-2 block">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}