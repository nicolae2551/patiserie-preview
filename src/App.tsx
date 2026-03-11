import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-patisserie-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <About />
        </motion.div>

        <Products />
        
        <Testimonials />

        {/* Newsletter Section */}
        <section className="py-24 px-6 md:px-12 bg-patisserie-cream">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-6"
            >
              Abonează-te pentru <span className="italic">Noutăți Dulci</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-patisserie-ink/60 mb-10"
            >
              Fii primul care află despre produsele noastre sezoniere și ofertele speciale.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-8 py-4 rounded-full bg-white border-none focus:ring-2 focus:ring-patisserie-accent outline-none text-patisserie-ink"
              />
              <button className="px-10 py-4 bg-patisserie-ink text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-patisserie-accent transition-all duration-300">
                Abonează-te
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
