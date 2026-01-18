'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  className?: string;
}

const FAQSection = ({ faqs, className = '' }: FAQSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`py-12 lg:py-16 bg-surface ${className}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            En çok merak edilen konulara hızlı yanıtlar
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-base hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-base"
              >
                <div className="flex-1 pr-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {faq.question}
                  </h3>
                </div>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  className={`text-text-secondary transition-transform duration-base flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-5 pt-2">
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-secondary mb-4">
            Aradığınız soruyu bulamadınız mı?
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-all duration-base"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} className="mr-2" />
            Bize Sorun
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;