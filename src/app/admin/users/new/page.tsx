'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Burada normalde /api/users/create gibi bir yere istek atılır
    console.log("Yeni Kullanıcı Verisi:", formData);
    
    // Simülasyon için 1 saniye bekletip geri yollayalım
    setTimeout(() => {
      alert('Kullanıcı başarıyla oluşturuldu! (Not: Veritabanı bağlantısı aktif edilmelidir)');
      router.push('/admin/users');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Yeni Kullanıcı Ekle</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ad Soyad</label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                required
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                required
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select 
                className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="user">Kullanıcı</option>
                <option value="editor">Editör</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Kullanıcıyı Kaydet'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}