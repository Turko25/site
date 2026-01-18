'use client';
import GutenbergEditor from '@/components/editor/GutenbergEditor';

export default function NewPostPage() {
  return <GutenbergEditor />;
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Editörü dinamik import ediyoruz (SSR hatası almamak için)
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function NewPostPage() {
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  // İçerik artık JSON formatında bir String olacak
  const [content, setContent] = useState('') 
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        if (data.length > 0) setCategoryId(data[0].id)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content, // JSON string olarak gidiyor
        categoryId,
        tags
      }),
    })

    if (res.ok) {
      alert('Yazı başarıyla yayınlandı! 🎉')
      router.push('/admin/posts')
      router.refresh()
    } else {
      alert('Bir hata oluştu!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Yeni Makale Yaz (Blok Editör)</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* BAŞLIK */}
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            {/* KATEGORİ & ETİKET (Aynı kalacak, burayı kısalttım) */}
            {/* ... Buradaki kodların aynı ... */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>


            {/* --- YENİ EDİTÖR --- */}
            <div>
              <label className="block text-sm font-medium mb-1">İçerik</label>
              <div className="border rounded-lg p-2">
                <Editor 
                  data={content ? JSON.parse(content || '{}') : undefined} 
                  onChange={(data) => setContent(JSON.stringify(data))} 
                  holder="editorjs-container" 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg w-full"
            >
              {loading ? '...' : 'Yayınla'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}