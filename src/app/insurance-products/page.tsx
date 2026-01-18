import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProductsInteractive from './components/ProductsInteractive';

export const metadata: Metadata = {
  title: 'Sigorta Ürünleri - TSS Sigorta Portalı',
  description: 'Kapsamlı tamamlayıcı sağlık sigortası ürünlerimizi keşfedin. Detaylı karşılaştırma araçları, teminat simülatörü ve anında teklif hesaplama ile ihtiyacınıza en uygun sigortayı bulun.',
};

export default function InsuranceProductsPage() {
  return (
    <>
      <Header />
      <ProductsInteractive />
    </>
  );
}