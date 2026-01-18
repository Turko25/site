const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Şifre sıfırlanıyor...')
  
  // 123456 şifresini yeniden kriptoluyoruz
  const yeniSifre = await hash('123456', 12)
  
  try {
    const user = await prisma.user.update({
      where: { email: 'admin@tss.net.tr' },
      data: {
        password: yeniSifre
      }
    })
    console.log('✅ BAŞARILI! Şifre güncellendi.')
    console.log('📧 Email: admin@tss.net.tr')
    console.log('🔑 Yeni Şifre: 123456')
  } catch (error) {
    console.error('❌ HATA: Kullanıcı bulunamadı!', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()