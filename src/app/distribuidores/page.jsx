import React from "react";
import "../productos/productosSection.css";
import Image from "next/image";
import logo from "../../../public/imagenes/logoBanner.png";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;

const Distribuidores = () => {
  return (
    <div className="container-main-productos">
      <div className="py-6">
        <h1>Distribuidores</h1>
      </div>
      <div className="h-32 bg-black"></div>
      <div className="py-20 flex flex-wrap flex-row ">
        <div className="md:w-[70%]">
          <TextGenerateEffect words={words} duration={0.1} />
          {/* <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, nam!
            Ab velit minus eligendi eos. Officia optio ut voluptatum, minus
            delectus numquam atque repellendus reprehenderit quia, est dolorem,
            nostrum culpa?
          </p> */}
        </div>
        <section className="w-100% flex-1 flex items-center justify-center ">
          <Image src={logo} height={100} width={100} className="" />
        </section>
      </div>
      <div className="py-6 flex align-middle justify-center">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ehbc=2E312F"
          width="640"
          height="480"
        ></iframe>
      </div>
    </div>
  );
};

export default Distribuidores;
