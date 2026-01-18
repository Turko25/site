'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyOptionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [privacyPolicyPage, setPrivacyPolicyPage] = useState('privacy-policy');
  const [cookieConsent, setCookieConsent] = useState(true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Gizlilik Ayarları</h1>
          <p className="text-gray-500">KVKK, Gizlilik Politikası ve Çerez yönetimi ayarları.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg shadow-sm">
            ✅ Gizlilik ayarları başarıyla kaydedildi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-8">
            
            {/* GİZLİLİK POLİTİKASI SAYFASI SEÇİMİ */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Gizlilik Politikası Sayfası</h2>
              <p className="text-sm text-gray-500">
                Sitenizin yasal gereklilikleri için hangi sayfanın "Gizlilik Politikası" olarak kullanılacağını seçin.
              </p>
              <select 
                className="w-full md:w-1/2 p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={privacyPolicyPage}
                onChange={(e) => setPrivacyPolicyPage(e.target.value)}
              >
                <option value="privacy-policy">Gizlilik Politikası (Varsayılan)</option>
                <option value="terms">Kullanım Şartları</option>
                <option value="kvkk">KVKK Aydınlatma Metni</option>
              </select>
	      <button 
  type="button"
  className="block text-sm text-blue-600 hover:underline"
  onClick={() => router.push('/admin/pages')} // Burayı /admin/pages yaptık
>
  Yeni sayfa oluştur veya düzenle
</button>
            </section>

            {/* ÇEREZ AYARLARI */}
            <section className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Çerez (Cookie) Yönetimi</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Çerez Onay Çubuğunu Göster</h3>
                  <p className="text-xs text-gray-500">Kullanıcılar siteye girdiğinde alt kısımda bir onay kutusu çıkar.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={cookieConsent}
                    onChange={() => setCookieConsent(!cookieConsent)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </section>

            {/* VERİ SİLME TALEPLERİ */}
            <section className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Kişisel Veri Talepleri</h2>
              <p className="text-sm text-gray-500">Kullanıcıların verilerini dışa aktarma veya silme taleplerini buradan yönetebilirsiniz.</p>
              <div className="flex gap-4">
                <button type="button" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition">Verileri Dışa Aktar</button>
                <button type="button" className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition">Veri Silme Taleplerini Gör</button>
              </div>
            </section>

            <div className="pt-6 border-t flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Ayarları Uygula'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}