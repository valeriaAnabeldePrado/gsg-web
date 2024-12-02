"use client";
import Image from "next/image";

const ProductList = ({ items, suffix = "", title }) => (
  <div className="flex flex-col gap-4">
    <h3>{title}</h3>
    {items.map((el, i) => (
      <div key={i} className="flex gap-4">
        <p> {el}</p>
        <p> {suffix}</p>
      </div>
    ))}
  </div>
);

export default function Measure({ product }) {
  const prodArr = product.tecnical;

  return (
    <div className="flex flex-row  gap-8 flex-wrap">
      <ProductList items={prodArr.finishes} title={"Terminaciones"} />
      <ProductList items={prodArr.watt} suffix="W" title={"Potencia"} />
      <ProductList items={prodArr.tonos} title={"Tono"} />
      <ProductList items={prodArr.diam} suffix="ø" title={"Diametro"} />
      <p>Led Incluido: {prodArr.led ? "SI" : "NO"}</p>
    </div>
  );
}
