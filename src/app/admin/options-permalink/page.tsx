'use client';

import { useState } from 'react';

export default function PermalinksPage() {
  const [selectedStructure, setSelectedStructure] = useState('postname');
  const [customStructure, setCustomStructure] = useState('/%postname%/');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Kayıt simülasyonu
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Kalıcı Bağlantı Ayarları</h1>
          <p className="text-gray-500">Sitenizin URL yapısını ve bağlantı biçimlerini özelleştirin.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">
            ✅ Kalıcı bağlantı yapısı güncellendi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-6">
            
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Genel Ayarlar</h2>

            <div className="space-y-4">
              {/* Düz Yapı */}
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input 
                  type="radio" 
                  name="permalink" 
                  checked={selectedStructure === 'plain'} 
                  onChange={() => setSelectedStructure('plain')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <span className="font-medium block">Düz</span>
                  <code className="text-xs text-gray-400">http://localhost:4028/?p=123</code>
                </div>
              </label>

              {/* Gün ve İsim */}
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input 
                  type="radio" 
                  name="permalink" 
                  checked={selectedStructure === 'dayname'} 
                  onChange={() => setSelectedStructure('dayname')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <span className="font-medium block">Gün ve İsim</span>
                  <code className="text-xs text-gray-400">http://localhost:4028/2026/01/09/ornek-yazi/</code>
                </div>
              </label>

              {/* Yazı İsmi (En SEO uyumlu olan) */}
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-blue-50 border-blue-200 shadow-sm">
                <input 
                  type="radio" 
                  name="permalink" 
                  checked={selectedStructure === 'postname'} 
                  onChange={() => setSelectedStructure('postname')}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <span className="font-medium block text-blue-800">Yazı İsmi (Tavsiye Edilen)</span>
                  <code className="text-xs text-blue-600">http://localhost:4028/ornek-yazi/</code>
                </div>
              </label>

              {/* Özel Yapı */}
              <div className="p-3 border rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input 
                    type="radio" 
                    name="permalink" 
                    checked={selectedStructure === 'custom'} 
                    onChange={() => setSelectedStructure('custom')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="font-medium">Özel Yapı</span>
                </label>
                <input 
                  type="text" 
                  value={customStructure}
                  onChange={(e) => setCustomStructure(e.target.value)}
                  disabled={selectedStructure !== 'custom'}
                  className="w-full p-2 border rounded bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="/%category%/%postname%/"
                />
              </div>
            </div>

            <div className="pt-6 border-t flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Dikkat: Kalıcı bağlantı yapısını değiştirmek eski linklerin kırılmasına neden olabilir.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}