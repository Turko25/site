'use client';

export default function DashboardPage() {
  return (
    <div className="wrap">
      <h1 className="text-2xl font-normal text-[#1d2327] mb-5 inline-block">Başlangıç</h1>
      
      {/* WELCOME PANEL */}
      <div className="bg-white border border-[#c3c4c7] p-6 mb-5 relative">
        <h2 className="text-2xl font-normal text-[#1d2327] mb-2">WordPress Sitenize Hoş Geldiniz!</h2>
        <p className="text-[16px] text-[#50575e] mb-5">Başlamanıza yardımcı olacak bazı bağlantıları aşağıda bulabilirsiniz:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[14px] font-semibold text-[#1d2327] mb-3">Başlarken</h3>
            <button className="bg-[#2271b1] text-white px-4 py-2 rounded-[3px] text-[13px] font-medium hover:bg-[#135e96] mb-4">
              Sitenizi özelleştirin
            </button>
            <p className="text-[13px] text-[#50575e]">veya <a href="#" className="text-[#2271b1]">temanızı tamamen değiştirin</a></p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#1d2327] mb-3">Sonraki adımlar</h3>
            <ul className="space-y-2 text-[13px]">
              <li><span className="dashicons dashicons-plus"></span> <a href="/admin/posts/new" className="text-[#2271b1] hover:underline">İlk yazınızı yazın</a></li>
              <li><span className="dashicons dashicons-plus"></span> <a href="/admin/pages/new" className="text-[#2271b1] hover:underline">Bir sayfa ekleyin</a></li>
              <li><span className="dashicons dashicons-visibility"></span> <a href="/" className="text-[#2271b1] hover:underline">Sitenizi görüntüleyin</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#1d2327] mb-3">Daha fazla işlem</h3>
            <ul className="space-y-2 text-[13px]">
              <li><span className="dashicons dashicons-admin-widgets"></span> <a href="#" className="text-[#2271b1] hover:underline">Bileşenleri yönetin</a></li>
              <li><span className="dashicons dashicons-admin-menus"></span> <a href="#" className="text-[#2271b1] hover:underline">Menüleri yönetin</a></li>
              <li><span className="dashicons dashicons-admin-comments"></span> <a href="#" className="text-[#2271b1] hover:underline">Yorumları açın veya kapatın</a></li>
              <li><span className="dashicons dashicons-book"></span> <a href="#" className="text-[#2271b1] hover:underline">Başlangıç rehberi hakkında bilgi edinin</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* DASHBOARD WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* BİR BAKIŞTA */}
        <div className="bg-white border border-[#c3c4c7]">
          <div className="px-3 py-2 border-b border-[#c3c4c7] bg-white font-semibold text-[14px] flex justify-between">
            <span>Bir Bakışta</span>
            <button className="text-[#2271b1] text-xs">▲</button>
          </div>
          <div className="p-3">
            <ul className="space-y-1 text-[#50575e] text-[13px] mb-4">
              <li className="flex items-center gap-1"><a href="#" className="text-[#2271b1]">1 Yazı</a></li>
              <li className="flex items-center gap-1"><a href="#" className="text-[#2271b1]">1 Sayfa</a></li>
              <li className="flex items-center gap-1"><a href="#" className="text-[#2271b1]">1 Yorum</a></li>
            </ul>
            <p className="text-[13px] text-[#50575e]">WordPress 6.4.2 ile <a href="#" className="text-[#2271b1]">Twenty Twenty-Four</a> temasını kullanıyorsunuz.</p>
          </div>
        </div>

        {/* HIZLI TASLAK */}
        <div className="bg-white border border-[#c3c4c7]">
          <div className="px-3 py-2 border-b border-[#c3c4c7] bg-white font-semibold text-[14px]">
            <span>Hızlı Taslak</span>
          </div>
          <div className="p-3">
            <input type="text" placeholder="Başlık" className="w-full border border-[#8c8f94] p-1.5 mb-3 text-[14px] rounded-[3px] focus:border-[#2271b1] outline-none" />
            <textarea placeholder="Aklınızda ne var?" className="w-full border border-[#8c8f94] p-1.5 mb-3 text-[14px] h-24 rounded-[3px] focus:border-[#2271b1] outline-none"></textarea>
            <button className="bg-[#f0f0f1] border border-[#2271b1] text-[#2271b1] px-3 py-1 text-[13px] rounded-[3px] hover:bg-[#f6f7f7]">Taslak Kaydet</button>
          </div>
        </div>

        {/* ETKİNLİK */}
        <div className="bg-white border border-[#c3c4c7]">
          <div className="px-3 py-2 border-b border-[#c3c4c7] bg-white font-semibold text-[14px]">
            <span>Etkinlik</span>
          </div>
          <div className="p-3">
            <p className="text-[13px] text-[#50575e] mb-2 font-semibold">Son yayımlananlar</p>
            <ul className="text-[13px] space-y-2 mb-4">
              <li>
                <span className="text-[#646970]">Bugün, 10:45</span> <a href="#" className="text-[#2271b1]">Merhaba Dünya!</a>
              </li>
            </ul>
            <p className="text-[13px] text-[#50575e] mb-2 font-semibold">Son yorumlar</p>
            <div className="flex gap-3 text-[13px]">
               <div className="w-10 h-10 bg-gray-200"></div>
               <div>
                  <p className="mb-1"><a href="#" className="text-[#2271b1]">WordPress yorumcusu</a> - <a href="#" className="text-[#2271b1]">"Merhaba Dünya!"</a></p>
                  <p className="text-[#50575e]">Hi, this is a comment. To get started with moderating, editing, and deleting comments, please visit...</p>
               </div>
            </div>
          </div>
        </div>

         {/* WP HABERLERİ */}
         <div className="bg-white border border-[#c3c4c7]">
          <div className="px-3 py-2 border-b border-[#c3c4c7] bg-white font-semibold text-[14px]">
            <span>WordPress Etkinlikleri ve Haberleri</span>
          </div>
          <div className="p-3 text-[13px] text-[#50575e]">
            <p>Yakınınızdaki etkinlikler.</p>
            <p className="mt-2 text-[#646970]">Henüz etkinlik yok.</p>
          </div>
        </div>

      </div>
    </div>
  );
}