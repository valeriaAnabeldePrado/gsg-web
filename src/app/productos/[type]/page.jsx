import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page({ params }) {
 const { type } = params;

  // const productos = fetch(url+type)
  const productosType = [
    {
      code: "sat-s",
      name: "Colgante Saturno Simple",
      url: "/imagenes/galeria/img1.png",
    },
    {
      id: 124,
      name: "Led 2",
      url: "/imagenes/galeria/img2.png",
    },
    {
      id: 125,
      name: "Led 3",
      url: "/imagenes/galeria/img3.png",
    },
  ];

  return (
    <div>
      <h1>{type}</h1>
      <div className="flex gap-10">
        {productosType.map((el) => {
          return (
            <Link key={el.id} href={`${type}/${el.id}`}>
              <div className="h-auto w-auto">
                <Image src={el.url} height={200} width={200} alt={el.name} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
