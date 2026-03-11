import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
          alt="Freshly baked bread"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-white/90 uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-medium"
        >
          Tradiție și Calitate din Brașov
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl text-white font-serif leading-[1.1] mb-8"
        >
          Gustul Autentic al <br />
          <span className="italic">Patiseriei Dencopan</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#produse"
            className="px-8 py-4 bg-white text-patisserie-ink rounded-full font-medium uppercase tracking-widest text-sm hover:bg-patisserie-cream transition-all duration-300 w-full md:w-auto"
          >
            Vezi Produsele
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white text-white rounded-full font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-patisserie-ink transition-all duration-300 w-full md:w-auto"
          >
            Comandă Acum
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-4 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
