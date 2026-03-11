import React from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onClose: () => void;
  key?: string;
}

export default function CheckoutPage({ onClose }: CheckoutPageProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-patisserie-ink/60 hover:text-patisserie-ink transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-sm font-bold">Înapoi la magazin</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-serif">Coșul tău de <span className="italic">cumpărături</span></h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-patisserie-ink/40 font-serif italic mb-8">Coșul tău este gol momentan.</p>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-patisserie-ink text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-patisserie-accent transition-all"
            >
              Explorează produsele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  className="flex items-center gap-6 p-4 bg-patisserie-cream/20 rounded-2xl border border-patisserie-cream/50"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <p className="text-patisserie-accent font-medium">{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-patisserie-ink/10 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-patisserie-accent transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:text-patisserie-accent transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-patisserie-ink text-white p-8 rounded-3xl sticky top-24">
                <h2 className="text-2xl font-serif mb-8">Sumar Comandă</h2>
                
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)} RON</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Livrare (Brașov)</span>
                    <span>15.00 RON</span>
                  </div>
                  <div className="h-[1px] bg-white/10 my-2" />
                  <div className="flex justify-between text-xl font-serif">
                    <span>Total</span>
                    <span>{(totalPrice + 15).toFixed(2)} RON</span>
                  </div>
                </div>

                <button 
                  className="w-full py-4 bg-patisserie-accent text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-patisserie-ink transition-all flex items-center justify-center gap-2 mb-4"
                  onClick={() => {
                    alert('Comandă plasată cu succes! Vă mulțumim.');
                    clearCart();
                    onClose();
                  }}
                >
                  <CreditCard className="w-4 h-4" />
                  Finalizează Comanda
                </button>
                
                <p className="text-[10px] text-center text-white/40 uppercase tracking-widest">
                  Plată securizată prin card sau ramburs
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
