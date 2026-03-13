import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './context/CartContext';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Te rugăm să introduci o adresă de email validă.');
      return;
    }

    setStatus('loading');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setMessage('Mulțumim pentru abonare!');
      setEmail('');
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus('error');
      setMessage('Eroare de conexiune. Te rugăm să încerci din nou.');
    }
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="relative">
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        <AnimatePresence>
          {isCheckoutOpen && (
            <CheckoutPage 
              key="checkout" 
              onClose={() => setIsCheckoutOpen(false)} 
            />
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-patisserie-accent z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />
        
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
                onSubmit={handleSubscribe}
              >
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresa ta de email"
                    className="w-full px-8 py-4 rounded-full bg-white border-none focus:ring-2 focus:ring-patisserie-accent outline-none text-patisserie-ink"
                    disabled={status === 'loading'}
                  />
                  {status === 'error' && (
                    <p className="text-red-500 text-sm mt-2 text-left px-4">{message}</p>
                  )}
                  {status === 'success' && (
                    <p className="text-green-600 text-sm mt-2 text-left px-4 font-bold">{message}</p>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-10 py-4 bg-patisserie-ink text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-patisserie-accent transition-all duration-300 disabled:opacity-50 h-fit"
                >
                  {status === 'loading' ? 'Se trimite...' : 'Abonează-te'}
                </button>
              </motion.form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
