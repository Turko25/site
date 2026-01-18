'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminMenu } from '@/config/adminMenu'; // Config'i import et

export default function AdminSidebar() {
  const pathname = usePathname();

  // WP Mantığı: Aktif menüyü bul
  const isMenuOpen = (itemPath: string, subPaths: any[]) => {
    if (!pathname) return false;
    // Eğer direkt bu path ise
    if (pathname === itemPath) return true;
    // Eğer alt menülerinden biri aktifse
    if (subPaths && subPaths.some(sub => sub.path === pathname)) return true;
    return false;
  };

  const isSubActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-[32px] bottom-0 w-[160px] bg-[#1d2327] text-[#f0f0f1] font-sans text-[13px] overflow-y-auto z-40 pb-10">
      <ul className="m-0 p-0 list-none">
        
        {adminMenu.map((item) => {
          // AYIRAÇ (SEPARATOR)
          if (item.separator) {
            return <li key={item.id} className="h-[10px] my-[5px]"></li>;
          }

          const isOpen = isMenuOpen(item.path, item.submenu || []);
          const hasSubmenu = item.submenu && item.submenu.length > 0;

          return (
            <li key={item.id} className={`group relative mb-0 ${isOpen ? 'bg-[#2271b1] wp-has-current-submenu' : 'hover:bg-[#191e23]'}`}>
              
              {/* ANA MENÜ LİNKİ */}
              <Link 
                href={item.path} 
                className={`flex items-center px-3 py-[6px] transition-none min-h-[34px]
                  ${isOpen ? 'text-white font-semibold bg-[#2271b1]' : 'text-[#f0f0f1] group-hover:text-[#72aee6]'}
                `}
              >
                {/* İKON */}
                <div className={`mr-2 w-5 h-5 flex items-center justify-center opacity-70 ${isOpen ? 'text-white opacity-100' : 'group-hover:text-[#72aee6] group-hover:opacity-100'}`}>
                  {item.icon}
                </div>
                
                {/* BAŞLIK */}
                <div className="flex-1">{item.title}</div>

                {/* WP SELECTOR OKU (Sadece aktifse görünür) */}
                {isOpen && (
                    <div className="absolute right-0 top-0 bottom-0 w-auto h-full flex items-center">
                         {/* CSS ile üçgen yapılır ama burada basit tutalım */}
                    </div>
                )}
              </Link>

              {/* ALT MENÜ (Sadece aktifse veya hover'da görünür - WP JS'siz versiyonu için açık bırakıyoruz aktifse) */}
              {hasSubmenu && isOpen && (
                <ul className="bg-[#2c3338] m-0 p-0 list-none py-1.5 block">
                  {item.submenu?.map((sub) => (
                    <li key={sub.path} className="m-0 p-0">
                      <Link 
                        href={sub.path}
                        className={`block pl-[34px] pr-3 py-1.5 hover:text-[#72aee6] transition-none
                          ${isSubActive(sub.path) ? 'text-white font-semibold' : 'text-[#b0b0b0]'}
                        `}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              
              {/* WP HOVER SUBMENU (Flyout) mantığı karmaşıktır, şimdilik "Tıkla-Aç" yapısında bırakıyoruz */}
            </li>
          );
        })}
        
      </ul>
    </aside>
  );
}