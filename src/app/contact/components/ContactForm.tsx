'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceTypes = [
    'Tamamlayıcı Sağlık Sigortası',
    'Poliçe Yenileme',
    'Hasar Talebi',
    'Genel Bilgi',
    'Diğer',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className={`py-12 lg:py-16 bg-surface ${className}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Bize Ulaşın
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Formu doldurun, en kısa sürede size geri dönelim
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-medical">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start">
              <Icon name="CheckCircleIcon" size={24} className="text-success mr-3 flex-shrink-0 mt-0.5" variant="solid" />
              <div>
                <h4 className="font-semibold text-success mb-1">Mesajınız Başarıyla Gönderildi!</h4>
                <p className="text-sm text-text-secondary">
                  En kısa sürede size geri dönüş yapacağız. Teşekkür ederiz.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Adınız Soyadınız <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                  placeholder="Ahmet Yılmaz"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  E-posta Adresiniz <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                  placeholder="ahmet@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                  Telefon Numaranız <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                  placeholder="0555 123 45 67"
                />
              </div>
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-text-primary mb-2">
                  Hizmet Türü <span className="text-error">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base bg-card"
                >
                  <option value="">Seçiniz</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                Konu <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                placeholder="Mesajınızın konusunu belirtin"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Mesajınız <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base resize-none"
                placeholder="Detaylı mesajınızı buraya yazın..."
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy"
                required
                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="privacy" className="ml-3 text-sm text-text-secondary">
                <a href="#" className="text-primary hover:underline">Gizlilik Politikası</a> ve{' '}
                <a href="#" className="text-primary hover:underline">Kullanım Koşulları</a>'nı okudum ve kabul ediyorum.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-healthcare-green text-healthcare-green-foreground font-semibold text-base rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-base flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={20} className="mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Icon name="PaperAirplaneIcon" size={20} className="mr-2" />
                  Mesaj Gönder
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;