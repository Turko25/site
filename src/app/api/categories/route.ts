import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// KATEGORİLERİ GETİR
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Kategoriler çekilemedi' }, { status: 500 });
  }
}

// YENİ KATEGORİ EKLE
export async function POST(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description } = body;

    // Türkçe karakter uyumlu URL oluşturucu (Slug)
    const slug = name
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const category = await prisma.category.create({
      data: { name, slug, description },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu' }, { status: 500 });
  }
}