import { Inter } from 'next/font/google';
import './globals.css';
import MenuNav from '@/components/navMenu/menuNav';
import GTM from '@/components/tag';
import Head from 'next/head';

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
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-607559145"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-607559145');
          `}
        </script>
      </Head>
      <body className={inter.className}>
        <GTM />
        <MenuNav />

        {children}
      </body>
    </html>
  );
}
