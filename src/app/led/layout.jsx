import FooterM from '@/components/footer/footer';

export const metadata = {
  title: 'Leds',
  description: 'Seccion de leds',
};

export default function ProductsLayout({ children }) {
  return (
    <div className="pt-10">
      {children}
      <FooterM />
    </div>
  );
}
