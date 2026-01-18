'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState([])
  const [existingPages, setExistingPages] = useState([]) // Senin oluşturduğun sayfalar
  
  // Form Verileri
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [location, setLocation] = useState('HEADER') // HEADER veya FOOTER
  const [order, setOrder] = useState(0)
  const [loading, setLoading] = useState(false)

  // Verileri Çek
  useEffect(() => {
    fetchMenus()
    fetchPages()
  }, [])

  const fetchMenus = () => {
    fetch('/api/menu').then(res => res.json()).then(setMenuItems)
  }

  const fetchPages = () => {
    fetch('/api/pages').then(res => res.json()).then(setExistingPages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url, location, order })
    })

    // Formu temizle ve listeyi yenile
    setTitle('')
    setUrl('')
    setOrder(0)
    fetchMenus()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm('Silmek istediğine emin misin?')) return;
    await fetch(`/api/menu?id=${id}`, { method: 'DELETE' })
    fetchMenus()
  }

  // Sayfa Seçince URL'i Otomatik Doldur
  const handlePageSelect = (e: any) => {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      setUrl(`/${selectedSlug}`) // Otomatik /hakkimizda yapar
      // Seçilen option'ın text'ini başlığa yazmak biraz tricky, şimdilik manuel kalsın
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* SOL: EKLEME FORMU */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Menü Linki Ekle</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 1. SEÇENEK: HAZIR SAYFALARDAN SEÇ */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <label className="block text-xs font-bold text-blue-800 mb-1">Mevcut Sayfalardan Seç</label>
                <select onChange={handlePageSelect} className="w-full p-2 text-sm border rounded bg-white">
                  <option value="">-- Sayfa Seçiniz --</option>
                  {existingPages.map((page: any) => (
                    <option key={page.id} value={page.slug}>{page.title}</option>
                  ))}
                </select>
                <p className="text-xs text-blue-500 mt-1">Seçince URL otomatik dolar.</p>
              </div>

              {/* VEYA MANUEL GİR */}
              <div>
                <label className="block text-sm font-medium mb-1">Link Başlığı</label>
                <input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Örn: İletişim"
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL (Adres)</label>
                <input 
                  value={url} 
                  onChange={e => setUrl(e.target.value)} 
                  placeholder="Örn: /iletisim veya https://google.com"
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Konum</label>
                  <select value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border rounded">
                    <option value="HEADER">Üst Menü</option>
                    <option value="FOOTER">Alt Menü</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sıra</label>
                  <input 
                    type="number" 
                    value={order} 
                    onChange={e => setOrder(Number(e.target.value))} 
                    className="w-full p-2 border rounded" 
                  />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black font-bold">
                {loading ? 'Ekleniyor...' : 'Menüye Ekle +'}
              </button>
            </form>
             <div className="mt-4 pt-4 border-t">
               <Link href="/admin/dashboard" className="text-gray-500 text-sm hover:underline">← Panele Dön</Link>
             </div>
          </div>
        </div>

        {/* SAĞ: LİSTE */}
        <div className="md:col-span-2 space-y-6">
          
          {/* ÜST MENÜLER */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-blue-600 border-b pb-2">HEADER (Üst) Menü</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Sıra</th>
                  <th className="pb-2">Başlık</th>
                  <th className="pb-2">URL</th>
                  <th className="pb-2 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.filter((m: any) => m.location === 'HEADER').map((item: any) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-3 font-mono text-gray-500">{item.order}</td>
                    <td className="py-3 font-bold">{item.title}</td>
                    <td className="py-3 text-gray-500">{item.url}</td>
                    <td className="py-3 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-bold">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ALT MENÜLER */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-600 border-b pb-2">FOOTER (Alt) Menü</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Sıra</th>
                  <th className="pb-2">Başlık</th>
                  <th className="pb-2">URL</th>
                  <th className="pb-2 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.filter((m: any) => m.location === 'FOOTER').map((item: any) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-3 font-mono text-gray-500">{item.order}</td>
                    <td className="py-3 font-bold">{item.title}</td>
                    <td className="py-3 text-gray-500">{item.url}</td>
                    <td className="py-3 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-bold">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}