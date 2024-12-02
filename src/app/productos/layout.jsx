import ListSelectedProducts from "@/components/list-selected-products/ListSelectedProducts";

export const metadata = {
  title: "Products",
  description: "Seccion de productos",
};

export default function ProductsLayout({ children }) {
  return (
    <div>
      <ListSelectedProducts />
      {children}
    </div>
  );
}
