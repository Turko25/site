'use client';

import { useState } from 'react';

export default function ReadingOptionsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    frontPageType: 'latest_posts', // 'latest_posts' veya 'static_page'
    postsPerPage: 10,
    syndicationRange: 10,
    searchEngineVisibility: false
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
          <h1 className="text-2xl font-bold text-gray-800">Okuma Ayarları</h1>
          <p className="text-gray-500 text-sm">Sitenizin ana sayfa yapısını ve liste görünümünü yapılandırın.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg shadow-sm">
            ✅ Okuma ayarları başarıyla güncellendi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-10">
            
            {/* ANA SAYFA GÖRÜNÜMÜ */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Ana Sayfa Görüntülenmesi</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    className="mt-1 w-4 h-4 text-blue-600" 
                    checked={settings.frontPageType === 'latest_posts'} 
                    onChange={() => setSettings({...settings, frontPageType: 'latest_posts'})}
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">En son yazılarınız</span>
                    <p className="text-xs text-gray-400">Ana sayfa otomatik olarak güncel blog yazılarını listeler.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    className="mt-1 w-4 h-4 text-blue-600" 
                    checked={settings.frontPageType === 'static_page'} 
                    onChange={() => setSettings({...settings, frontPageType: 'static_page'})}
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Sabit sayfa (aşağıdan seçin)</span>
                    <p className="text-xs text-gray-400">Belirlediğiniz özel bir sayfa ana sayfa olarak kullanılır.</p>
                  </div>
                </label>
              </div>

              {settings.frontPageType === 'static_page' && (
                <div className="ml-7 p-4 bg-gray-50 rounded-lg space-y-4 border">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600 w-24">Ana Sayfa:</label>
                    <select className="p-2 border rounded bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Seçiniz...</option>
                      <option>Hakkımızda</option>
                      <option>Kasko Sigortası</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-600 w-24">Yazı Sayfası:</label>
                    <select className="p-2 border rounded bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Seçiniz...</option>
                      <option>Blog</option>
                      <option>Haberler</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* LİSTE AYARLARI */}
            <section className="space-y-6 pt-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Site İçeriği</h2>
              
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-700">En fazla gösterilecek blog sayfası adedi:</label>
                <input 
                  type="number" 
                  className="w-20 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" 
                  value={settings.postsPerPage}
                  onChange={(e) => setSettings({...settings, postsPerPage: parseInt(e.target.value)})}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-700">Beslemelerde (RSS) gösterilecek en güncel kayıt adedi:</label>
                <input 
                  type="number" 
                  className="w-20 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" 
                  value={settings.syndicationRange}
                  onChange={(e) => setSettings({...settings, syndicationRange: parseInt(e.target.value)})}
                />
              </div>
            </section>

            {/* ARAMA MOTORU GÖRÜNÜRLÜĞÜ */}
            <section className="space-y-4 pt-4 border-t">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-red-600 border-gray-300 rounded" 
                  checked={settings.searchEngineVisibility}
                  onChange={(e) => setSettings({...settings, searchEngineVisibility: e.target.checked})}
                />
                <span className="text-sm font-semibold text-gray-700">Arama motorlarının bu siteyi dizine eklemesine engel olmaya çalış</span>
              </label>
              <p className="text-xs text-gray-400 ml-7 italic">
                Bu ayarı aktif etmek, Google gibi arama motorlarına "beni tarama" sinyali gönderir. Genelde site yapım aşamasındayken kullanılır.
              </p>
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