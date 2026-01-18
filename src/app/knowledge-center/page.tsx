import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import KnowledgeCenterInteractive from './components/KnowledgeCenterInteractive';

export const metadata: Metadata = {
  title: 'Bilgi Merkezi - TSS Sigorta Portalı',
  description: 'Tamamlayıcı sağlık sigortası hakkında kapsamlı rehberler, uzman analizleri, video eğitimler ve güncel düzenlemeler. Sigorta kararlarınızı bilinçli bir şekilde verin.',
};

export default function KnowledgeCenterPage() {
  return (
    <>
      <Header />
      <KnowledgeCenterInteractive />
    </>
  );
}