'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function NewPageForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags }),
    })

    if (res.ok) {
      alert('Sayfa oluşturuldu! 🎉')
      router.push('/admin/pages')
      router.refresh()
    } else {
      alert('Hata oluştu!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Yeni Sayfa Ekle</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Etiketler</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">İçerik</label>
              <div className="border rounded-lg p-2 min-h-[300px]">
                <Editor data={content ? JSON.parse(content || '{}') : undefined} onChange={(data) => setContent(JSON.stringify(data))} holder="editor-new-page" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-8 py-3 rounded-lg w-full font-bold">
              {loading ? '...' : 'Oluştur'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}