import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

// Verileri sunucuda çekiyoruz
// GÜNCELLEME: include kısmına 'tags: true' ekledik.
async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { 
      category: true,
      tags: true 
    }, 
    orderBy: { createdAt: 'desc' },
  })
  return posts
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ÜST MENÜ (Header) */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            TSS<span className="text-gray-800">.net.tr</span>
          </Link>
          <div className="space-x-4">
            <Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 transition">Hakkımızda</Link>
            <Link href="/admin/dashboard" className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
              Admin Girişi
            </Link>
          </div>
        </div>
      </header>

      {/* HERO ALANI */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tamamlayıcı Sağlık Sigortası Rehberi</h1>
          <p className="text-xl text-blue-100 mb-8">
            Sağlığınız için en doğru bilgileri uzman kaleminden okuyun.
          </p>
        </div>
      </section>

      {/* BLOG LİSTESİ */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Son Eklenen Yazılar</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">Henüz hiç içerik eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Kategori ve Tarih */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {post.category?.name || 'Genel'}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  
                  {/* Başlık */}
                  <Link href={`/yazi/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {/* Özet Metin */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {post.content}
                  </p>

                  {/* ETİKETLER (YENİ EKLENDİ) */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag.id} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200">
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Devamını Oku Linki */}
                  <Link 
                    href={`/yazi/${post.slug}`} 
                    className="text-blue-600 font-medium text-sm hover:underline inline-flex items-center gap-1 mt-auto"
                  >
                    Devamını Oku →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; 2026 TSS.net.tr - Tüm Hakları Saklıdır.
        </div>
      </footer>
    </div>
  )
}