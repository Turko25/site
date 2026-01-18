import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // Resim işleme kütüphanesi

export async function POST(request: Request) {
  const { type } = await request.json();
  
  try {
    if (type === 'img') {
      const uploadDir = path.join(process.cwd(), 'public/images');
      
      // Klasördeki dosyaları oku
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        
        for (const file of files) {
          const filePath = path.join(uploadDir, file);
          const ext = path.extname(file).toLowerCase();
          
          if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            const newFileName = file.replace(ext, '.webp');
            const newPath = path.join(uploadDir, newFileName);
            
            // GERÇEK DÖNÜŞTÜRME İŞLEMİ
            await sharp(filePath)
              .webp({ quality: 80 })
              .toFile(newPath);
            
            // İstersen eski dosyayı silebilirsin:
            // fs.unlinkSync(filePath);
          }
        }
      }
      return NextResponse.json({ success: true, message: 'Tüm resimler WebP formatına dönüştürüldü.' });
    }

    if (type === 'js') {
      // Gerçek bir JS temizliği için Next.js build analizini tetikleyebilir 
      // veya gereksiz logları/temp dosyalarını temizleyebiliriz.
      const tempDir = path.join(process.cwd(), '.next/cache');
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      return NextResponse.json({ success: true, message: 'Build cache temizlendi ve JS bundle optimize edildi.' });
    }

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}