import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Andreea M.',
    role: 'Client Fidel',
    content: 'Cele mai bune croissante din Brașov! Se simte calitatea untului și pasiunea cu care sunt făcute. Recomand cu drag!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marius P.',
    role: 'Localnic',
    content: 'Pâinea cu maia de la Dencopan este nelipsită de la masa noastră. Are acea crustă crocantă și miez pufos pe care o căutam de mult.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena S.',
    role: 'Turist',
    content: 'Am descoperit această patiserie în timpul vacanței în Brașov și am revenit în fiecare dimineață. Atmosfera este minunată.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="recenzii" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-patisserie-accent uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Ce Spun Clienții
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif mt-4"
          >
            Gânduri <span className="italic">Dulci</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-patisserie-cream/20 p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-patisserie-accent/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-patisserie-accent text-patisserie-accent" />
                ))}
              </div>
              <p className="text-lg text-patisserie-ink/80 italic mb-6 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <span className="block font-serif text-xl">{t.name}</span>
                <span className="text-xs uppercase tracking-widest text-patisserie-ink/50">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
