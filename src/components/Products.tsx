import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart, Product } from '../context/CartContext';

const categories = ['Toate', 'Pâine', 'Patiserie', 'Cofetărie', 'Speciale'];

const products: Product[] = [
  {
    id: 1,
    name: 'Croissant cu Unt',
    category: 'Patiserie',
    price: '6.50 RON',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Pâine cu Maia',
    category: 'Pâine',
    price: '12.00 RON',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Ecler cu Vanilie',
    category: 'Cofetărie',
    price: '14.00 RON',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Plăcintă cu Brânză',
    category: 'Patiserie',
    price: '8.00 RON',
    image: 'https://images.unsplash.com/photo-1562007908-859b4ba9a1a2?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Brioșă cu Ciocolată',
    category: 'Patiserie',
    price: '7.50 RON',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Tort Diplomat',
    category: 'Cofetărie',
    price: '120.00 RON',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop',
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Toate');
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'Toate' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="produse" className="py-24 px-6 md:px-12 bg-patisserie-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-patisserie-accent uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Meniul Nostru
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif mt-4"
          >
            Delicii Proaspete <span className="italic">Zilnic</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300',
                activeCategory === cat 
                  ? 'bg-patisserie-ink text-white' 
                  : 'bg-white text-patisserie-ink hover:bg-patisserie-cream'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-patisserie-accent font-medium">{product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="text-xs uppercase tracking-widest font-bold hover:text-patisserie-accent transition-colors"
                      >
                        Adaugă în Coș
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
