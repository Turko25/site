'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  // Seni (Uğur) ve örnek bir veriyi varsayılan olarak ekledim ki liste boş kalmasın
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Uğur', email: 'admin@tss.net.tr', role: 'admin' },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Gerçek veritabanı API'n hazır olduğunda burayı aktif edebilirsin
    /*
    setLoading(true);
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    */
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
            <p className="text-sm text-gray-500">Sistemde kayıtlı yöneticileri ve personeli yönetin.</p>
          </div>
          <Link 
            href="/admin/users/new" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <span>+</span> Yeni Kullanıcı Ekle
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600 text-sm">AD SOYAD</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">E-POSTA</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">ROL</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Yükleniyor...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Kayıtlı kullanıcı bulunamadı.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? 'Yönetici' : 'Editör'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Düzenle</button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}