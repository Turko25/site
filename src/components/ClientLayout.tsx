'use client';

import React, { useEffect } from 'react';
import { Providers } from "@/app/providers"; // Path'e dikkat (@/app/providers yaptık)
import '../styles/tailwind.css';
import '../styles/index.css';

// Error Boundary Component (Hata Yakalayıcı)
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught error:', error, errorInfo);
    
    // Chunk hatası kontrolü
    if (
      error.message.includes('Loading chunk') ||
      error.message.includes('ChunkLoadError')
    ) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Bir Hata Oluştu
            </h2>
            <p className="mb-6 text-gray-600">
              Sayfa yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Parça yükleme hatalarını yakalayıp sayfayı yenileyen kod
    const handleChunkError = (event: ErrorEvent) => {
      if (
        event.message.includes('Loading chunk') ||
        event.message.includes('ChunkLoadError')
      ) {
        console.log('Chunk load error detected, reloading page...');
        window.location.reload();
      }
    };

    // Global hata dinleyicisi
    window.addEventListener('error', handleChunkError);

    // Temizlik
    return () => {
      window.removeEventListener('error', handleChunkError);
    };
  }, []);

  return (
    <Providers>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Providers>
  );
}