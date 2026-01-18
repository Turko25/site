import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  alt: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
  };
}

const mockBlogPosts: BlogPost[] = [
{
  id: 1,
  title: "Tamamlayıcı Sağlık Sigortası Nedir ve Neden Önemlidir?",
  excerpt: "Temel sağlık sigortanızın kapsamadığı masrafları karşılayan tamamlayıcı sağlık sigortası hakkında bilmeniz gereken her şey.",
  category: "Sigorta Rehberi",
  readTime: "5 dk",
  date: "10 Aralık 2025",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_157ab3c9e-1764651562342.png",
  alt: "Healthcare professional in white coat reviewing medical documents with stethoscope on desk",
  author: {
    name: "Dr. Ayşe Yılmaz",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    avatarAlt: "Professional headshot of female doctor with dark hair in white medical coat smiling"
  }
},
{
  id: 2,
  title: "2025 Yılında Sağlık Sigortası Seçerken Dikkat Edilmesi Gerekenler",
  excerpt: "Yeni yılda sağlık sigortası poliçenizi yenilerken veya yeni bir poliçe alırken göz önünde bulundurmanız gereken önemli faktörler.",
  category: "Güncel Haberler",
  readTime: "7 dk",
  date: "8 Aralık 2025",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b84bf3b-1765284590370.png",
  alt: "Modern medical laboratory with advanced equipment and bright lighting showing healthcare technology",
  author: {
    name: "Mehmet Kaya",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc716aeb-1763295743001.png",
    avatarAlt: "Professional headshot of male insurance advisor in navy suit with short brown hair"
  }
},
{
  id: 3,
  title: "Aile Sağlık Sigortası: Sevdiklerinizi Nasıl Korursunuz?",
  excerpt: "Ailenizin tüm bireylerini kapsayan sağlık sigortası paketleri ve bunların avantajları hakkında detaylı bilgiler.",
  category: "Aile Sağlığı",
  readTime: "6 dk",
  date: "5 Aralık 2025",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fef03637-1764774658146.png",
  alt: "Happy Turkish family of four sitting together on couch in modern living room smiling at camera",
  author: {
    name: "Zeynep Demir",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb5d2cb2-1763294526193.png",
    avatarAlt: "Professional headshot of female consultant with long dark hair in business attire"
  }
}];


const BlogPreview = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-light rounded-full mb-4">
              <Icon name="BookOpenIcon" size={18} className="text-primary" variant="solid" />
              <span className="text-sm font-medium text-primary">Bilgi Merkezi</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Sağlık Sigortası Hakkında Güncel İçerikler
            </h2>
            <p className="text-lg text-text-secondary">
              Uzman yazarlarımızdan sigorta ve sağlık konularında faydalı bilgiler
            </p>
          </div>
          <Link
            href="/knowledge-center"
            className="hidden lg:inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary-hover transition-colors duration-base">

            <span>Tümünü Gör</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) =>
          <article
            key={post.id}
            className="bg-card rounded-2xl shadow-medical hover:shadow-medical-hover transition-all duration-base overflow-hidden group">

              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base" />

                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="CalendarIcon" size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ClockIcon" size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-base">
                  {post.title}
                </h3>

                <p className="text-text-secondary mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <AppImage
                      src={post.author.avatar}
                      alt={post.author.avatarAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <span className="text-sm font-medium text-text-primary">{post.author.name}</span>
                  </div>
                  <Link
                  href="/knowledge-center"
                  className="flex items-center space-x-1 text-primary font-semibold hover:text-primary-hover transition-colors duration-base">

                    <span className="text-sm">Oku</span>
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="text-center mt-12 lg:hidden">
          <Link
            href="/knowledge-center"
            className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary-hover transition-colors duration-base">

            <span>Tüm Yazıları Görüntüle</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>);

};

export default BlogPreview;