'use client';

import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Inicio de Sesión Exitoso", description: "Redirigiendo..." });
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
              // Sign in with the existing method first
              if (firstMethod === 'password') {
                // Prompt user for password if they registered with email/password
                toast({
                  variant: "destructive",
                  title: "Cuenta existente",
                  description: "Ya tienes una cuenta registrada con este correo electrónico. Por favor, inicia sesión con tu contraseña y luego vincula tu cuenta de Google en tu perfil.",
                });
                return;
              } else {
                // Handle other providers if necessary
                toast({
                  variant: "destructive",
                  title: "Cuenta existente",
                  description: `Ya tienes una cuenta registrada con este correo electrónico usando ${firstMethod}. Por favor, inicia sesión con ese método.`,
                });
                return;
              }
            }
          } catch (linkError: any) {
            console.error("Error linking accounts:", linkError);
            toast({ variant: "destructive", title: "Error al vincular cuentas", description: linkError.message });
            return;
          }
        }
      }
      let description = "No se pudo iniciar sesión con Google. Inténtalo de nuevo.";
      if (error.code === 'auth/popup-closed-by-user') {
        description = "Has cerrado la ventana de inicio de sesión. Por favor, inténtalo de nuevo si deseas continuar.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        description = "Se canceló la solicitud de inicio de sesión.";
      } else if (error.code === 'auth/unauthorized-domain') {
        description = "Este dominio no está autorizado para la autenticación. Revisa la configuración de Firebase.";
      }
      toast({ variant: "destructive", title: "Error de Inicio de Sesión", description: description });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0e26] to-[#301744] p-4">
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in-up p-8 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <Image src="/og-image.png" alt="Alumbra Logo" width={64} height={64} className="rounded-full mb-4 animate-bounce-in" />
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Bienvenido de nuevo</h1>
          <p className="text-white/70 text-center text-lg">Inicia sesión para acceder a tu cuenta.</p>
        </div>
        <LoginForm />
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
          Iniciar Sesión con Google
        </Button>
        <div className="mt-6 text-center">
          <p className="text-white/70">
            ¿No tienes una cuenta?{' '}
            <Link href="/signup" className="text-[#8B5CF6] hover:text-[#7a4ad9] font-semibold transition-colors">
              Regístrate
            </Link>
          </p>
          <p className="text-white/70 mt-2">
            <Link href="/forgot-password" className="text-[#8B5CF6] hover:text-[#7a4ad9] font-semibold transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}