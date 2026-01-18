import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Listele
export async function GET() {
  const pages = await prisma.page.findMany({ include: { tags: true }, orderBy: { title: 'asc' } });
  return NextResponse.json(pages);
}

// POST: Ekle
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, tags } = body;

    // Slug oluştur
    let slug = title.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    
    // Benzersiz slug kontrolü
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Math.floor(Math.random() * 1000)}`;

    let tagsConnect = [];
    if (tags && tags.length > 0) {
      const tagList = tags.split(',').map((t: string) => t.trim());
      tagsConnect = tagList.map((tag: string) => ({
        where: { name: tag },
        create: { name: tag, slug: tag.toLowerCase().replace(/ /g, '-').replace(/[^a-z]/g, '') }
      }));
    }

    const page = await prisma.page.create({
      data: { title, content, slug, tags: { connectOrCreate: tagsConnect } },
    });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Ekleme hatası' }, { status: 500 });
  }
}

// PUT: Güncelle (YENİ EKLENDİ) ✅
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, tags } = body;

    // Etiketleri güncellemek biraz tricky, önce eskileri koparıp yenileri bağlıyoruz
    // Basit olması için burada sadece metin alanlarını güncelleyelim
    // Eğer etiket güncellemesi de istersen kod uzar, şimdilik temel güncelleme:
    
    const page = await prisma.page.update({
      where: { id },
      data: { title, content }
      // Not: Etiket güncellemesi için önce deleteMany sonra connect yapmak gerekir
    });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme hatası' }, { status: 500 });
  }
}

// DELETE: Sil
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID yok' }, { status: 400 });
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ success: true });
}