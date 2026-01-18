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
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <Icon name="QuestionMarkCircleIcon" size={28} className="text-primary mr-3" variant="solid" />
        <h2 className="text-2xl font-bold text-text-primary">Sıkça Sorulan Sorular</h2>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-base"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-muted transition-colors duration-base"
            >
              <div className="flex-1 pr-4">
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-2">
                  {faq.category}
                </span>
                <h3 className="text-base font-semibold text-text-primary">{faq.question}</h3>
              </div>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className={`text-text-secondary transition-transform duration-base flex-shrink-0 ${
                  expandedId === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedId === faq.id && (
              <div className="px-5 pb-5 pt-2 border-t border-border">
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}