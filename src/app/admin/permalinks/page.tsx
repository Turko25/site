'use client';

import React from 'react';

export default function PermalinksPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kalıcı Bağlantı Ayarları</h1>
      <p className="text-gray-600">Bu sayfa şu an yapım aşamasındadır.</p>
      <div className="mt-6 p-4 border rounded-lg bg-white">
        <label className="block font-medium mb-2">Yazı İsmi Yapısı</label>
        <input 
          type="text" 
          placeholder="/%postname%/" 
          className="w-full p-2 border rounded"
          disabled 
        />
      </div>
    </div>
  );
}