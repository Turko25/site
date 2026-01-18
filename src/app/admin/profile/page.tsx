'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Profil verileri - Statik olarak senin bilgilerini ekledim
  const [formData, setFormData] = useState({
    name: 'Uğur',
    email: 'admin@sigortasitesi.com',
    role: 'Yönetici',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Güncelleme simülasyonu
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // 3 saniye sonra başarı mesajını gizle
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Profil Ayarları</h1>
            <p className="text-gray-500 text-sm">Hesap bilgilerinizi ve şifrenizi buradan güncelleyebilirsiniz.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 animate-pulse">
            ✅ Profiliniz başarıyla güncellendi!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sol Kolon: Bilgiler */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Kişisel Bilgiler</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <input
                      type="email"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Şifre Değiştir</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
                  <input
                    type="password"
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                    <input
                      type="password"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar)</label>
                    <input
                      type="password"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-black transition"
                  >
                    Şifreyi Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sağ Kolon: Durum Kartı */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {formData.role}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Hesabınız şu an aktif. Tüm yönetici yetkilerine sahipsiniz.
              </p>
              <button 
                onClick={() => router.push('/admin')}
                className="w-full py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Panel Ana Sayfası
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}