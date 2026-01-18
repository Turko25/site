'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid ve @types/uuid yapmalısın
import { useSession } from 'next-auth/react';

// TİPLER
import { Block, PostSettings, BlockType } from '@/types/editor';

// --- İKONLAR (WordPress SVG Seti) ---
const Icons = {
  Add: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
  Undo: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>,
  Redo: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13"/></svg>,
  Settings: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  More: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  Drag: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#ccc"><path d="M7 19h10v-2H7v2zm0-6h10v-2H7v2zm0-8v2h10V5H7z"/></svg>,
  Trash: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
};

export default function GutenbergEditor() {
  const { data: session } = useSession();
  
  // --- STATE YÖNETİMİ ---
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uuidv4(), type: 'paragraph', content: '', attributes: { placeholder: 'Yazmaya başlayın veya blok seçmek için / yazın' } }
  ]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [sidebarMode, setSidebarMode] = useState<'document' | 'block'>('document');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Belge Ayarları
  const [postSettings, setPostSettings] = useState<PostSettings>({
    title: '',
    slug: '',
    status: 'draft',
    visibility: 'public',
    publishDate: new Date().toISOString(),
    authorId: session?.user?.email || '',
    categoryId: '',
    featuredImage: null,
    excerpt: '',
    allowComments: true
  });

  // --- BLOK YÖNETİMİ ---
  const addBlock = (type: BlockType, index: number) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: '',
      attributes: {}
    };
    // Array'in arasına ekle
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, content: string, attributes: any = {}) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content, attributes: { ...b.attributes, ...attributes } } : b));
  };

  const removeBlock = (id: string) => {
    if (blocks.length === 1) return; // En az 1 blok kalsın
    setBlocks(blocks.filter(b => b.id !== id));
  };

  // --- RENDER BİLEŞENLERİ ---

  // 1. ÜST BAR (TOOLBAR)
  const TopToolbar = () => (
    <div className="h-[60px] bg-white border-b border-[#e0e0e0] flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Sol: Ekleme ve Tarihçe */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-[#1d2327] flex items-center justify-center rounded text-white font-bold cursor-pointer">W</div>
        
        <button className="w-9 h-9 bg-[#2271b1] text-white rounded flex items-center justify-center hover:bg-[#135e96] transition">
          <Icons.Add />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <button className="p-2 text-gray-600 hover:text-black disabled:opacity-30"><Icons.Undo /></button>
        <button className="p-2 text-gray-600 hover:text-black disabled:opacity-30"><Icons.Redo /></button>
        <button className="p-2 text-gray-600 hover:text-black"><Icons.More /></button>
      </div>

      {/* Orta: Önizleme vs */}
      <div className="font-medium text-gray-500 text-sm">
        {postSettings.status === 'draft' ? 'Taslak kaydedildi.' : 'Yayında'}
      </div>

      {/* Sağ: Yayınla ve Ayarlar */}
      <div className="flex items-center gap-2">
        <button className="text-gray-600 hover:text-[#2271b1] text-sm font-medium px-2">Taslak Kaydet</button>
        <button className="text-gray-600 hover:text-[#2271b1] text-sm font-medium px-2">Önizleme</button>
        <button className="bg-[#2271b1] text-white px-4 py-2 rounded font-medium hover:bg-[#135e96] transition">
          {postSettings.status === 'publish' ? 'Güncelle' : 'Yayınla'}
        </button>
        
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded ${isSidebarOpen ? 'bg-[#1e1e1e] text-white' : 'text-gray-600'}`}
        >
          <Icons.Settings />
        </button>
      </div>
    </div>
  );

  // 2. BLOK RENDERER (DİNAMİK)
  const BlockRenderer = ({ block, index }: { block: Block, index: number }) => {
    const isSelected = selectedBlockId === block.id;
    const inputRef = useRef<any>(null);

    // Otomatik odaklanma
    useEffect(() => {
      if (isSelected && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isSelected]);

    return (
      <div 
        onClick={() => {
          setSelectedBlockId(block.id);
          setSidebarMode('block');
        }}
        className={`group relative mb-4 p-2 min-h-[40px] border border-transparent hover:border-gray-200 transition-all ${isSelected ? 'outline outline-1 outline-gray-400' : ''}`}
      >
        {/* Sol Blok Kontrolleri (Hoverda çıkar) */}
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="p-1 hover:bg-gray-100 rounded text-gray-500 cursor-move"><Icons.Drag /></button>
           <button className="p-1 hover:bg-gray-100 rounded text-gray-500" onClick={() => addBlock('paragraph', index)}><Icons.Add /></button>
        </div>

        {/* Blok İçeriği */}
        {block.type === 'heading' ? (
          <input
            ref={inputRef}
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Başlık..."
            className="w-full text-3xl font-bold border-none outline-none bg-transparent placeholder-gray-300"
            onKeyDown={(e) => { if(e.key === 'Enter') addBlock('paragraph', index); }}
          />
        ) : block.type === 'image' ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 p-8 text-center rounded">
             {block.attributes.url ? (
               <img src={block.attributes.url} alt="Uploaded" className="max-w-full h-auto mx-auto" />
             ) : (
               <div className="flex flex-col items-center">
                 <button className="bg-gray-100 px-4 py-2 rounded text-gray-700 hover:bg-gray-200 mb-2">Medya Kütüphanesi</button>
                 <span className="text-xs text-gray-400">veya sürükleyip bırakın</span>
               </div>
             )}
          </div>
        ) : (
          <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => updateBlock(block.id, e.currentTarget.textContent || '')}
            onKeyDown={(e) => { 
                if(e.key === 'Enter') { 
                    e.preventDefault(); 
                    addBlock('paragraph', index); 
                } 
                if(e.key === '/' && block.content === '') {
                    // Quick Inserter burada açılmalı (İlerde yapacağız)
                    console.log("Quick inserter trigger");
                }
            }}
            className="w-full text-lg leading-relaxed outline-none empty:before:content-[attr(placeholder)] empty:before:text-gray-300"
            placeholder={block.attributes.placeholder}
          >
            {block.content}
          </div>
        )}

        {/* Seçiliyken Sağda Silme Butonu */}
        {isSelected && (
           <div className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100">
             <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-red-50 rounded"><Icons.Trash /></button>
           </div>
        )}
      </div>
    );
  };

  // 3. SAĞ SIDEBAR (AYARLAR)
  const SettingsSidebar = () => {
    if (!isSidebarOpen) return null;

    return (
      <div className="w-[280px] bg-white border-l border-[#e0e0e0] flex flex-col h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto">
        {/* Tablar */}
        <div className="flex border-b border-[#e0e0e0]">
          <button 
            onClick={() => setSidebarMode('document')}
            className={`flex-1 py-3 text-sm font-medium ${sidebarMode === 'document' ? 'text-[#2271b1] border-b-2 border-[#2271b1]' : 'text-gray-600'}`}
          >
            Belge
          </button>
          <button 
            onClick={() => setSidebarMode('block')}
            className={`flex-1 py-3 text-sm font-medium ${sidebarMode === 'block' ? 'text-[#2271b1] border-b-2 border-[#2271b1]' : 'text-gray-600'}`}
          >
            Blok
          </button>
        </div>

        {/* İçerik */}
        <div className="p-4 space-y-6">
          {sidebarMode === 'document' ? (
            <>
              {/* Özet (Status) */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Özet</h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between text-gray-600">
                     <span>Görünürlük</span>
                     <span className="text-[#2271b1] cursor-pointer">Herkese Açık</span>
                   </div>
                   <div className="flex justify-between text-gray-600">
                     <span>Yayınla</span>
                     <span className="text-[#2271b1] cursor-pointer">Hemen</span>
                   </div>
                   <div className="flex justify-between text-gray-600">
                     <span>URL</span>
                     <span className="text-[#2271b1] cursor-pointer truncate max-w-[100px]">{postSettings.slug || '/taslak'}</span>
                   </div>
                   <div className="flex items-center gap-2 mt-2">
                     <input type="checkbox" id="pending" className="w-4 h-4 text-[#2271b1]" />
                     <label htmlFor="pending" className="text-gray-600">İnceleme bekliyor</label>
                   </div>
                   <div className="flex items-center gap-2">
                     <button onClick={() => removeBlock('all')} className="text-red-600 hover:underline text-xs">Çöpe taşı</button>
                   </div>
                </div>
              </div>

              {/* Kalıcı Bağlantı */}
              <div className="border-b border-gray-200 pb-4">
                 <h3 className="font-semibold text-gray-700 mb-2 text-sm">Kalıcı Bağlantı</h3>
                 <input 
                   type="text" 
                   value={postSettings.slug}
                   onChange={(e) => setPostSettings({...postSettings, slug: e.target.value})}
                   className="w-full border border-gray-300 p-2 rounded text-sm focus:border-[#2271b1] outline-none"
                   placeholder="url-slug"
                 />
              </div>

              {/* Öne Çıkan Görsel */}
              <div className="border-b border-gray-200 pb-4">
                 <h3 className="font-semibold text-gray-700 mb-2 text-sm">Öne Çıkan Görsel</h3>
                 <div className="bg-gray-100 border border-gray-200 h-32 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                    <span className="text-gray-500 text-sm">Görsel ayarla</span>
                 </div>
              </div>
            </>
          ) : (
            <>
              {/* BLOK AYARLARI */}
              {selectedBlockId ? (
                <div className="text-sm">
                   <p className="text-gray-500 mb-4">Seçili blok: <span className="font-bold text-black uppercase">{blocks.find(b => b.id === selectedBlockId)?.type}</span></p>
                   
                   <div className="mb-4">
                     <label className="block text-gray-700 mb-1 font-medium">Tipografi</label>
                     <select className="w-full border p-2 rounded">
                        <option>Varsayılan</option>
                        <option>Küçük</option>
                        <option>Büyük</option>
                     </select>
                   </div>
                   
                   <div className="mb-4">
                     <label className="block text-gray-700 mb-1 font-medium">Renk</label>
                     <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-black cursor-pointer ring-1 ring-offset-2 ring-transparent hover:ring-gray-300"></div>
                        <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></div>
                        <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></div>
                     </div>
                   </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Blok seçilmedi.</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#1e1e1e]">
      <TopToolbar />

      <div className="flex flex-1">
        {/* ANA CANVAS */}
        <div className="flex-1 bg-white relative">
          <div className="max-w-[840px] mx-auto pt-12 pb-32 px-8 min-h-screen shadow-sm my-8 bg-white border-x border-transparent lg:border-gray-50">
            
            {/* BAŞLIK ALANI (GUTENBERG STYLE) */}
            <input 
              type="text" 
              placeholder="Başlık ekle" 
              value={postSettings.title}
              onChange={(e) => setPostSettings({...postSettings, title: e.target.value})}
              className="w-full text-5xl font-bold mb-8 border-none outline-none placeholder-gray-300 text-[#1e1e1e]"
            />

            {/* BLOK LİSTESİ */}
            {blocks.map((block, index) => (
              <BlockRenderer key={block.id} block={block} index={index} />
            ))}

            {/* BOŞ ALANA TIKLAYINCA YENİ PARAGRAF EKLEME ALANI */}
            <div 
               className="h-32 cursor-text"
               onClick={() => {
                 if (blocks[blocks.length - 1].content !== '') {
                    addBlock('paragraph', blocks.length - 1);
                 }
               }}
            ></div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <SettingsSidebar />
      </div>
    </div>
  );
}