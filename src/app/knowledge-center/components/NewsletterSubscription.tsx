'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-8 lg:p-10 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-6">
          <Icon name="EnvelopeIcon" size={32} className="text-primary-foreground" variant="solid" />
        </div>
        
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Güncel Kalın
        </h2>
        
        <p className="text-primary-foreground/90 mb-8 leading-relaxed">
          Sigorta dünyasındaki en son gelişmeler, uzman analizleri ve özel içerikler için bültenimize abone olun.
        </p>
        
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-1 px-4 py-3 bg-primary-foreground text-text-primary rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-foreground/30 transition-all duration-base"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-base whitespace-nowrap"
            >
              Abone Ol
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-primary-foreground">
            <Icon name="CheckCircleIcon" size={24} variant="solid" />
            <span className="font-semibold">Başarıyla abone oldunuz!</span>
          </div>
        )}
      </div>
    </section>
  );
}