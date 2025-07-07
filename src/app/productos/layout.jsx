import FooterM from '@/components/footer/footer';

export const metadata = {
  title: 'Productos',
  description: 'Seccion de productos',
};

export default function ProductsLayout({ children }) {
  return (
    <div className="pt-10">
      {children}
      <FooterM />
    </div>
  );
}
