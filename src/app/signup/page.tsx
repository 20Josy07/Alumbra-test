'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Registro Exitoso", description: "Tu cuenta ha sido creada. Redirigiendo..." });
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
      console.error("Error signing in with Google:", error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        if (credential && email) {
          try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            const firstMethod = methods[0];

            if (firstMethod) {
              toast({
                variant: "destructive",
                title: "Cuenta existente",
                description: `Ya tienes una cuenta registrada con este correo electrónico usando ${firstMethod}. Por favor, inicia sesión con ese método.`,
              });
              return;
            }
          } catch (linkError: any) {
            console.error("Error linking accounts:", linkError);
            toast({ variant: "destructive", title: "Error al vincular cuentas", description: linkError.message });
            return;
          }
        }
      }
      let description = "No se pudo registrar con Google. Inténtalo de nuevo.";
      if (error.code === 'auth/popup-closed-by-user') {
        description = "El proceso de registro fue cancelado.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        description = "Se canceló la solicitud de registro.";
      } else if (error.code === 'auth/unauthorized-domain') {
        description = "Este dominio no está autorizado para la autenticación. Revisa la configuración de Firebase.";
      }
      toast({ variant: "destructive", title: "Error de Registro", description: description });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Redirigiendo...",
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
        title: "Error al registrarse",
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
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Crea tu cuenta</h1>
          <p className="text-white/70 text-center text-lg">Regístrate para empezar a usar AlumbraIA.</p>
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
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1a0e26] px-2 text-white/70">
              O continúa con
            </span>
          </div>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center shadow-md"
        >
          <FcGoogle className="mr-3 h-6 w-6" />
          Registrarse con Google
        </Button>
        <div className="mt-6 text-center">
          <p className="text-white/70">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-[#8B5CF6] hover:text-[#7a4ad9] font-semibold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}