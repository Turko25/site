import ClientLayout from '@/components/ClientLayout'; // Az önce oluşturduğumuz wrapper
import Header from '@/components/Header'; // Veritabanlı Header
import Footer from '@/components/Footer'; // Veritabanlı Footer

export const metadata = {
  title: 'TSS Insurance Portal',
  description: 'Professional insurance solutions and services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Hata yakalayıcı ve Provider'lar buranın içinde */}
        <ClientLayout>
          <div className="flex flex-col min-h-screen">
            {/* Header artık burada ve veritabanından geliyor */}
            <Header /> 
            
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer artık burada ve veritabanından geliyor */}
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}