'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

interface GlossarySectionProps {
  terms: GlossaryTerm[];
}

export default function GlossarySection({ terms }: GlossarySectionProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  
  const alphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
  
  const filteredTerms = terms.filter(term => 
    term.term.toLocaleUpperCase('tr-TR').startsWith(selectedLetter)
  );

  return (
    <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <Icon name="BookmarkIcon" size={28} className="text-primary mr-3" variant="solid" />
        <h2 className="text-2xl font-bold text-text-primary">Sigorta Sözlüğü</h2>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all duration-base ${
              selectedLetter === letter
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-text-primary hover:bg-muted'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <div key={term.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-text-primary">{term.term}</h3>
                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded">
                  {term.category}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">{term.definition}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="MagnifyingGlassIcon" size={48} className="text-text-tertiary mx-auto mb-4" />
            <p className="text-text-secondary">Bu harfle başlayan terim bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}