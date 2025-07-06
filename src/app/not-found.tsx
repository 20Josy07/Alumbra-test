import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-alumbra-purple text-white">
      <Header />
      <div className="text-center mt-20">
        <p className="text-white text-lg font-semibold">404</p>
        <h1 className="text-5xl font-bold mt-4">Page not found</h1>
        <p className="text-white/80 mt-4">Sorry, we couldn't find the page you're looking for.</p>
        <Link href="/" className="text-white hover:underline mt-8 inline-flex items-center">
          <span className="mr-1">←</span> Back to home
        </Link>
      </div>
    </div>
  );
}