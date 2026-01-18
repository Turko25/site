import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getMenuItems() {
  // Sadece FOOTER olanları çekiyoruz
  return await prisma.menuItem.findMany({
    where: { location: 'FOOTER' },
    orderBy: { order: 'asc' }
  })
}

export default async function Footer() {
  const menuItems = await getMenuItems()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* 1. KISIM: LOGO & BİLGİ */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">TSS.net.tr</h3>
          <p className="text-gray-400 text-sm">
            Türkiye'nin en kapsamlı tamamlayıcı sağlık sigortası rehberi.
          </p>
        </div>

        {/* 2. KISIM: HIZLI LİNKLER (Admin'den Gelenler) */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-2">Hızlı Erişim</h4>
          {menuItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.url} 
              className="hover:text-white transition"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* 3. KISIM: İLETİŞİM */}
        <div>
          <h4 className="text-white font-semibold mb-2">İletişim</h4>
          <p className="text-sm">info@tss.net.tr</p>
          <p className="text-sm">+90 850 123 45 67</p>
        </div>

      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
        &copy; 2026 TSS.net.tr - Tüm Hakları Saklıdır.
      </div>
    </footer>
  )
}