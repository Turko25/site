import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getMenuItems() {
  // Sadece HEADER olanları çekiyoruz
  return await prisma.menuItem.findMany({
    where: { location: 'HEADER' },
    orderBy: { order: 'asc' }
  })
}

export default async function Header() {
  const menuItems = await getMenuItems()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          TSS<span className="text-gray-800">.net.tr</span>
        </Link>

        {/* MENÜ (Admin panelinden gelenler) */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.url} 
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* MOBİL MENÜ BUTONU (Basit Çizgili) */}
        <div className="md:hidden text-gray-500">
           ☰
        </div>
      </div>
    </header>
  )
}