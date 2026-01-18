'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Editörü dinamik import ediyoruz (SSR hatası almamak için)
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function PluginsPage() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      })
      .catch(err => console.error("Kategoriler yüklenemedi:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        categoryId,
        tags
      }),
    });

    if (res.ok) {
      alert('İşlem başarıyla tamamlandı! 🎉');
      router.push('/admin/posts');
      router.refresh();
    } else {
      alert('Bir hata oluştu!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">İçerik Yönetimi</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Etiketler</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">İçerik</label>
              <div className="border rounded-lg p-2 min-h-[300px]">
                <Editor 
                  data={content ? JSON.parse(content) : undefined} 
                  onChange={(data) => setContent(JSON.stringify(data))} 
                  holder="editorjs-plugins-container" 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'İşleniyor...' : 'Kaydet'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}