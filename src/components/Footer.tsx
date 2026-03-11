import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-patisserie-ink text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-serif tracking-tight">DENCOPAN</h3>
            <p className="text-white/60 leading-relaxed">
              Arta patiseriei tradiționale, adusă la viață în inima Brașovului. Calitate, pasiune și gust autentic în fiecare zi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-patisserie-ink transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-patisserie-ink transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif uppercase tracking-widest">Link-uri Rapide</h4>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Acasă</a></li>
              <li><a href="#despre" className="hover:text-white transition-colors">Despre Noi</a></li>
              <li><a href="#produse" className="hover:text-white transition-colors">Produsele Noastre</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif uppercase tracking-widest">Contact</h4>
            <ul className="flex flex-col gap-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-patisserie-accent" />
                <span>Strada Republicii, Nr. 15, Brașov, România</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-patisserie-accent" />
                <span>+40 722 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-patisserie-accent" />
                <span>contact@dencopan.ro</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif uppercase tracking-widest">Program</h4>
            <ul className="flex flex-col gap-4 text-white/60">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 text-patisserie-accent" />
                <div>
                  <span className="block">Luni - Vineri</span>
                  <span className="text-sm">07:00 - 19:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 text-patisserie-accent" />
                <div>
                  <span className="block">Sâmbătă - Duminică</span>
                  <span className="text-sm">08:00 - 16:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:row items-center justify-between gap-6 text-white/40 text-sm">
          <p>© 2024 Dencopan Patiserie. Toate drepturile rezervate.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Politică de Confidențialitate</a>
            <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
