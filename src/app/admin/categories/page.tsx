'use client'

import { useState, useEffect } from 'react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  // Sayfa açılınca mevcut kategorileri çek
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    if (res.ok) {
      const data = await res.json()
      setCategories(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })

    if (res.ok) {
      setName('')
      setDescription('')
      fetchCategories() // Listeyi güncelle
      alert('Kategori eklendi! ✅')
    } else {
      alert('Hata oluştu! ❌')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kategori Yönetimi</h1>
          <a href="/admin/dashboard" className="text-blue-600 hover:underline">← Panele Dön</a>
        </div>

        {/* EKLEME FORMU */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Yeni Kategori Ekle</h2>
          <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Kategori Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Örn: Tamamlayıcı Sağlık"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Açıklama</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Kısa açıklama..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '...' : 'Ekle'}
            </button>
          </form>
        </div>

        {/* KATEGORİ LİSTESİ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Kategori Adı</th>
                <th className="p-4 text-sm font-semibold text-gray-600">URL (Slug)</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Yazı Sayısı</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    Henüz hiç kategori eklenmemiş. İlk sen ekle!
                  </td>
                </tr>
              ) : (
                categories.map((cat: any) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="p-4 text-gray-500 text-sm font-mono">{cat.slug}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                        {cat._count?.posts || 0}
                      </span>
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