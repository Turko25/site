import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const { type } = await request.json();
    console.log(`[BAŞLADI] İşlem türü: ${type}`);

    if (type === 'img') {
      const uploadDir = path.join(process.cwd(), 'public', 'images');
      
      // 1. Klasör Kontrolü
      if (!fs.existsSync(uploadDir)) {
        console.error(`[HATA] Klasör bulunamadı: ${uploadDir}`);
        return NextResponse.json({ success: false, error: 'public/images klasörü bulunamadı!' });
      }

      const files = fs.readdirSync(uploadDir);
      console.log(`[BİLGİ] Bulunan dosya sayısı: ${files.length}`);

      if (files.length === 0) {
        return NextResponse.json({ success: false, error: 'Klasörde işlenecek resim yok!' });
      }

      let processedCount = 0;

      for (const file of files) {
        const filePath = path.join(uploadDir, file);
        const ext = path.extname(file).toLowerCase();
        
        // Sadece resim dosyalarını seç ve hali hazırda .webp olanları atla
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const newFileName = `${path.parse(file).name}.webp`;
          const newPath = path.join(uploadDir, newFileName);

          console.log(`[İŞLENİYOR] ${file} -> ${newFileName}`);
          
          await sharp(filePath)
            .webp({ quality: 75 })
            .toFile(newPath);
            
          processedCount++;
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `${processedCount} adet resim WebP formatına dönüştürüldü.` 
      });
    }

    return NextResponse.json({ success: false, error: 'Geçersiz işlem türü.' });

  } catch (error: any) {
    console.error(`[SİSTEM HATASI]`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Durumu kontrol etmek için GET metodu (Opsiyonel)
export async function GET() {
  return NextResponse.json({ status: 'API Ready' });
}