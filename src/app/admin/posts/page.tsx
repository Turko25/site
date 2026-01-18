'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PostsList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    if(!confirm('Bu yazıyı silmek istediğine emin misin?')) return;
    
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
    fetchData() // Listeyi yenile
  }

  if (loading) return <div className="p-8 text-sm text-gray-500">Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* YENİ BAŞLIK TASARIMI: KİBAR VE YAN YANA */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Blog Yazıları</h1>
          <Link 
            href="/admin/posts/new" 
            className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 transition"
          >
            + Yazı Ekle
          </Link>
          <div className="flex-grow"></div>
          <Link href="/admin/dashboard" className="text-gray-500 text-sm hover:underline">← Panel</Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-4">Başlık</th>
                <th className="p-4">Kategori</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr><td colSpan={3} className="p-6 text-center text-gray-400 text-sm">Yazı bulunamadı.</td></tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-800 text-sm">{post.title}</td>
                    <td className="p-4 text-blue-600 text-xs font-bold">{post.category?.name || '-'}</td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/yazi/${post.slug}`} target="_blank" className="text-gray-500 hover:text-gray-800 text-xs">Gör</Link>
                      
                      {/* DÜZENLEME SAYFASINA GİDER (BİRAZDAN YAPACAĞIZ) */}
                      {/* Şimdilik basitçe yeni sekmede açılmasın diye target blank yok */}
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" onClick={() => alert('Düzenleme özelliği editör sayfasıyla gelecek.')}>Düzenle</button>
                      
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}