import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';
import MenuNav from '@/components/navMenu/menuNav';
import GTM from '@/components/tag';
import Clarity from '@/components/Clarity';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Loader from '@/components/ui/Loader';
import { Analytics } from '@vercel/analytics/next';
import WhatsAppWidget from '@/components/whatsapp/WhatsAppWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  icons: {
    icon: './favicon.ico',
  },
  title: 'GSG DESIGN',
  description:
    'Descubre los mejores perfiles de aluminio para luces LED en Argentina. Calidad superior, diseño innovador y atención personalizada. Mejora tus proyectos de iluminación hoy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DWR0LF6SVP"
          strategy="beforeInteractive"
        />
        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DWR0LF6SVP');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Loader />
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
        <GTM />
        <Clarity />
        <Analytics />
        <WhatsAppWidget />
        <MenuNav />
        {children}
      </body>
    </html>
  );
}
