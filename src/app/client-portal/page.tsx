import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ClientPortalInteractive from './components/ClientPortalInteractive';

export const metadata: Metadata = {
  title: 'Müşteri Portalı - TSS Sigorta Portalı',
  description: 'Poliçelerinizi yönetin, talep oluşturun, belgelerinize erişin ve sağlık sigortanızdan en iyi şekilde yararlanın. Güvenli müşteri portalı ile tüm işlemlerinizi kolayca gerçekleştirin.',
};

export default function ClientPortalPage() {
  return (
    <>
      <Header />
      <ClientPortalInteractive />
    </>
  );
}