import { Inter } from 'next/font/google';
import './globals.css';
import MenuNav from '@/components/navMenu/menuNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GSG DESIGN',
  description:
    'Descubre los mejores perfiles de aluminio para luces LED en Argentina. Calidad superior, diseño innovador y atención personalizada. Mejora tus proyectos de iluminación hoy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MenuNav />
        {children}
      </body>
    </html>
  );
}
