'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CategoryFilter from './CategoryFilter';
import ArticleCard from './ArticleCard';
import VideoLibrary from './VideoLibrary';
import FAQSection from './FAQSection';
import GlossarySection from './GlossarySection';
import DownloadableResources from './DownloadableResources';
import RegulatoryUpdates from './RegulatoryUpdates';
import NewsletterSubscription from './NewsletterSubscription';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  image: string;
  alt: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
  };
}

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  thumbnailAlt: string;
  views: number;
  expert: {
    name: string;
    title: string;
  };
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  downloads: number;
  icon: string;
}

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'new' | 'updated' | 'important';
  category: string;
}

const categories: Category[] = [
{ id: 'all', name: 'Tüm İçerikler', icon: 'Squares2X2Icon', count: 48 },
{ id: 'insurance-guides', name: 'Sigorta Rehberleri', icon: 'BookOpenIcon', count: 15 },
{ id: 'health-tips', name: 'Sağlık İpuçları', icon: 'HeartIcon', count: 12 },
{ id: 'policy-explanations', name: 'Poliçe Açıklamaları', icon: 'DocumentTextIcon', count: 10 },
{ id: 'regulations', name: 'Düzenlemeler', icon: 'ScaleIcon', count: 8 },
{ id: 'claims-process', name: 'Hasar Süreci', icon: 'ClipboardDocumentCheckIcon', count: 3 }];


const articles: Article[] = [
{
  id: '1',
  title: 'Tamamlayıcı Sağlık Sigortası Nedir ve Neden Önemlidir?',
  excerpt: 'Tamamlayıcı sağlık sigortası, SGK kapsamı dışında kalan sağlık harcamalarınızı karşılayan özel bir sigorta türüdür. Bu rehberde, TSS\'nin avantajlarını ve nasıl seçim yapacağınızı öğrenin.',
  category: 'Sigorta Rehberleri',
  readTime: 8,
  publishDate: '12 Aralık 2025',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1decc4cad-1764642439646.png",
  alt: 'Doktor hasta ile sigorta belgelerini incelerken modern hastane ortamında',
  author: {
    name: 'Dr. Ayşe Yılmaz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    avatarAlt: 'Profesyonel kadın doktor beyaz önlük içinde gülümserken'
  }
},
{
  id: '2',
  title: 'Sigorta Poliçenizi Seçerken Dikkat Etmeniz Gereken 10 Önemli Nokta',
  excerpt: 'Doğru sigorta poliçesini seçmek, sağlığınız ve mali güvenliğiniz için kritik öneme sahiptir. Bu kapsamlı rehberde, poliçe seçiminde dikkat edilmesi gereken temel faktörleri detaylı olarak inceliyoruz.',
  category: 'Sigorta Rehberleri',
  readTime: 12,
  publishDate: '10 Aralık 2025',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1537e9e2a-1764800885818.png",
  alt: 'İş adamı ofiste sigorta belgelerini masada incelerken',
  author: {
    name: 'Mehmet Kaya',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ef2a4a74-1764651001853.png",
    avatarAlt: 'Profesyonel erkek danışman takım elbise içinde ofiste'
  }
},
{
  id: '3',
  title: 'Sağlıklı Yaşam İçin Günlük Alışkanlıklar ve Sigorta İlişkisi',
  excerpt: 'Sağlıklı yaşam alışkanlıkları sadece fiziksel sağlığınızı değil, sigorta primlerinizi de olumlu etkiler. Düzenli egzersiz, dengeli beslenme ve stres yönetimi hakkında uzman önerileri.',
  category: 'Sağlık İpuçları',
  readTime: 6,
  publishDate: '8 Aralık 2025',
  image: "https://images.unsplash.com/photo-1665781665870-3364a8b5626f",
  alt: 'Genç kadın yoga matı üzerinde meditasyon yaparken sabah güneşinde',
  author: {
    name: 'Zeynep Demir',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12a996eb0-1765123529016.png",
    avatarAlt: 'Profesyonel kadın sağlık danışmanı beyaz gömlekle gülümserken'
  }
},
{
  id: '4',
  title: 'Hasar Talebi Nasıl Yapılır? Adım Adım Rehber',
  excerpt: 'Sigorta hasar talebinde bulunmak karmaşık görünebilir, ancak doğru adımları izlediğinizde oldukça basittir. Bu rehberde, hasar sürecinin her aşamasını detaylı olarak açıklıyoruz.',
  category: 'Hasar Süreci',
  readTime: 10,
  publishDate: '5 Aralık 2025',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff2de9ec-1764694292737.png",
  alt: 'Kişi masada sigorta formlarını doldururken hesap makinesi ve belgelerle',
  author: {
    name: 'Can Özkan',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_124ddf771-1765167525499.png",
    avatarAlt: 'Profesyonel erkek sigorta uzmanı gri takım elbise içinde'
  }
},
{
  id: '5',
  title: '2025 Yılı Sigorta Düzenlemeleri ve Değişiklikler',
  excerpt: 'Yeni yılda yürürlüğe giren sigorta düzenlemeleri ve bu değişikliklerin poliçenize nasıl etki edeceği hakkında bilmeniz gereken her şey. Uzman analizleri ve önerilerle.',
  category: 'Düzenlemeler',
  readTime: 15,
  publishDate: '1 Aralık 2025',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd2c90b8-1765277218204.png",
  alt: 'İş toplantısında profesyoneller masa etrafında düzenlemeleri tartışırken',
  author: {
    name: 'Dr. Ayşe Yılmaz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    avatarAlt: 'Profesyonel kadın doktor beyaz önlük içinde gülümserken'
  }
},
{
  id: '6',
  title: 'Poliçe Teminat Kapsamını Anlamak: Detaylı İnceleme',
  excerpt: 'Sigorta poliçenizin teminat kapsamını tam olarak anlamak, beklenmedik durumlarla karşılaştığınızda size büyük avantaj sağlar. Teminat türleri, limitler ve istisnalar hakkında kapsamlı bilgi.',
  category: 'Poliçe Açıklamaları',
  readTime: 11,
  publishDate: '28 Kasım 2025',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc9e7939-1764655586670.png",
  alt: 'Sigorta danışmanı müşteriye poliçe detaylarını laptop ekranında gösterirken',
  author: {
    name: 'Mehmet Kaya',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ef2a4a74-1764651001853.png",
    avatarAlt: 'Profesyonel erkek danışman takım elbise içinde ofiste'
  }
}];


const videos: Video[] = [
{
  id: '1',
  title: 'Tamamlayıcı Sağlık Sigortası Temelleri',
  description: 'TSS nedir, nasıl çalışır ve size nasıl fayda sağlar? Uzman açıklamaları ile öğrenin.',
  duration: '12:45',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1eca10f73-1765302149078.png",
  thumbnailAlt: 'Doktor hastane ortamında kameraya konuşurken profesyonel video çekimi',
  views: 15420,
  expert: {
    name: 'Dr. Ayşe Yılmaz',
    title: 'Sigorta Uzmanı'
  }
},
{
  id: '2',
  title: 'Doğru Poliçe Seçimi İçin İpuçları',
  description: 'İhtiyaçlarınıza en uygun sigorta poliçesini nasıl seçersiniz? Pratik öneriler.',
  duration: '8:30',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5df2315-1764672244978.png",
  thumbnailAlt: 'İş adamı ofiste sigorta seçeneklerini tablet üzerinde incelerken',
  views: 12350,
  expert: {
    name: 'Mehmet Kaya',
    title: 'Finansal Danışman'
  }
},
{
  id: '3',
  title: 'Hasar Talebi Süreci Adım Adım',
  description: 'Hasar talebinde bulunma sürecini baştan sona anlatan detaylı video rehber.',
  duration: '15:20',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1625d3206-1765660330248.png",
  thumbnailAlt: 'Profesyonel kadın ofiste hasar formlarını açıklarken whiteboard önünde',
  views: 9870,
  expert: {
    name: 'Can Özkan',
    title: 'Hasar Uzmanı'
  }
}];


const faqs: FAQ[] = [
{
  id: '1',
  question: 'Tamamlayıcı sağlık sigortası ile özel sağlık sigortası arasındaki fark nedir?',
  answer: 'Tamamlayıcı sağlık sigortası, SGK\'nın karşılamadığı sağlık harcamalarını tamamlar. Özel sağlık sigortası ise SGK\'dan bağımsız olarak tüm sağlık harcamalarınızı karşılayabilir. TSS genellikle daha uygun fiyatlıdır çünkü SGK ile birlikte çalışır.',
  category: 'Genel Bilgiler'
},
{
  id: '2',
  question: 'Sigorta primim nasıl hesaplanır?',
  answer: 'Sigorta priminiz yaşınız, sağlık durumunuz, seçtiğiniz teminat kapsamı, muafiyet tutarı ve poliçe limitlerine göre belirlenir. Ayrıca mesleğiniz, yaşam tarzınız ve sigara kullanımı gibi faktörler de primi etkileyebilir.',
  category: 'Fiyatlandırma'
},
{
  id: '3',
  question: 'Önceden var olan hastalıklarım sigorta kapsamına girer mi?',
  answer: 'Önceden var olan hastalıklar genellikle bekleme süresi sonrasında kapsama alınır. Bekleme süresi poliçeye ve hastalığın türüne göre değişir. Bazı poliçeler önceden var olan hastalıkları hiç kapsamayabilir, bu nedenle poliçe şartlarını dikkatlice incelemek önemlidir.',
  category: 'Teminat Kapsamı'
},
{
  id: '4',
  question: 'Hasar talebinde bulunmak için ne kadar sürem var?',
  answer: 'Hasar talebinde bulunma süresi genellikle tedavi tarihinden itibaren 30-90 gün arasındadır. Ancak bu süre poliçenize göre değişebilir. Mümkün olan en kısa sürede hasar talebinde bulunmanız, sürecin hızlı ilerlemesini sağlar.',
  category: 'Hasar Süreci'
},
{
  id: '5',
  question: 'Poliçemi iptal edebilir miyim ve iade alabilir miyim?',
  answer: 'Poliçenizi istediğiniz zaman iptal edebilirsiniz. İade tutarı, poliçenizin ne kadar süre yürürlükte kaldığına ve kullanılıp kullanılmadığına bağlıdır. İlk 14 gün içinde iptal ederseniz, genellikle tam iade alabilirsiniz (cayma hakkı).',
  category: 'Poliçe Yönetimi'
}];


const glossaryTerms: GlossaryTerm[] = [
{
  id: '1',
  term: 'Aktüer',
  definition: 'Sigorta şirketlerinde risk analizi yapan, prim hesaplamaları ve rezerv planlaması konusunda uzmanlaşmış profesyoneldir.',
  category: 'Meslek Tanımları'
},
{
  id: '2',
  term: 'Bekleme Süresi',
  definition: 'Poliçenin başlangıç tarihinden itibaren belirli teminatların geçerli olması için geçmesi gereken süredir. Bu süre içinde yapılan başvurular genellikle karşılanmaz.',
  category: 'Poliçe Şartları'
},
{
  id: '3',
  term: 'Cayma Hakkı',
  definition: 'Sigortalının poliçe başlangıcından itibaren belirli bir süre içinde (genellikle 14 gün) herhangi bir gerekçe göstermeden sözleşmeyi feshetme hakkıdır.',
  category: 'Yasal Haklar'
},
{
  id: '4',
  term: 'Muafiyet',
  definition: 'Her hasar durumunda sigortalının kendisinin karşılaması gereken sabit tutardır. Muafiyet tutarı ne kadar yüksekse, prim genellikle o kadar düşüktür.',
  category: 'Finansal Terimler'
},
{
  id: '5',
  term: 'Teminat',
  definition: 'Sigorta poliçesinin karşıladığı risk ve zararların kapsamını ifade eder. Her poliçenin teminat limitleri ve şartları farklı olabilir.',
  category: 'Poliçe Şartları'
}];


const resources: Resource[] = [
{
  id: '1',
  title: 'Tamamlayıcı Sağlık Sigortası Rehberi',
  description: 'TSS hakkında bilmeniz gereken her şeyi içeren kapsamlı PDF rehber.',
  type: 'PDF',
  size: '2.4 MB',
  downloads: 3420,
  icon: 'DocumentTextIcon'
},
{
  id: '2',
  title: 'Poliçe Karşılaştırma Kontrol Listesi',
  description: 'Farklı poliçeleri karşılaştırırken kullanabileceğiniz pratik kontrol listesi.',
  type: 'PDF',
  size: '850 KB',
  downloads: 2150,
  icon: 'ClipboardDocumentCheckIcon'
},
{
  id: '3',
  title: 'Hasar Talep Formu Şablonu',
  description: 'Hasar talebinde bulunurken kullanabileceğiniz standart form şablonu.',
  type: 'DOCX',
  size: '120 KB',
  downloads: 1890,
  icon: 'DocumentIcon'
},
{
  id: '4',
  title: 'Sağlık Harcamaları Takip Tablosu',
  description: 'Yıllık sağlık harcamalarınızı takip etmek için Excel tablosu.',
  type: 'XLSX',
  size: '450 KB',
  downloads: 1560,
  icon: 'TableCellsIcon'
}];


const updates: Update[] = [
{
  id: '1',
  title: '2025 Yılı Sigorta Prim Tavanları Güncellendi',
  description: 'Hazine ve Maliye Bakanlığı tarafından belirlenen yeni prim tavanları 1 Ocak 2025 tarihinden itibaren geçerli olacak. Yeni tavanlar ortalama %8.5 artış gösteriyor.',
  date: '13 Aralık 2025',
  status: 'new',
  category: 'Düzenlemeler'
},
{
  id: '2',
  title: 'Dijital Hasar Talep Sistemi Zorunlu Hale Geliyor',
  description: 'Sigorta şirketleri için dijital hasar talep sistemi kurma zorunluluğu getiren yönetmelik yayımlandı. Geçiş süreci 6 ay olarak belirlendi.',
  date: '10 Aralık 2025',
  status: 'important',
  category: 'Teknoloji'
},
{
  id: '3',
  title: 'Tamamlayıcı Sağlık Sigortası Vergi İndirimi Artırıldı',
  description: 'TSS primlerinde vergi indirimi oranı %15\'ten %20\'ye çıkarıldı. Bu değişiklik 2025 yılı gelir vergisi beyannamelerinde geçerli olacak.',
  date: '5 Aralık 2025',
  status: 'updated',
  category: 'Vergi'
}];


export default function KnowledgeCenterInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="h-96 bg-muted rounded-xl" />
              <div className="lg:col-span-3 space-y-6">
                <div className="h-64 bg-muted rounded-xl" />
                <div className="h-64 bg-muted rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === categories.find((c) => c.id === activeCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (articleId: string) => {
    console.log('Article clicked:', articleId);
  };

  const handleVideoClick = (videoId: string) => {
    console.log('Video clicked:', videoId);
  };

  const handleDownload = (resourceId: string) => {
    console.log('Resource downloaded:', resourceId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="h-16" />
      
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory} />

          </aside>
          
          <main className="lg:col-span-3 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  {activeCategory === 'all' ? 'Tüm Makaleler' : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <span className="text-text-secondary">
                  {filteredArticles.length} makale bulundu
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) =>
                <ArticleCard
                  key={article.id}
                  article={article}
                  onArticleClick={handleArticleClick} />

                )}
              </div>
            </section>
            
            <VideoLibrary videos={videos} onVideoClick={handleVideoClick} />
            
            <FAQSection faqs={faqs} />
            
            <GlossarySection terms={glossaryTerms} />
            
            <DownloadableResources resources={resources} onDownload={handleDownload} />
            
            <RegulatoryUpdates updates={updates} />
            
            <NewsletterSubscription />
          </main>
        </div>
      </div>
    </div>);

}