'use client';

import { useState, useEffect } from 'react';
import QuoteForm from './QuoteForm';
import QuoteResult from './QuoteResult';

const QuoteCalculatorInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<any>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleQuoteGenerated = (quote: any) => {
    setGeneratedQuote(quote);
  };

  const handleNewQuote = () => {
    setGeneratedQuote(null);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-medical-gradient py-24">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-medical p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medical-gradient py-24">
      <div className="container mx-auto px-4">
        {!generatedQuote ? (
          <QuoteForm onQuoteGenerated={handleQuoteGenerated} />
        ) : (
          <QuoteResult quote={generatedQuote} onNewQuote={handleNewQuote} />
        )}
      </div>
    </div>
  );
};

export default QuoteCalculatorInteractive;