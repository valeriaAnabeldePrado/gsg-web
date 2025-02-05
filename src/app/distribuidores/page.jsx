import React from 'react';
import Image from 'next/image';
import FooterM from '@/components/footer/footer';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import './distribuidores.css';

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;

const Distribuidores = () => {
  return (
    <div className="container-main-productos">
      <h2 className="stroke-text-title">Distribuidores</h2>

      <section className="container-distribuidores">
        <div className=" flex flex-wrap flex-row ">
          <div className="md:w-[70%]">
            <TextGenerateEffect
              words={words}
              duration={0.1}
              className="cont-text-type"
            />
          </div>
        </div>
        <div className=" flex align-middle justify-center  ">
          <iframe
            className="rounded-2xl"
            src="https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ehbc=2E312F"
            width="440"
            height="630"
          ></iframe>
        </div>
      </section>
      <div className="cont-footer-dis">
        <FooterM />
      </div>
    </div>
  );
};

export default Distribuidores;
