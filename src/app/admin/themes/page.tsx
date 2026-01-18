'use client';

import { useState } from 'react';

interface Theme {
  id: string;
  name: string;
  author: string;
  version: string;
  active: boolean;
  screenshot: string;
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: '1',
      name: 'Sigorta Kurumsal Pro',
      author: 'Edis Yazılım',
      version: '1.0.4',
      active: true,
      screenshot: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Sigorta+Kurumsal'
    },
    {
      id: '2',
      name: 'Kasko & Reasürans Klasik',
      author: 'Edis Yazılım',
      version: '2.1.0',
      active: false,
      screenshot: 'https://via.placeholder.com/400x300/1f2937/ffffff?text=Kasko+Klasik'
    }
  ]);

  const handleActivate = (id: string) => {
    setThemes(themes.map(theme => ({
      ...theme,
      active: theme.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Görünüm ve Temalar</h1>
            <p className="text-gray-500">Sitenizin dış görünüşünü tek tıkla değiştirin.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
            Yeni Tema Yükle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div 
              key={theme.id} 
              className={`bg-white rounded-xl overflow-hidden border-2 transition-all ${
                theme.active ? 'border-blue-600 ring-4 ring-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={theme.screenshot} 
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                {theme.active && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    AKTİF
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{theme.name}</h3>
                  <span className="text-xs text-gray-400">v{theme.version}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Yazar: {theme.author}</p>
                
                <div className="flex gap-2">
                  {!theme.active ? (
                    <>
                      <button 
                        onClick={() => handleActivate(theme.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Etkinleştir
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                        Önizleme
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg text-sm font-semibold cursor-not-allowed" disabled>
                      Şu An Kullanılıyor
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}