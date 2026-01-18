import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f0f0f1]">
      {/* ÜST BAR (Sabit 32px) */}
      <AdminNavbar />

      {/* SOL MENÜ (Sabit 160px) */}
      <AdminSidebar />

      {/* İÇERİK ALANI (WordPress Standart Boşlukları) */}
      <main className="pl-[160px] pt-[32px] min-h-screen">
        <div className="p-[20px]">
          {children}
        </div>
      </main>
    </div>
  );
}