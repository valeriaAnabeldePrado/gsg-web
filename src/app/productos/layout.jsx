import FooterM from "@/components/footer/footer";
import ListSelectedProducts from "@/components/list-selected-products/ListSelectedProducts";

export const metadata = {
  title: "Products",
  description: "Seccion de productos",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="pt-10">
      <ListSelectedProducts />
      {children}
      <div className="footer-l">
        <FooterM />
      </div>
      <section className="w-full h-[10vh] bg-slate-200"></section>
    </div>
  );
}
