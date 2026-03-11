import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCheckout: () => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Acasă', href: '#' },
    { name: 'Despre Noi', href: '#despre' },
    { name: 'Produse', href: '#produse' },
    { name: 'Recenzii', href: '#recenzii' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-colors duration-500",
        isScrolled ? "text-patisserie-ink" : "text-white"
      )}>
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
            DENCOPAN
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest hover:text-patisserie-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCheckout}
            className={cn(
              "p-2 rounded-full transition-colors relative",
              isScrolled ? "hover:bg-patisserie-cream" : "hover:bg-white/10"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-patisserie-accent text-white text-[10px] flex items-center justify-center rounded-full"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-patisserie-cream" : "hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button
                className="p-2 hover:bg-patisserie-cream rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-serif hover:text-patisserie-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
