import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Ana Sayfa - TSS Sigorta Portalı',
  description: 'Türkiye\'nin en güvenilir tamamlayıcı sağlık sigortası platformu. Ailenizin sağlığını ve mali güvenliğini koruyun. Uzman rehberliğinde doğru poliçeyi bulun, hemen teklif alın.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <HomepageInteractive />
      </div>
    </main>
  );
}