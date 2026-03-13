import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowLeft, CreditCard, Truck, CheckCircle2, Package, MapPin, Phone, Mail, User, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CheckoutPageProps {
  onClose: () => void;
  key?: string;
}

type CheckoutStep = 'cart' | 'details' | 'success';

export default function CheckoutPage({ onClose }: CheckoutPageProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Brașov',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'orders'), {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: finalTotal,
        createdAt: serverTimestamp(),
      });

      setStep('success');
      setTimeout(() => {
        clearCart();
      }, 500);
    } catch (err) {
      console.error("Order submission error:", err);
      setError("A apărut o eroare la plasarea comenzii. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shippingCost = 15;
  const finalTotal = totalPrice + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {step !== 'success' ? (
            <button 
              onClick={step === 'details' ? () => setStep('cart') : onClose}
              className="flex items-center gap-2 text-patisserie-ink/60 hover:text-patisserie-ink transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-widest text-sm font-bold">
                {step === 'details' ? 'Înapoi la coș' : 'Înapoi la magazin'}
              </span>
            </button>
          ) : <div className="w-24" />}
          
          <h1 className="text-3xl md:text-4xl font-serif text-center">
            {step === 'cart' && <>Coșul tău de <span className="italic">cumpărături</span></>}
            {step === 'details' && <>Finalizare <span className="italic">Comandă</span></>}
            {step === 'success' && <>Comandă <span className="italic">Confirmată</span></>}
          </h1>
          <div className="w-24" />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CART REVIEW */}
          {step === 'cart' && (
            <motion.div
              key="cart-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
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
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-patisserie-accent transition-colors"><Minus className="w-4 h-4" /></button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-patisserie-accent transition-colors"><Plus className="w-4 h-4" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="lg:col-span-1">
                    <div className="bg-patisserie-ink text-white p-8 rounded-3xl">
                      <h2 className="text-2xl font-serif mb-8">Sumar Coș</h2>
                      <div className="flex justify-between mb-4 text-white/60">
                        <span>Subtotal</span>
                        <span>{totalPrice.toFixed(2)} RON</span>
                      </div>
                      <div className="h-[1px] bg-white/10 my-4" />
                      <div className="flex justify-between text-xl font-serif mb-8">
                        <span>Total</span>
                        <span>{totalPrice.toFixed(2)} RON</span>
                      </div>
                      <button 
                        onClick={() => setStep('details')}
                        className="w-full py-4 bg-patisserie-accent text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-patisserie-ink transition-all"
                      >
                        Continuă spre Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: DETAILS & PAYMENT */}
          {step === 'details' && (
            <motion.form
              key="details-step"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Shipping Info */}
                <div className="bg-patisserie-cream/20 p-8 rounded-3xl border border-patisserie-cream/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-patisserie-accent" />
                    <h2 className="text-2xl font-serif">Informații Livrare</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Nume Complet</label>
                      <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-patisserie-ink/10 focus:ring-2 focus:ring-patisserie-accent outline-none" placeholder="Ex: Ion Popescu" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Telefon</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-patisserie-ink/10 focus:ring-2 focus:ring-patisserie-accent outline-none" placeholder="07xx xxx xxx" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-patisserie-ink/10 focus:ring-2 focus:ring-patisserie-accent outline-none" placeholder="email@exemplu.com" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Adresă de Livrare (Brașov)</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-patisserie-ink/10 focus:ring-2 focus:ring-patisserie-accent outline-none" placeholder="Strada, Număr, Bloc, Apartament" />
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-patisserie-cream/20 p-8 rounded-3xl border border-patisserie-cream/50">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-patisserie-accent" />
                    <h2 className="text-2xl font-serif">Metodă de Plată</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                      formData.paymentMethod === 'card' ? "border-patisserie-accent bg-patisserie-accent/5" : "border-patisserie-ink/10 bg-white"
                    )}>
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="hidden" />
                      <CreditCard className={cn("w-5 h-5", formData.paymentMethod === 'card' ? "text-patisserie-accent" : "text-patisserie-ink/40")} />
                      <span className="font-medium">Plată cu Cardul</span>
                    </label>
                    <label className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                      formData.paymentMethod === 'cash' ? "border-patisserie-accent bg-patisserie-accent/5" : "border-patisserie-ink/10 bg-white"
                    )}>
                      <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} className="hidden" />
                      <Truck className={cn("w-5 h-5", formData.paymentMethod === 'cash' ? "text-patisserie-accent" : "text-patisserie-ink/40")} />
                      <span className="font-medium">Plată la Livrare</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-patisserie-ink text-white p-8 rounded-3xl sticky top-24">
                  <h2 className="text-2xl font-serif mb-8">Sumar Comandă</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>{totalPrice.toFixed(2)} RON</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Livrare</span>
                      <span>{shippingCost.toFixed(2)} RON</span>
                    </div>
                    <div className="h-[1px] bg-white/10 my-2" />
                    <div className="flex justify-between text-xl font-serif">
                      <span>Total</span>
                      <span>{finalTotal.toFixed(2)} RON</span>
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                  )}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-patisserie-accent text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-patisserie-ink transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Se procesează...
                      </>
                    ) : 'Plasează Comanda'}
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Vă mulțumim pentru <span className="italic">comandă!</span></h2>
              <p className="text-lg text-patisserie-ink/60 mb-12">
                Comanda ta a fost recepționată cu succes. Vei primi un email de confirmare în câteva momente la adresa <span className="font-bold text-patisserie-ink">{formData.email}</span>.
              </p>
              
              <div className="bg-patisserie-cream/30 p-8 rounded-3xl text-left mb-12">
                <h3 className="font-serif text-xl mb-6 border-bottom border-patisserie-ink/10 pb-4">Detalii Comandă</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-patisserie-accent shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Destinatar</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-patisserie-accent shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Adresă</p>
                        <p className="font-medium">{formData.address}, {formData.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-patisserie-accent shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Telefon</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-patisserie-accent shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-patisserie-ink/40">Total Plată</p>
                        <p className="font-medium">{finalTotal.toFixed(2)} RON ({formData.paymentMethod === 'card' ? 'Plătit Online' : 'Ramburs'})</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="px-12 py-4 bg-patisserie-ink text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-patisserie-accent transition-all"
              >
                Înapoi la pagina principală
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
