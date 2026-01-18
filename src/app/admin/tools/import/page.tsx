'use client';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border shadow-sm">
        <button onClick={() => router.back()} className="text-sm text-blue-600 mb-4 inline-block">← Geri Dön</button>
        <h1 className="text-2xl font-bold mb-6">İçe Aktar (Import)</h1>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-4">WordPress veya XML dosyanızı buraya sürükleyin</p>
          <input type="file" className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="bg-gray-100 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">Dosya Seç</label>
        </div>
      </div>
    </div>
  );
}