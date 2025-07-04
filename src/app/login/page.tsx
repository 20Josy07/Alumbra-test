import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0e26] to-[#301744] p-4">
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in-up p-8 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <Image src="/og-image.png" alt="Alumbra Logo" width={64} height={64} className="rounded-full mb-4 animate-bounce-in" />
          <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Bienvenido de nuevo</h1>
          <p className="text-white/70 text-center text-lg">Inicia sesión para acceder a tu cuenta.</p>
        </div>
        <LoginForm />
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