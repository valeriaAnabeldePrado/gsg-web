import ListSelectedProducts from "@/components/list-selected-products/ListSelectedProducts";
import React from "react";
import Image from "next/image";
import "./productosSection.css";
import FooterM from "@/components/footer/footer";

const Productos = () => {
  const images = [
    {
      src: "/imagenes/galeria/img1.png",
      alt: "Image 1",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgUno",
      classImg: "imgUnoH",
    },
    {
      src: "/imagenes/galeria/img2.png",
      alt: "Image 2",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgDos",
      classImg: "imgDosH",
    },
    {
      src: "/imagenes/galeria/img3.png",
      alt: "Image 3",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgTres",
      classImg: "imgTresH",
    },
    {
      src: "/imagenes/galeria/img4.png",
      alt: "Image 4",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgCuatro",
      classImg: "imgCuatroH",
    },
    {
      src: "/imagenes/galeria/img5.png",
      alt: "Image 5",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgCinco",
      classImg: "imgCincoH",
    },
    {
      src: "/imagenes/galeria/img6.png",
      alt: "Image 6",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgSeis",
      classImg: "imgSeisH",
    },
    {
      src: "/imagenes/galeria/img1.png",
      alt: "Image 7",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgSiete",
      classImg: "imgSieteH",
    },
    {
      src: "/imagenes/galeria/img2.png",
      alt: "Image 8",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgOcho",
      classImg: "imgOchoH",
    },
    {
      src: "/imagenes/galeria/img5.png",
      alt: "Image 5",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgNueve",
      classImg: "imgNueveH",
    },
    {
      src: "/imagenes/galeria/img3.png",
      alt: "Image 3",
      title: "Nombre del objeto",
      category: "Categoría del objeto",
      classname: "imgDiez",
      classImg: "imgDiezH",
    },
  ];
  return (
    <>
      <div className="container-main-productos">
        <ListSelectedProducts />
        <section className="flex items-center justify-center">
          <div className="container">
            <div className="gallery">
              {images.map((image, index) => (
                <div key={index} className={`relative ${image.classname}`}>
                  <div className={`imageContainer relative ${image.classImg}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="imgGaleria"
                    />
                  </div>
                  <div className="imageInfo">
                    <h3>{image.title}</h3>
                    <p>{image.category}</p>
                  </div>
                </div>
              ))}
              <p className="textGallery">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                optio doloribus excepturi cum repellat praesentium ex veritatis
                deleniti eaque quasi, voluptate corrupti vel doloremque esse
                nihil, inventore enim, nobis exercitationem.
              </p>
            </div>
          </div>
        </section>
        <FooterM />
      </div>
    </>
  );
};

export default Productos;
