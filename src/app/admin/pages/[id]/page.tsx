'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Editörü çağır
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Form Verileri
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  // Sayfa verisini çek (Açılışta)
  useEffect(() => {
    fetch('/api/pages') // Hepsini çekip filtreliyoruz (Basit yöntem)
      .then(res => res.json())
      .then(data => {
        const page = data.find((p: any) => p.id === params.id)
        if (page) {
          setTitle(page.title)
          setContent(page.content) // JSON verisi buraya gelir
          // Etiketleri virgüllü metne çevir
          const tagString = page.tags.map((t: any) => t.name).join(', ')
          setTags(tagString)
        }
        setLoading(false)
      })
  }, [params.id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // PUT işlemiyle güncelle (API'de PUT yoksa POST veya yeni route gerekir, ama biz PUT eklemiştik değil mi?
    // Eğer API route'da PUT yoksa hata verir. 
    // Garanti olsun diye API'ye PUT eklemediysen aşağıdaki fetch hata verir.
    // Önceki adımda API'ye PUT eklememiştik SADECE POST ve DELETE vardı.
    // O yüzden buraya DİKKAT.
    
    // Şimdilik sadece "Uyarı" vereyim, API'ye PUT ekleyince çalışır.
    alert("API güncellemesi gerekiyor! Bir sonraki adımda yapalım.")
    setSaving(false)
  }

  if (loading) return <div className="p-8">Veriler yükleniyor...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Sayfayı Düzenle</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full p-3 border rounded-lg" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Etiketler</label>
              <input 
                value={tags} 
                onChange={e => setTags(e.target.value)} 
                className="w-full p-3 border rounded-lg bg-purple-50" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">İçerik</label>
              <div className="border rounded-lg p-2 min-h-[300px]">
                 {/* Editöre mevcut veriyi (content) yüklüyoruz */}
                 {content && (
                   <Editor 
                     data={JSON.parse(content)} 
                     onChange={(data) => setContent(JSON.stringify(data))} 
                     holder="editorjs-edit-container" 
                   />
                 )}
              </div>
            </div>

            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-8 py-3 rounded-lg w-full font-bold">
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}