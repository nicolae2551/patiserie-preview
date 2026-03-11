import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="despre" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-template-columns-[1fr_1.2fr] gap-16 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop"
              alt="Baker at work"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-8 -right-8 bg-patisserie-cream p-8 rounded-2xl shadow-xl hidden md:block max-w-[280px]"
          >
            <p className="font-serif italic text-xl text-patisserie-accent mb-2">"Pasiune în fiecare frământare."</p>
            <p className="text-sm text-patisserie-ink/60 leading-relaxed">
              Folosim doar ingrediente naturale, locale, pentru a păstra gustul de altădată al Brașovului.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-patisserie-accent uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Povestea Noastră
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif leading-tight"
          >
            Dencopan: O Tradiție <br />
            <span className="italic">Născută în Inima Brașovului</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-patisserie-ink/80 leading-relaxed"
          >
            De peste un deceniu, Dencopan aduce zâmbetul pe buzele brașovenilor cu produse de patiserie proaspăt scoase din cuptor. Totul a început dintr-o pasiune simplă pentru aluatul bine dospit și dorința de a oferi comunității noastre ceva cu adevărat special.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-patisserie-ink/80 leading-relaxed"
          >
            Fie că este vorba de croissantele noastre pufoase, plăcintele tradiționale cu brânză sau pâinea artizanală cu maia, fiecare produs care pleacă din mâinile noastre poartă amprenta calității și a respectului pentru tradiție.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-8 mt-4"
          >
            <div>
              <span className="block text-4xl font-serif text-patisserie-accent">10+</span>
              <span className="text-xs uppercase tracking-widest text-patisserie-ink/60">Ani de Experiență</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-patisserie-accent">50+</span>
              <span className="text-xs uppercase tracking-widest text-patisserie-ink/60">Produse Zilnice</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
