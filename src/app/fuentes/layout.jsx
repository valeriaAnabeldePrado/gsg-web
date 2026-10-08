import FooterM from '@/components/footer/footer';

export const metadata = {
  title: 'Fuentes LED',
  description:
    'Fuentes de alimentación LED Slim y Ultra Slim de 12 V y 24 V para tiras e instalaciones de iluminación LED.',
};

export default function FuentesLayout({ children }) {
  return (
    <div className="pt-10">
      {children}
      <FooterM />
    </div>
  );
}
