import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// GET: Hepsini Getir
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { category: true, tags: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(posts);
}

// POST: Yeni Ekle
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const body = await req.json();
  const { title, content, categoryId, tags } = body;

  const slug = title.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  // Etiket Mantığı
  let tagsConnect = [];
  if (tags && tags.length > 0) {
    const tagList = tags.split(',').map((t: string) => t.trim());
    tagsConnect = tagList.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag, slug: tag.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') }
    }));
  }

  const post = await prisma.post.create({
    data: {
      title, content, slug, categoryId, published: true,
      tags: { connectOrCreate: tagsConnect }
    },
  });
  return NextResponse.json(post);
}

// PUT: Güncelle (YENİ)
export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const body = await req.json();
  const { id, title, content, categoryId, tags } = body;

  // Etiketleri sıfırla ve yeniden bağla
  // (Basitlik için önce hepsini koparıp sonra yenileri ekliyoruz ama Prisma'da set ile de yapılır)
  // Burada basit update yapalım:
  
  const post = await prisma.post.update({
    where: { id },
    data: { title, content, categoryId }
  });

  return NextResponse.json(post);
}

// DELETE: Sil (YENİ)
export async function DELETE(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}