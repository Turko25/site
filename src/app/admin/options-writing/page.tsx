'use client';

import { useState } from 'react';

export default function WritingOptionsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    defaultCategory: 'genel',
    defaultPostFormat: 'standart',
    useEmoticons: true,
    mailServer: 'mail.example.com',
    mailLogin: 'post@example.com',
    mailPass: '********',
    mailCategory: '1'
  });

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
          <h1 className="text-2xl font-bold text-gray-800">Yazma Ayarları</h1>
          <p className="text-gray-500 text-sm">İçerik oluşturma ve yayınlama seçeneklerini yapılandırın.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg shadow-sm">
            ✅ Yazma ayarları başarıyla kaydedildi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-10">
            
            {/* GENEL YAZMA AYARLARI */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Genel Yazma Ayarları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700">Varsayılan Yazı Kategorisi</label>
                <div className="md:col-span-2">
                  <select 
                    className="w-full md:w-64 p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={settings.defaultCategory}
                    onChange={(e) => setSettings({...settings, defaultCategory: e.target.value})}
                  >
                    <option value="genel">Genel</option>
                    <option value="sigorta-haberleri">Sigorta Haberleri</option>
                    <option value="kasko">Kasko</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700">Varsayılan Yazı Formatı</label>
                <div className="md:col-span-2">
                  <select 
                    className="w-full md:w-64 p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={settings.defaultPostFormat}
                    onChange={(e) => setSettings({...settings, defaultPostFormat: e.target.value})}
                  >
                    <option value="standart">Standart</option>
                    <option value="kenar-notu">Kenar Notu</option>
                    <option value="galeri">Galeri</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 rounded" 
                    checked={settings.useEmoticons}
                    onChange={(e) => setSettings({...settings, useEmoticons: e.target.checked})}
                  />
                  <span className="text-sm text-gray-700">Yazımdaki :-) ve :-P gibi ifadeleri grafik emojilere dönüştür</span>
                </label>
              </div>
            </section>

            {/* E-POSTA İLE YAZI GÖNDERME */}
            <section className="space-y-6 pt-4">
              <div className="border-b pb-2">
                <h2 className="text-lg font-semibold text-gray-700">E-posta ile Yazı Gönder</h2>
                <p className="text-xs text-gray-400 mt-1">E-posta ile gönderdiğiniz içeriklerin otomatik olarak yayınlanması için gizli bir e-posta hesabı kurun.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Posta Sunucusu</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.mailServer}
                    onChange={(e) => setSettings({...settings, mailServer: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Giriş Adı</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.mailLogin}
                    onChange={(e) => setSettings({...settings, mailLogin: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Şifre</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={settings.mailPass}
                    onChange={(e) => setSettings({...settings, mailPass: e.target.value})}
                  />
                </div>
              </div>
            </section>

            <div className="pt-6 border-t flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50 text-sm"
              >
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}