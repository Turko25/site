const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Tohumlama Başlıyor...')
  
  // Şifreyi kriptola
  const password = await hash('123456', 12)
  
  // Kullanıcıyı oluştur
  const user = await prisma.user.upsert({
    where: { email: 'admin@tss.net.tr' },
    update: {},
    create: {
      email: 'admin@tss.net.tr',
      name: 'Süper Admin',
      password,
    },
  })
  
  console.log('✅ Admin Kullanıcısı Başarıyla Oluşturuldu:', user.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ HATA:', e)
    await prisma.$disconnect()
    process.exit(1)
  })