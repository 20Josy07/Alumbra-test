'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

export default function FullScreenLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#581c87] via-[#301744] to-[#1e0a2b] text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Background decorative elements - similar to HeroSection but more subtle */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-72 h-72 bg-pink-500/25 rounded-full blur-3xl"
        ></motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative z-10 flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6 shadow-lg"
        >
          <Brain className="w-12 h-12 text-primary" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
          ></motion.div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          className="text-3xl font-bold mb-3 text-center"
        >
          Analizando tu conversación
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          className="text-lg text-white/80 text-center max-w-md"
        >
          Un momento, por favor. Estamos procesando tu texto con inteligencia artificial para brindarte un análisis detallado.
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-1 bg-primary rounded-full mt-8 max-w-xs"
        ></motion.div>
      </div>
    </motion.div>
  );
}