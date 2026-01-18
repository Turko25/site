import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

// GÜNCELLEME: tags: true ekleyerek etiketleri de çekiyoruz
async function getPost(slug: string) {
  const post = await prisma.post.findFirst({
    where: { slug: slug, published: true },
    include: { 
      category: true, 
      tags: true 
    },
  })
  
  if (!post) return null
  return post
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <header className="bg-white shadow-sm mb-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-blue-600 hover:text-blue-700">
            ← Ana Sayfaya Dön
          </Link>
          <span className="text-gray-400 text-sm">TSS Blog</span>
        </div>
      </header>

      {/* MAKALE İÇERİĞİ */}
      <article className="max-w-3xl mx-auto px-4">
        
        {/* Üst Bilgi Alanı */}
        <div className="mb-8 text-center">
          <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
            {post.category?.name || 'Genel'}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* ETİKET LİSTESİ (YENİ EKLENDİ) */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag.id} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} tarihinde yayınlandı.
          </div>
        </div>

        {/* Görsel Alanı (Placeholder) */}
        <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-10 shadow-lg flex items-center justify-center">
          <span className="text-white opacity-30 text-4xl font-bold">TSS.net.tr</span>
        </div>

	{/* İÇERİK RENDER (JSON KONTROLÜ) */}
<div className="prose prose-lg max-w-none text-gray-700 leading-relaxed bg-white p-8 rounded-xl shadow-sm">
  {post.content.startsWith('{') ? (
    // Eğer içerik JSON ise (Yeni editörle yazılmışsa)
    JSON.parse(post.content).blocks.map((block: any, index: number) => (
      <div key={index}>{renderBlock(block)}</div>
    ))
  ) : (
    // Eğer eski usül düz yazı ise
    <p className="whitespace-pre-wrap">{post.content}</p>
  )}
</div>
      </article>

      {/* CTA / Teklif Alanı */}
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Sigorta teklifi almak ister misiniz?</h3>
          <p className="text-blue-700 mb-4">Size en uygun tamamlayıcı sağlık sigortasını bulalım.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Hemen Teklif Al
          </button>
        </div>
      </div>
    </div>
  )
}
// JSON bloklarını HTML'e çeviren basit fonksiyon
const renderBlock = (block: any) => {
  switch (block.type) {
    case 'header':
      const Level = `h${block.data.level}` as keyof JSX.IntrinsicElements;
      return <Level className="font-bold text-2xl my-4">{block.data.text}</Level>;
    case 'paragraph':
      return <p className="mb-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
    case 'list':
      if (block.data.style === 'ordered') {
        return <ol className="list-decimal pl-5 mb-4">{block.data.items.map((item: string, i: number) => <li key={i}>{item}</li>)}</ol>;
      }
      return <ul className="list-disc pl-5 mb-4">{block.data.items.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>;
    default:
      return null;
  }
}