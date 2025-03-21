'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './hero-style.css';
import React from 'react';
import logoBanner from '../../../public/imagenes/logoS.svg';
import portadaResp from '../../../public/imagenes/bannerResponsive.png';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const divHeroResp = useRef(null);
  const frameCount = 85;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const canvas = canvasRef.current;
    const div = divRef.current;
    const context = canvas.getContext('2d');
    const heroRef = divHeroResp.current;

    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index) =>
      `https://res.cloudinary.com/mauloboo/image/upload/v1720021701/gsg/${(
        index + 1
      )
        .toString()
        .padStart(4, '0')}.jpg`;

    const images = [];
    const airpods = {
      frame: 0,
    };

    for (let i = 20; i < frameCount; i++) {
      const img = document.createElement('img');
      img.onload = () => {
        images[i - 20] = img;
        if (images.length === frameCount - 20) {
          render();
        }
      };
      img.src = currentFrame(i);
    }
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    mm.add('(max-width: 800px)', () => {
      gsap.to(div, {
        display: 'none',
      });
      const timeline = gsap.timeline();
      timeline.fromTo('.logo', { opacity: 0 }, { opacity: 1, duration: 2 });
      timeline.to('.uno', { opacity: 1 });
      timeline.to('.dos', { opacity: 1 });
      timeline.to('.line-span-hero', { opacity: 1 });
      timeline.to('.tres', { opacity: 1 });
    });
    mm.add('(min-width: 801px)', () => {
      gsap.to(heroRef, {
        display: 'none',
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.heroDesk-pin',
          start: 'top top',
          end: 'center bottom-=1500 ',
          pin: true,
          pinSpacer: false,
          markers: false,
          scrub: 2,
          onUpdate: render,
        },
      });

      timeline.to(airpods, {
        frame: frameCount,
        snap: 'frame',
        ease: 'none',
        onUpdate: render,
      });

      timeline.to('.centered-text', { opacity: 1, duration: 2 });
    });
    function render() {
      if (images[airpods.frame]) {
        const img = images[airpods.frame];
        const canvasAspectRatio = canvas.width / canvas.height;
        const imgAspectRatio = img.width / img.height;

        let drawWidth, drawHeight, drawX, drawY;

        if (canvasAspectRatio > imgAspectRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspectRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspectRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => {
      mm.revert();
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [divRef]);

  return (
    <>
      <div className="relative w-full h-screen ">
        <div ref={divRef} className="heroDesk">
          <canvas
            id="hero-lightpass"
            className="w-full canvasH h-screen"
            ref={canvasRef}
          ></canvas>
          <h1 className="absolute centered-text opacity-0">We are light</h1>
        </div>

        {/* ----------DISEÑO RESP-CELU Y TABLET---------- */}
        <div ref={divHeroResp}>
          <div className="absolute cont-logo">
            <Image
              src={logoBanner}
              fill
              priority={true}
              alt="logo"
              className="logo"
            />
          </div>
          <div className="relative cont-bannerResp h-screen">
            <Image
              src={portadaResp}
              fill
              priority={true}
              alt="portada"
              className="bannerResp"
            />
          </div>

          <section className="cont-title absolute">
            <h1 className="hidden ">GSG diseño</h1>
            <h2 className="title-hero uno">Distinción</h2>
            <h2 className="title-hero_ligth dos">Innovación</h2>
            <div className="flex items-center">
              <span className="line-span-hero "></span>
              <h2 className="title-hero_ligth mx-5 tres">Minimalismo</h2>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
