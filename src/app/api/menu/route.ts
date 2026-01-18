import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Menüleri Getir (Sıralı)
export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: { order: 'asc' } // Sıraya göre getir
  });
  return NextResponse.json(items);
}

// POST: Yeni Menü Elemanı Ekle
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, url, location, order } = body;

    const item = await prisma.menuItem.create({
      data: { title, url, location, order: Number(order) }
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Ekleme hatası' }, { status: 500 });
  }
}

// DELETE: Sil
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID yok' }, { status: 400 });

  await prisma.menuItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}