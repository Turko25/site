'use client';

import React from 'react';

interface ChunkErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const ChunkErrorFallback: React.FC<ChunkErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-3 text-center text-2xl font-bold text-gray-800">
          Sayfa Yüklenemedi
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Uygulama güncellenmiş olabilir. Sayfayı yenileyerek devam edebilirsiniz.
        </p>

        {error && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              Hata Detayı: {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleReload}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Sayfayı Yenile
          </button>

          <button
            onClick={() => (window.location.href = '/homepage')}
            className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Sorun devam ederse, lütfen tarayıcınızın önbelleğini temizleyin.
        </p>
      </div>
    </div>
  );
};

export default ChunkErrorFallback;