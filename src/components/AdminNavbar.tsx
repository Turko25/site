'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function AdminNavbar() {
  const { data: session } = useSession();

  return (
    <div id="wpadminbar" className="fixed top-0 left-0 right-0 h-[32px] bg-[#1d2327] text-[#f0f0f1] flex items-center justify-between px-0 z-50 font-sans text-[13px]">
      
      {/* SOL: Logo ve Site Linki */}
      <div className="flex items-center h-full">
        <div className="w-[32px] h-[32px] flex items-center justify-center hover:bg-[#191e23] cursor-pointer transition-colors group">
          <span className="bg-white text-[#1d2327] w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold group-hover:text-blue-600">W</span>
        </div>

        <Link href="/" target="_blank" className="flex items-center gap-2 px-3 h-full hover:bg-[#191e23] transition-colors group">
          <svg className="w-4 h-4 text-[#a7aaad] group-hover:text-[#72aee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="font-semibold">TSS Sigorta</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 px-3 h-full hover:bg-[#191e23] cursor-pointer">
          <svg className="w-4 h-4 text-[#a7aaad]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
          <span className="text-xs">0</span>
        </div>
      </div>

      {/* SAĞ: Kullanıcı */}
      <div className="flex items-center h-full hover:bg-[#191e23] px-3 cursor-pointer group relative">
        <span className="mr-2 text-[#f0f0f1]">
          Merhaba, {session?.user?.name || 'Admin'}
        </span>
        <div className="w-5 h-5 bg-[#2c3338] rounded-sm flex items-center justify-center">
           <svg className="w-4 h-4 text-[#a7aaad]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
        </div>

        <div className="absolute right-0 top-[32px] w-40 bg-[#32373c] hidden group-hover:block shadow-lg border-t border-[#1d2327]">
           <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full text-left px-4 py-2 text-[#b0b0b0] hover:text-[#72aee6] hover:bg-[#191e23] text-sm">
             Çıkış Yap
           </button>
        </div>
      </div>
    </div>
  );
}