import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Bu API, yapılan düzeltmeleri bir JSON dosyasına kaydedecek
export async function POST(request: Request) {
  const { type } = await request.json();
  const filePath = path.join(process.cwd(), 'src/data/site-settings.json');
  
  // Klasör yoksa oluştur
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  let settings = { imgOptimized: false, jsOptimized: false };
  if (fs.existsSync(filePath)) {
    settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  if (type === 'img') settings.imgOptimized = true;
  if (type === 'js') settings.jsOptimized = true;

  fs.writeFileSync(filePath, JSON.stringify(settings));

  return NextResponse.json({ success: true, settings });
}

// Kayıtlı ayarları okuma
export async function GET() {
  const filePath = path.join(process.cwd(), 'src/data/site-settings.json');
  if (fs.existsSync(filePath)) {
    return NextResponse.json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  }
  return NextResponse.json({ imgOptimized: false, jsOptimized: false });
}