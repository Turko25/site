'use client';

import { useState } from 'react';

export default function RealHealthPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState({ img: 'pending', js: 'pending' });
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const startFix = async (type: string) => {
    setIsProcessing(true);
    addLog(`${type === 'img' ? 'Resimler' : 'JavaScript'} taranıyor...`);

    const res = await fetch('/api/admin/health-fix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });

    const result = await res.json();

    if (result.success) {
      addLog(`BAŞARILI: ${result.message}`);
      setStatus(prev => ({ ...prev, [type]: 'fixed' }));
    } else {
      addLog(`HATA: ${result.error}`);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2 italic tracking-tighter">SİSTEM ANALİZİ VE ONARIM</h1>
        <p className="text-gray-400 mb-10">Sistem dosyaları doğrudan manipüle edilerek hatalar giderilir.</p>

        <div className="grid gap-6">
          {/* RESİM KONTROLÜ */}
          <div className={`p-6 rounded-2xl border-2 transition ${status.img === 'fixed' ? 'border-green-500 bg-green-50' : 'border-gray-100'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Görsel Varlık Optimizasyonu</h3>
                <p className="text-sm text-gray-500">public/images altındaki tüm dosyalar taranır ve WebP'ye çevrilir.</p>
              </div>
              <button 
                disabled={isProcessing || status.img === 'fixed'}
                onClick={() => startFix('img')}
                className="bg-black text-white px-6 py-2 rounded-full font-bold disabled:bg-gray-200"
              >
                {status.img === 'fixed' ? 'ONARILDI' : 'DOSYALARI DÖNÜŞTÜR'}
              </button>
            </div>
          </div>

          {/* JS KONTROLÜ */}
          <div className={`p-6 rounded-2xl border-2 transition ${status.js === 'fixed' ? 'border-green-500 bg-green-50' : 'border-gray-100'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Bundle ve Önbellek Temizliği</h3>
                <p className="text-sm text-gray-500">Next.js gereksiz build cache dosyalarını temizler.</p>
              </div>
              <button 
                disabled={isProcessing || status.js === 'fixed'}
                onClick={() => startFix('js')}
                className="bg-black text-white px-6 py-2 rounded-full font-bold disabled:bg-gray-200"
              >
                {status.js === 'fixed' ? 'TEMİZLENDİ' : 'CACHE SİL'}
              </button>
            </div>
          </div>
        </div>

        {/* CANLI TERMİNAL */}
        <div className="mt-10 bg-black rounded-3xl p-8 shadow-2xl overflow-hidden border-4 border-gray-800">
          <div className="flex gap-2 mb-4 border-b border-gray-800 pb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 text-[10px] font-mono ml-4 uppercase tracking-widest font-bold">System Core Logs</span>
          </div>
          <div className="h-64 overflow-y-auto font-mono text-xs text-green-400 space-y-2">
            {logs.length === 0 && <p className="text-gray-700 italic">Sistem analizi için bir işlem başlatın...</p>}
            {logs.map((log, i) => (
              <p key={i} className="animate-in slide-in-from-left duration-300">
                <span className="text-gray-500 mr-2">{'>'}</span> {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}