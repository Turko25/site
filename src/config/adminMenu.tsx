import React from 'react';

// DASHICONS SVG PATHS (Birebir WP İkonları)
export const Dashicons = {
  Dashboard: <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-1.8 0c0 1.9-.8 3.6-2.1 4.9l-4.1-8.2V5c2.3.6 4.1 2.5 4.9 4.9.8.7 1.3 1.3 1.3 2.1zm-8 6.2c-2.3-.6-4.1-2.5-4.9-4.9-.1-.2-.1-.5-.1-.7s0-.5.1-.7l4.1 8.2c-.3-.2-.5-.4-.7-.6l1.5-1.3zm1.6-1.7l1.3-1.4 2.8 5.6c-.3.2-.5.4-.7.6l-3.4-4.8z" />,
  Posts: <path d="M11.9 4.8l-7.7 7.7h1.4l5.3-5.3 5.3 5.3h1.4l-5.7-7.7zM4.1 14.4l7.8-1.5 7.8 1.5-7.8 8.1-7.8-8.1z" />,
  Media: <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm2.6 13.4l-3-3.6-1.5 2.1L8.5 14l-2.4 3h8.5zM15 9c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />,
  Pages: <path d="M7 3v18h10V3H7zm3 2h4v10h-4V5z" />,
  Comments: <path d="M16 2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h8l4 4v-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />,
  Appearance: <path d="M18.8 3.8l-1.6-1.6c-.4-.4-1-.4-1.4 0l-5.2 5.2c-1.6-.7-3.4-.6-4.9.4-.3.2-.6.4-.8.7l4.6 4.6-4.6 4.6-.9 2.2c-.2.4.2.8.6.6l2.2-.9 4.6-4.6 4.6 4.6c.3-.2.5-.5.7-.8 1-1.5 1.1-3.3.4-4.9l5.2-5.2c.4-.4.4-1 0-1.4zM5.5 17l1.5-1.5-2.2-2.2-1.5 1.5 2.2 2.2z" />,
  Plugins: <path d="M14.5 12.5l.4 2.6-3.8 2.5-2.9-1.7-2.9 1.7-3.8-2.5.4-2.6-2.5-2.8 1.5-2.2 3.3.4 2.4-3.6h2.8l2.4 3.6 3.3-.4 1.5 2.2-2.5 2.8z" />,
  Users: <path d="M11 11c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-3.9 0-9 2-9 6v2h18v-2c0-4-5.1-6-9-6z" />,
  Tools: <path d="M18.6 2.4l-2.7 2.7 2 2 2.7-2.7c.6-.6.6-1.6 0-2.2-.6-.6-1.5-.6-2 .2zM15.4 9.1l-1 1 2.3 2.3 1-1-2.3-2.3zM18.9 14l-5.6-5.6-4.2 4.2c-.8.8-1.7 1.2-2.8 1.2l-2.3 2.4 2.4 2.3.1.1c.3.3.7.4 1.2.4 1.1 0 2-.9 2.8-1.7l4.2-4.2 4.2 1.9V14zM4.1 6.8l3.1-3 2.8 2.8-3 3-2.9-2.8z" />,
  Settings: <path d="M19.1 10.3l-2.3-.5c-.3-1.1-.8-2.2-1.5-3.1l1.5-1.8-2.1-2.1-1.8 1.5c-1-.7-2-1.2-3.1-1.5l-.5-2.3H8.7l-.5 2.3c-1.1.3-2.2.8-3.1 1.5L3.3 2.8 1.2 4.9l1.5 1.8c-.7 1-1.2 2-1.5 3.1l-2.3.5v3l2.3.5c.3 1.1.8 2.2 1.5 3.1l-1.5 1.8 2.1 2.1 1.8-1.5c1 .7 2 1.2 3.1 1.5l.5 2.3h3l.5-2.3c1.1-.3 2.2-.8 3.1-1.5l1.8 1.5 2.1-2.1-1.5-1.8c.7-1 1.2-2 1.5-3.1l2.3-.5v-3zM12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />,
  Collapse: <path d="M12 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-1.8 0c0 1.9-.8 3.6-2.1 4.9l-4.1-8.2V5c2.3.6 4.1 2.5 4.9 4.9.8.7 1.3 1.3 1.3 2.1zm-8 6.2c-2.3-.6-4.1-2.5-4.9-4.9-.1-.2-.1-.5-.1-.7s0-.5.1-.7l4.1 8.2c-.3-.2-.5-.4-.7-.6l1.5-1.3zm1.6-1.7l1.3-1.4 2.8 5.6c-.3.2-.5-.4-.7-.6l-3.4-4.8z" />
};

export interface WPMenuItem {
  id: string;
  title: string;
  path: string;
  icon?: JSX.Element;
  separator?: boolean;
  submenu?: { title: string; path: string }[];
}

// WORDPRESS 6.x DEFAULT MENU STRUCTURE
export const adminMenu: WPMenuItem[] = [
  // 1. DASHBOARD
  {
    id: 'dashboard',
    title: 'Başlangıç',
    path: '/admin/dashboard',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Dashboard}</svg>,
    submenu: [
      { title: 'Ana Sayfa', path: '/admin/dashboard' },
      { title: 'Güncellemeler', path: '/admin/update-core' }
    ]
  },
  
  { id: 'sep1', title: '', path: '', separator: true }, // Ayıraç

  // 2. POSTS (YAZILAR)
  {
    id: 'posts',
    title: 'Yazılar',
    path: '/admin/posts', // edit.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Posts}</svg>,
    submenu: [
      { title: 'Tüm Yazılar', path: '/admin/posts' },
      { title: 'Yeni Ekle', path: '/admin/posts/new' },
      { title: 'Kategoriler', path: '/admin/posts/categories' },
      { title: 'Etiketler', path: '/admin/posts/tags' }
    ]
  },

  // 3. MEDIA (ORTAM)
  {
    id: 'media',
    title: 'Ortam',
    path: '/admin/media', // upload.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Media}</svg>,
    submenu: [
      { title: 'Kütüphane', path: '/admin/media' },
      { title: 'Yeni Ekle', path: '/admin/media/new' }
    ]
  },

  // 4. PAGES (SAYFALAR)
  {
    id: 'pages',
    title: 'Sayfalar',
    path: '/admin/pages', // edit.php?post_type=page
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Pages}</svg>,
    submenu: [
      { title: 'Tüm Sayfalar', path: '/admin/pages' },
      { title: 'Yeni Ekle', path: '/admin/pages/new' }
    ]
  },

  // 5. COMMENTS (YORUMLAR)
  {
    id: 'comments',
    title: 'Yorumlar',
    path: '/admin/comments', // edit-comments.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Comments}</svg>,
    // Yorumların alt menüsü yoktur ama tıklandığında menü açık görünür
    submenu: []
  },

  { id: 'sep2', title: '', path: '', separator: true }, // Ayıraç

  // 6. APPEARANCE (GÖRÜNÜM)
  {
    id: 'appearance',
    title: 'Görünüm',
    path: '/admin/themes', // themes.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Appearance}</svg>,
    submenu: [
      { title: 'Temalar', path: '/admin/themes' },
      // Editor veya Customize (Site yapısına göre değişir, biz klasik WP yapıyoruz)
      { title: 'Özelleştir', path: '/admin/customize' },
      { title: 'Bileşenler', path: '/admin/widgets' },
      { title: 'Menüler', path: '/admin/nav-menus' },
      { title: 'Tema Dosya Düzenleyici', path: '/admin/theme-editor' }
    ]
  },

  // 7. PLUGINS (EKLENTİLER)
  {
    id: 'plugins',
    title: 'Eklentiler',
    path: '/admin/plugins', // plugins.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Plugins}</svg>,
    submenu: [
      { title: 'Yüklü Eklentiler', path: '/admin/plugins' },
      { title: 'Yeni Ekle', path: '/admin/plugins/install' },
      { title: 'Eklenti Dosya Düzenleyici', path: '/admin/plugin-editor' }
    ]
  },

  // 8. USERS (KULLANICILAR)
  {
    id: 'users',
    title: 'Kullanıcılar',
    path: '/admin/users', // users.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Users}</svg>,
    submenu: [
      { title: 'Tüm Kullanıcılar', path: '/admin/users' },
      { title: 'Yeni Ekle', path: '/admin/users/new' },
      { title: 'Profil', path: '/admin/profile' }
    ]
  },

  // 9. TOOLS (ARAÇLAR)
  {
    id: 'tools',
    title: 'Araçlar',
    path: '/admin/tools', // tools.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Tools}</svg>,
    submenu: [
      { title: 'Kullanılabilir Araçlar', path: '/admin/tools' },
      { title: 'İçe Aktar', path: '/admin/import' },
      { title: 'Dışa Aktar', path: '/admin/export' },
      { title: 'Site Sağlığı', path: '/admin/site-health' },
      { title: 'Kişisel Verileri Dışa Aktar', path: '/admin/export-personal-data' },
      { title: 'Kişisel Verileri Sil', path: '/admin/erase-personal-data' }
    ]
  },

  // 10. SETTINGS (AYARLAR)
  {
    id: 'settings',
    title: 'Ayarlar',
    path: '/admin/options-general', // options-general.php
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Settings}</svg>,
    submenu: [
      { title: 'Genel', path: '/admin/options-general' },
      { title: 'Yazma', path: '/admin/options-writing' },
      { title: 'Okuma', path: '/admin/options-reading' },
      { title: 'Tartışma', path: '/admin/options-discussion' },
      { title: 'Ortam', path: '/admin/options-media' },
      { title: 'Kalıcı Bağlantılar', path: '/admin/options-permalink' },
      { title: 'Gizlilik', path: '/admin/options-privacy' }
    ]
  },
  
  { id: 'sep3', title: '', path: '', separator: true }, // Ayıraç
  
  // Menü Daralt (Collapse)
  {
    id: 'collapse',
    title: 'Menüyü daralt',
    path: '#',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{Dashicons.Collapse}</svg>,
    submenu: []
  }
];