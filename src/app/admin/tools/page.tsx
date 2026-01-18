'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ToolsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('available');

  const tools = [
    {
      id: 'import',
      title: 'İçe Aktar',
      description: 'Diğer sistemlerden (WordPress, Blogger vb.) içeriklerinizi bu siteye taşıyın.',
      icon: '📥',
      path: '/admin/tools/import'
    },
    {
      id: 'export',
      title: 'Dışa Aktar',
      description: 'Yazılarınızı, sayfalarınızı ve ortam kütüphanenizi yedeklemek için bir XML dosyası oluşturun.',
      icon: '📤',
      path: '/admin/tools/export'
    },
    {
      id: 'site-health',
      title: 'Site Sağlığı',
      description: 'Sitenizin yapılandırması ve iyileştirilmesi gereken öğeler hakkında bilgi alın.',
      icon: '🏥',
      path: '/admin/tools/site-health'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Araçlar</h1>
          <p className="text-gray-500 text-sm">Sistem yönetimi ve veri transferi için yardımcı araçlar.</p>
        </div>

        {/* Tab Menü */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            onClick={() => setActiveTab('available')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'available' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Kullanılabilir Araçlar
          </button>
          <button 
            onClick={() => setActiveTab('export-data')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'export-data' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Verileri Dışa Aktar
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">{tool.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {tool.description}
                </p>
                <button 
                  onClick={() => router.push(tool.path)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Aracı Kullan <span>→</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'export-data' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Hızlı Dışa Aktar</h2>
            <p className="text-gray-600 mb-6 italic text-sm">Tüm verilerinizi JSON formatında tek tıkla yedekleyin.</p>
            <button 
              onClick={() => alert('Veri hazırlama başlatıldı...')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Yedeği İndir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}