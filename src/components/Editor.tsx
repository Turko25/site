'use client'

import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'

// Editörün alacağı özellikler (Props)
interface EditorProps {
  data: any // Mevcut veri (Düzenleme yaparken lazım olur)
  onChange: (data: any) => void // Yazı değiştikçe üst bileşene haber ver
  holder: string // Editörün ID'si
}

export default function Editor({ data, onChange, holder }: EditorProps) {
  const ref = useRef<EditorJS>()

  // Editörü Başlat
  useEffect(() => {
    // Eğer zaten başladıysa tekrar başlatma
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder, // Hangi div'in içine yerleşecek?
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Bir başlık girin...',
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          }
        },
        data: data, // Başlangıç verisi
        async onChange(api, event) {
          const content = await api.saver.save()
          onChange(content) // Değişikliği yukarı bildir
        },
        placeholder: 'Yazmaya başlamak için tıklayın...'
      })
      ref.current = editor
    }

    // Temizlik (Component kapanırsa editörü yok et)
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return (
    <div 
      id={holder} 
      className="prose max-w-full border border-gray-300 rounded-lg p-4 min-h-[300px] bg-white"
    />
  )
}