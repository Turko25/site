import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'İletişim - TSS Sigorta Portalı',
  description: 'TSS Sigorta ile iletişime geçin. Uzman danışmanlarımızdan tamamlayıcı sağlık sigortası hakkında bilgi alın. Telefon, e-posta, canlı sohbet ve video görüşme seçenekleri. İstanbul ve Ankara ofislerimiz.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ContactInteractive />
      </main>
    </>
  );
}