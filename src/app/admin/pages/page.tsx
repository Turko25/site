'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PageItem {
  id: string;
  title: string;
  author: string;
  date: string;
  status: 'Yayınlandı' | 'Taslak';
}

export default function AdminPagesList() {
  const [pages] = useState<PageItem[]>([
    { id: '1', title: 'Gizlilik Politikası', author: 'Uğur', date: '2026/01/09', status: 'Yayınlandı' },
    { id: '2', title: 'KVKK Aydınlatma Metni', author: 'Uğur', date: '2026/01/08', status: 'Yayınlandı' },
    { id: '3', title: 'Hakkımızda', author: 'Uğur', date: '2026/01/05', status: 'Taslak' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sayfalar</h1>
          <Link href="/admin/posts/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Yeni Sayfa Ekle
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Başlık</th>
                <th className="p-4 font-semibold text-gray-600">Yazar</th>
                <th className="p-4 font-semibold text-gray-600">Durum</th>
                <th className="p-4 font-semibold text-gray-600">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">{page.title}</div>
                    <div className="text-xs text-gray-400 mt-1 flex gap-2">
                      <button className="hover:text-blue-600">Düzenle</button> | 
                      <button className="hover:text-red-600">Sil</button> | 
                      <button className="hover:text-gray-600">Görüntüle</button>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{page.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${page.status === 'Yayınlandı' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{page.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}