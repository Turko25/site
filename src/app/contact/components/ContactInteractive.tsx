'use client';

import { useEffect, useState } from 'react';
import ContactHero from './ContactHero';
import ContactChannels from './ContactChannels';
import OfficeLocations from './OfficeLocations';
import AgentProfiles from './AgentProfiles';
import ContactForm from './ContactForm';
import EmergencyContact from './EmergencyContact';
import FAQSection from './FAQSection';

interface ContactChannel {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
  value: string;
  availability: string;
  color: string;
}

interface Office {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl: string;
  lat: number;
  lng: number;
}

interface Agent {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  image: string;
  alt: string;
  phone: string;
  email: string;
  languages: string[];
  experience: string;
  rating: number;
  reviewCount: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const ContactInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const contactChannels: ContactChannel[] = [
  {
    id: '1',
    icon: 'PhoneIcon',
    title: 'Telefon Desteği',
    description: 'Uzman danışmanlarımızla doğrudan görüşün',
    action: 'Hemen Ara',
    value: '0850 123 45 67',
    availability: 'Pzt-Cum 09:00-18:00',
    color: 'bg-primary'
  },
  {
    id: '2',
    icon: 'EnvelopeIcon',
    title: 'E-posta',
    description: 'Detaylı sorularınız için yazın',
    action: 'E-posta Gönder',
    value: 'destek@tsssigorta.com',
    availability: '24 saat içinde yanıt',
    color: 'bg-secondary'
  },
  {
    id: '3',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Canlı Sohbet',
    description: 'Anında destek alın',
    action: 'Sohbet Başlat',
    value: 'Online Destek',
    availability: 'Pzt-Cum 09:00-18:00',
    color: 'bg-healthcare-green'
  },
  {
    id: '4',
    icon: 'VideoCameraIcon',
    title: 'Video Görüşme',
    description: 'Yüz yüze danışmanlık',
    action: 'Randevu Al',
    value: 'Online Toplantı',
    availability: 'Randevu ile',
    color: 'bg-conversion'
  }];


  const offices: Office[] = [
  {
    id: '1',
    city: 'İstanbul',
    address: 'Maslak Mahallesi, Büyükdere Caddesi No: 255, Nurol Plaza Kat: 12, Sarıyer/İstanbul',
    phone: '+90 212 345 67 89',
    email: 'istanbul@tsssigorta.com',
    workingHours: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 15:00\nPazar: Kapalı',
    mapUrl: 'https://maps.google.com/?q=41.1086,29.0119',
    lat: 41.1086,
    lng: 29.0119
  },
  {
    id: '2',
    city: 'Ankara',
    address: 'Kızılay Mahallesi, Atatürk Bulvarı No: 123, Çankaya Plaza Kat: 8, Çankaya/Ankara',
    phone: '+90 312 456 78 90',
    email: 'ankara@tsssigorta.com',
    workingHours: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 15:00\nPazar: Kapalı',
    mapUrl: 'https://maps.google.com/?q=39.9208,32.8541',
    lat: 39.9208,
    lng: 32.8541
  }];


  const agents: Agent[] = [
  {
    id: '1',
    name: 'Ayşe Demir',
    title: 'Kıdemli Sigorta Danışmanı',
    expertise: ['Tamamlayıcı Sağlık', 'Aile Sigortaları', 'Kurumsal Çözümler'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18ca2627c-1763293853689.png",
    alt: 'Professional Turkish woman with dark hair in navy blazer smiling confidently in modern office setting',
    phone: '+90 532 111 22 33',
    email: 'ayse.demir@tsssigorta.com',
    languages: ['Türkçe', 'İngilizce'],
    experience: '12 yıl deneyim',
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: '2',
    name: 'Mehmet Yılmaz',
    title: 'Sigorta Uzmanı',
    expertise: ['Bireysel Sağlık', 'Yenileme İşlemleri', 'Hasar Yönetimi'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11cf57b7a-1763293855270.png",
    alt: 'Professional Turkish man with short black hair in gray suit smiling warmly in corporate office',
    phone: '+90 532 222 33 44',
    email: 'mehmet.yilmaz@tsssigorta.com',
    languages: ['Türkçe', 'Almanca'],
    experience: '8 yıl deneyim',
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '3',
    name: 'Zeynep Kaya',
    title: 'Müşteri İlişkileri Uzmanı',
    expertise: ['Müşteri Hizmetleri', 'Poliçe Danışmanlığı', 'Ödeme Planları'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11a1c1383-1763299033178.png",
    alt: 'Young Turkish woman with long brown hair in white blouse smiling professionally in bright office',
    phone: '+90 532 333 44 55',
    email: 'zeynep.kaya@tsssigorta.com',
    languages: ['Türkçe', 'İngilizce', 'Fransızca'],
    experience: '6 yıl deneyim',
    rating: 4.9,
    reviewCount: 98
  }];


  const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Tamamlayıcı sağlık sigortası nedir?',
    answer: 'Tamamlayıcı sağlık sigortası, SGK veya özel sağlık sigortanızın karşılamadığı sağlık giderlerini tamamlayan bir sigorta türüdür. Ameliyat, tedavi ve ilaç giderlerinde ek koruma sağlar.',
    category: 'Genel Bilgi'
  },
  {
    id: '2',
    question: 'Poliçe başvurusu ne kadar sürer?',
    answer: 'Online başvurularınız 24 saat içinde değerlendirilir. Gerekli belgeler tamamlandıktan sonra poliçeniz 2-3 iş günü içinde aktif hale gelir.',
    category: 'Başvuru Süreci'
  },
  {
    id: '3',
    question: 'Hangi hastanelerde geçerlidir?',
    answer: 'Poliçemiz Türkiye genelinde 500\'den fazla anlaşmalı hastane ve sağlık kuruluşunda geçerlidir. Detaylı liste için müşteri portalımızdan ulaşabilirsiniz.',
    category: 'Kapsam'
  },
  {
    id: '4',
    question: 'Hasar talebini nasıl yapabilirim?',
    answer: 'Hasar talebinizi müşteri portalımız üzerinden online olarak yapabilir, gerekli belgeleri yükleyebilir ve sürecinizi takip edebilirsiniz. Alternatif olarak ofislerimize başvurabilirsiniz.',
    category: 'Hasar İşlemleri'
  },
  {
    id: '5',
    question: 'Poliçemi iptal edebilir miyim?',
    answer: 'Poliçenizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi için müşteri hizmetlerimizle iletişime geçmeniz yeterlidir. Kullanılmayan süre için iade hesaplaması yapılır.',
    category: 'Poliçe Yönetimi'
  },
  {
    id: '6',
    question: 'Ödeme seçenekleri nelerdir?',
    answer: 'Kredi kartı, banka havalesi ve otomatik ödeme talimatı ile aylık veya yıllık ödeme seçeneklerimiz bulunmaktadır. Yıllık ödemelerde %10 indirim uygulanır.',
    category: 'Ödeme'
  }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-64 bg-surface animate-pulse" />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) =>
            <div key={i} className="h-64 bg-surface rounded-xl animate-pulse" />
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      <ContactChannels channels={contactChannels} />
      <OfficeLocations offices={offices} />
      <AgentProfiles agents={agents} />
      <div id="contact-form">
        <ContactForm />
      </div>
      <EmergencyContact />
      <FAQSection faqs={faqs} />
    </div>);

};

export default ContactInteractive;