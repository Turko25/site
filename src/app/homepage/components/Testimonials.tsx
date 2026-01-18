'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  alt: string;
}

const mockTestimonials: Testimonial[] = [
{
  id: 1,
  name: "Ahmet Yılmaz",
  role: "Yazılım Mühendisi",
  company: "TechCorp A.Ş.",
  content: "TSS Sigorta Portalı sayesinde ailem için en uygun sağlık sigortasını bulmak çok kolay oldu. Danışmanlar son derece profesyonel ve yardımcı. Özellikle online teklif sistemi çok pratik.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_179aaf74c-1763296407432.png",
  alt: "Professional headshot of Turkish male software engineer in casual blue shirt with short dark hair smiling"
},
{
  id: 2,
  name: "Elif Kaya",
  role: "İşletme Sahibi",
  company: "Kaya Tekstil",
  content: "Çalışanlarım için toplu sağlık sigortası yaptırmak istediğimde TSS'nin sunduğu çözümler ve fiyatlar gerçekten çok iyiydi. Hem kaliteli hem de uygun fiyatlı paketler sundular.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16838c292-1763297242825.png",
  alt: "Professional headshot of Turkish female business owner in elegant black blazer with long dark hair"
},
{
  id: 3,
  name: "Mehmet Demir",
  role: "Emekli Öğretmen",
  company: "Ankara",
  content: "Emekli olduktan sonra tamamlayıcı sağlık sigortası aramaya başladım. TSS'nin uzmanları bana en uygun paketi bulmamda çok yardımcı oldular. Şimdi sağlık masraflarım konusunda çok daha rahatım.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f236c5e8-1764758458417.png",
  alt: "Professional headshot of retired male teacher with gray hair and glasses in formal attire smiling warmly"
},
{
  id: 4,
  name: "Zeynep Arslan",
  role: "Doktor",
  company: "Özel Hastane",
  content: "Sağlık sektöründe çalışan biri olarak sigorta poliçelerinin detaylarını iyi biliyorum. TSS'nin sunduğu kapsamlar ve şeffaf fiyatlandırma politikası gerçekten takdire şayan.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
  alt: "Professional headshot of female doctor in white medical coat with stethoscope and dark hair in ponytail"
}];


const Testimonials = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-healthcare-green/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-background rounded-full mb-4">
              <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary" variant="solid" />
              <span className="text-sm font-medium text-primary">Müşteri Yorumları</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Binlerce mutlu müşterimizin deneyimlerini keşfedin
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl shadow-medical p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                    <AppImage
                      src={mockTestimonials[0].image}
                      alt={mockTestimonials[0].alt}
                      className="w-full h-full object-cover" />

                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(5)].map((_, i) =>
                    <Icon key={i} name="StarIcon" size={20} className="text-warning" variant="solid" />
                    )}
                  </div>

                  <p className="text-lg text-text-primary mb-6 leading-relaxed">
                    "{mockTestimonials[0].content}"
                  </p>

                  <div>
                    <p className="text-xl font-bold text-text-primary">{mockTestimonials[0].name}</p>
                    <p className="text-sm text-text-secondary">{mockTestimonials[0].role}</p>
                    <p className="text-sm text-text-tertiary">{mockTestimonials[0].company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = mockTestimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-healthcare-green/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-background rounded-full mb-4">
            <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary" variant="solid" />
            <span className="text-sm font-medium text-primary">Müşteri Yorumları</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Binlerce mutlu müşterimizin deneyimlerini keşfedin
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-medical hover:shadow-medical-hover transition-all duration-base z-10"
            aria-label="Previous testimonial">

            <Icon name="ChevronLeftIcon" size={24} className="text-primary" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-medical hover:shadow-medical-hover transition-all duration-base z-10"
            aria-label="Next testimonial">

            <Icon name="ChevronRightIcon" size={24} className="text-primary" />
          </button>

          <div className="bg-card rounded-3xl shadow-medical p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) =>
                  <Icon key={i} name="StarIcon" size={20} className="text-warning" variant="solid" />
                  )}
                </div>

                <p className="text-lg text-text-primary mb-6 leading-relaxed">
                  "{currentTestimonial.content}"
                </p>

                <div>
                  <p className="text-xl font-bold text-text-primary">{currentTestimonial.name}</p>
                  <p className="text-sm text-text-secondary">{currentTestimonial.role}</p>
                  <p className="text-sm text-text-tertiary">{currentTestimonial.company}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {mockTestimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-base ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'}`
              }
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default Testimonials;