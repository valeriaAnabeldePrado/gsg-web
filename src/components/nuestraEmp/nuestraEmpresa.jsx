"use client";
import React from "react";
import "./estiloNuestra.css";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NuestraEmp = () => {
  const divRefD = useRef(null);
  const text =
    "Somos una empresa innovadora y en constante movimiento. Buscamos día a día tecnologías y procesos que nos permitan crear luminarias con un diseño diferencial.";

  const palabras = text.split(" ");

  useGSAP(() => {
    const spans = document.querySelectorAll(".split span");

    gsap.to(spans, {
      y: 0,
      stagger: 0.1,
      ease: "power1.out",
      duration: 1,
      scrollTrigger: {
        trigger: divRefD.current,
        start: "top center",
        end: "center center",
        scrub: 1,
        markers: false,
      },
    });
  }, []);

  return (
    <div className="container-nuestraEmp" ref={divRefD}>
      <div className="container-textosNuestra">
        <h2 className="titulo">Nuestra empresa</h2>
        <p className="texto texto-nuestra split">
          {palabras.map((word, index) => (
            <span key={index}>{word}&nbsp;</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default NuestraEmp;
