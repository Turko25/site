'use client';

import { useState } from 'react';

export default function MediaOptionsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [mediaSettings, setMediaSettings] = useState({
    thumbnailSize: { width: 150, height: 150, crop: true },
    mediumSize: { width: 300, height: 300 },
    largeSize: { width: 1024, height: 1024 },
    organizeUploads: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simüle edilmiş kayıt işlemi
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
          <h1 className="text-2xl font-bold text-gray-800">Ortam Ayarları</h1>
          <p className="text-gray-500 text-sm">Resim boyutlarını ve yükleme klasörü yapısını düzenleyin.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg shadow-sm">
            ✅ Ortam ayarları başarıyla güncellendi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-8">
            
            {/* RESİM BOYUTLARI */}
            <section className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Resim Boyutları</h2>
              <p className="text-sm text-gray-500">Aşağıdaki boyutlar, kütüphaneye bir resim yüklendiğinde otomatik olarak oluşturulacak maksimum boyutları belirler.</p>

              {/* Küçük Resim */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                <label className="font-medium text-gray-700 text-sm">Küçük Boyut</label>
                <div className="flex gap-4 col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Genişlik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.thumbnailSize.width} onChange={(e) => setMediaSettings({...mediaSettings, thumbnailSize: {...mediaSettings.thumbnailSize, width: parseInt(e.target.value)}})} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Yükseklik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.thumbnailSize.height} onChange={(e) => setMediaSettings({...mediaSettings, thumbnailSize: {...mediaSettings.thumbnailSize, height: parseInt(e.target.value)}})} />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                    <input type="checkbox" checked={mediaSettings.thumbnailSize.crop} onChange={(e) => setMediaSettings({...mediaSettings, thumbnailSize: {...mediaSettings.thumbnailSize, crop: e.target.checked}})} />
                    Resmi tam boyuta kes
                  </label>
                </div>
              </div>

              {/* Orta Boyut */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                <label className="font-medium text-gray-700 text-sm">Orta Boyut</label>
                <div className="flex gap-4 col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Genişlik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.mediumSize.width} onChange={(e) => setMediaSettings({...mediaSettings, mediumSize: {...mediaSettings.mediumSize, width: parseInt(e.target.value)}})} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Yükseklik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.mediumSize.height} onChange={(e) => setMediaSettings({...mediaSettings, mediumSize: {...mediaSettings.mediumSize, height: parseInt(e.target.value)}})} />
                  </div>
                </div>
              </div>

              {/* Büyük Boyut */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="font-medium text-gray-700 text-sm">Büyük Boyut</label>
                <div className="flex gap-4 col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Genişlik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.largeSize.width} onChange={(e) => setMediaSettings({...mediaSettings, largeSize: {...mediaSettings.largeSize, width: parseInt(e.target.value)}})} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Yükseklik:</span>
                    <input type="number" className="w-20 p-2 border rounded" value={mediaSettings.largeSize.height} onChange={(e) => setMediaSettings({...mediaSettings, largeSize: {...mediaSettings.largeSize, height: parseInt(e.target.value)}})} />
                  </div>
                </div>
              </div>
            </section>

            {/* DOSYA YÜKLEME */}
            <section className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Dosya Yükleme</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded" 
                  checked={mediaSettings.organizeUploads}
                  onChange={(e) => setMediaSettings({...mediaSettings, organizeUploads: e.target.checked})}
                />
                <span className="text-sm text-gray-700 font-medium">Yüklemelerimi ay ve yıl bazlı klasörlerde sakla</span>
              </label>
              <p className="text-xs text-gray-400 ml-7">Örn: /uploads/2026/01/resim.jpg</p>
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