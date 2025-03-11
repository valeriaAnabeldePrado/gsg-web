import FooterM from '@/components/footer/footer';

export const metadata = {
  title: 'Accesorios',
  description: 'Seccion de accesorios',
};

export default function ProductsLayout({ children }) {
  return <div className="pt-10">{children}</div>;
}
