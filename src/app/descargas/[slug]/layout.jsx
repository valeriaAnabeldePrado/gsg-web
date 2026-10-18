import FooterM from '@/components/footer/footer';

export default function DescargasLayout({ children }) {
  return (
    <div className="pt-10">
      {children}
      <FooterM />
    </div>
  );
}
