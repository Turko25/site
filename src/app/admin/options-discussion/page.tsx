'use client';

import { useState } from 'react';

export default function DiscussionOptionsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    defaultArticleSettings: {
      allowNotifications: true,
      allowLinkNotifications: false,
      allowComments: true
    },
    otherCommentSettings: {
      requireNameEmail: true,
      requireLogin: false,
      closeCommentsOldPosts: false,
      threadComments: true,
      threadLevels: 5
    },
    emailMeWhenever: {
      anyonePostsComment: true,
      commentHeldForModeration: true
    },
    beforeCommentAppears: {
      manuallyApprove: true,
      previouslyApproved: true
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Kayıt simülasyonu
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Tartışma Ayarları</h1>
          <p className="text-gray-500 text-sm">Yorum yönetimi ve bildirim tercihlerini yapılandırın.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg shadow-sm">
            ✅ Tartışma ayarları başarıyla kaydedildi.
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-10">
            
            {/* VARSAYILAN YAZI AYARLARI */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Varsayılan Yazı Ayarları</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.defaultArticleSettings.allowComments} onChange={(e) => setSettings({...settings, defaultArticleSettings: {...settings.defaultArticleSettings, allowComments: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Yeni yazılar üzerine yorum yapılmasına izin ver</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.defaultArticleSettings.allowNotifications} onChange={(e) => setSettings({...settings, defaultArticleSettings: {...settings.defaultArticleSettings, allowNotifications: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Yazıda bağlantı verilen diğer bloglardan bildirimleri (geri izlemeler) kabul et</span>
                </label>
              </div>
            </section>

            {/* DİĞER YORUM AYARLARI */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Diğer Yorum Ayarları</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.otherCommentSettings.requireNameEmail} onChange={(e) => setSettings({...settings, otherCommentSettings: {...settings.otherCommentSettings, requireNameEmail: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Yorum yapanlar isim ve e-posta doldurmak zorunda</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.otherCommentSettings.requireLogin} onChange={(e) => setSettings({...settings, otherCommentSettings: {...settings.otherCommentSettings, requireLogin: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Yorum yapmak için kullanıcılar giriş yapmalı</span>
                </label>
              </div>
            </section>

            {/* BANA E-POSTA GÖNDER */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Bana E-posta Gönder</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.emailMeWhenever.anyonePostsComment} onChange={(e) => setSettings({...settings, emailMeWhenever: {...settings.emailMeWhenever, anyonePostsComment: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Birisi yorum yaptığında</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.emailMeWhenever.commentHeldForModeration} onChange={(e) => setSettings({...settings, emailMeWhenever: {...settings.emailMeWhenever, commentHeldForModeration: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Bir yorum onay için bekletildiğinde</span>
                </label>
              </div>
            </section>

            {/* YORUM GÖRÜNMEDEN ÖNCE */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Yorum Görünmeden Önce</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer font-medium text-blue-700">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.beforeCommentAppears.manuallyApprove} onChange={(e) => setSettings({...settings, beforeCommentAppears: {...settings.beforeCommentAppears, manuallyApprove: e.target.checked}})} />
                  <span className="text-sm">Yorum her zaman el ile onaylanmalıdır</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={settings.beforeCommentAppears.previouslyApproved} onChange={(e) => setSettings({...settings, beforeCommentAppears: {...settings.beforeCommentAppears, previouslyApproved: e.target.checked}})} />
                  <span className="text-sm text-gray-700">Yazarın daha önceden onaylanmış bir yorumu olmalı</span>
                </label>
              </div>
            </section>

            <div className="pt-6 border-t flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50 text-sm"
              >
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}