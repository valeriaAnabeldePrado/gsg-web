'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FooterM from '@/components/footer/footer';
import './nosotros-premium.css';

gsap.registerPlugin(ScrollTrigger);

const Nosotros = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal & Parallax
      const tl = gsap.timeline();
      tl.to('.atelier-label', { y: 0, opacity: 1, duration: 1, delay: 0.5 });
      
      const titleLines = document.querySelectorAll('.text-reveal-line span');
      gsap.to(titleLines, {
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.8
      });

      // Hero Image Internal Parallax (Opposite to scroll)
      gsap.to('.atelier-hero-img img', {
        scale: 1.1,
        yPercent: 20, // Moves down as you scroll down
        ease: 'none',
        scrollTrigger: {
          trigger: '.atelier-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Intro Text Reveal
      gsap.from('.intro-lead', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.atelier-intro',
          start: 'top 70%',
        }
      });
      
      // 3. EXTREME MULTI-DIRECTIONAL COLUMN PARALLAX
      // Column 1: Moves UP drastically
      gsap.fromTo('.strip-col-1', 
        { y: 100 }, 
        { y: -250, ease: 'none', scrollTrigger: { trigger: '.atelier-gallery', start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );
      
      // Column 2: Moves DOWN drastically (Inverse behavior)
      gsap.fromTo('.strip-col-2', 
        { y: -200 }, 
        { y: 100, ease: 'none', scrollTrigger: { trigger: '.atelier-gallery', start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );
      
      // Column 3: Moves UP fast
      gsap.fromTo('.strip-col-3', 
        { y: 150 }, 
        { y: -150, ease: 'none', scrollTrigger: { trigger: '.atelier-gallery', start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );

      // ** ALTERNATING INTERNAL IMAGE PARALLAX **
      // Odd images go one way, even images go the other within their masks
      const stripImages = document.querySelectorAll('.strip-image-box img');
      stripImages.forEach((img, index) => {
        // Direction keeps flipping based on index for chaotic but professional feel
        const direction = index % 2 === 0 ? -15 : 15; 
        
        gsap.fromTo(img, 
          { scale: 1.3, yPercent: direction },
          { scale: 1.3, yPercent: -direction, ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // 4. Value Blocks Parallax (Opposing Text vs Image)
      const blocks = document.querySelectorAll('.value-block');
      blocks.forEach((block, index) => {
        // Text fades in
        gsap.from(block.querySelector('.value-content'), {
          y: 50, opacity: 0, duration: 1,
          scrollTrigger: { trigger: block, start: 'top 60%', end: 'bottom 60%', scrub: 1 }
        });
        
        // Image moves OPPOSITE to everything else
        const img = block.querySelector('img');
        const imgDir = index % 2 === 0 ? 25 : -25;
        
        gsap.fromTo(img, 
          { scale: 1.2, yPercent: -imgDir },
          { scale: 1.2, yPercent: imgDir, ease: 'none',
            scrollTrigger: { trigger: block, start: 'top bottom', end: 'bottom top', scrub: 0 }
          }
        );
      });
      
      // 5. Factory Parallax
      gsap.fromTo('.factory-bg img',
        { yPercent: -25, scale: 1.1 },
        { yPercent: 10, scale: 1.1, ease: 'none',
          scrollTrigger: {
            trigger: '.factory-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="nosotros-page" ref={containerRef}>
      {/* 1. HERO (Atelier) */}
      <section className="atelier-hero">
        <div className="atelier-hero-img">
           <Image src="/gsg/STK-H.png" alt="GSG High Tech Stock" fill priority />
        </div>
        <div className="atelier-hero-content">
          <span className="atelier-label">GSG Architectural Lighting</span>
          <h1 className="atelier-title">
            <div className="text-reveal-line"><span>Diseño.</span></div>
            <div className="text-reveal-line"><span>Identidad.</span></div>
            <div className="text-reveal-line"><span>Luz.</span></div>
          </h1>
        </div>
      </section>

      {/* 2. INTRO (Atelier) */}
      <section className="atelier-intro">
        <div className="container-fluid intro-grid">
          <div>
            <h2 className="intro-lead">
              Transformamos el aluminio y la luz en herramientas para la arquitectura contemporánea.
            </h2>
          </div>
          <div>
            <p className="intro-desc">
              Desde 2013, nuestra planta en Buenos Aires ha sido un laboratorio de experimentación. No solo fabricamos luminarias; desarrollamos sistemas que se integran silenciosamente en el espacio o se convierten en protagonistas, según lo dicte el proyecto.
            </p>
            <p className="intro-desc">
              Controlamos cada etapa del proceso: desde la extrusión del perfil hasta la electrónica final, garantizando una calidad que solo la industria nacional bien hecha puede ofrecer.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX GALLERY (Extreme Motion) */}
      <section className="atelier-gallery">
        <div className="container-fluid">
          <div className="strip-container">
            {/* Column 1 - Moves UP */}
            <div className="strip-col strip-col-1">
              <div>
                <div className="strip-image-box">
                  <Image src="/gsg/PIN.png" alt="Diseño Minimalista" fill />
                </div>
                <div className="strip-info"><span>Serie PIN</span></div>
              </div>
              <div style={{ marginTop: '10vh' }}>
                <div className="strip-image-box">
                   <Image src="/gsg/P02.png" alt="Sistema P02" fill />
                </div>
                 <div className="strip-info"><span>Sistema P02</span></div>
              </div>
            </div>
             {/* Column 2 - Moves DOWN */}
             <div className="strip-col strip-col-2" style={{ paddingTop: '0' }}>
              <div>
                <div className="strip-image-box">
                   <Image src="/gsg/hallH.png" alt="Nuestra Planta" fill />
                </div>
                <div className="strip-info"><span>Headquarters</span></div>
              </div>
              <div style={{ marginTop: '10vh' }}>
                <div className="strip-image-box">
                  <Image src="/gsg/tex.png" alt="Texturas y Materialidad" fill />
                </div>
                 <div className="strip-info"><span>Materialidad</span></div>
              </div>
            </div>
            {/* Column 3 - Moves UP */}
            <div className="strip-col strip-col-3" style={{ paddingTop: '15vh' }}>
              <div>
                <div className="strip-image-box">
                   <Image src="/gsg/PGA.png" alt="Detalle de Perfil" fill />
                </div>
                <div className="strip-info"><span>PGA Detail</span></div>
              </div>
               <div style={{ marginTop: '10vh' }}>
                <div className="strip-image-box">
                   <Image src="/gsg/bod-170.png" alt="Procesos de Fabrica" fill />
                </div>
                <div className="strip-info"><span>Manufactura</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION (Occhio Style - Enhanced Parallax) */}
      <section className="values-parallax-section">
        <div className="values-parallax-container">
          
          {/* Block 1: Customization */}
          <div className="value-block">
            <div className="value-img-wrapper">
               <Image src="/gsg/Pne.png" alt="Personalización Flexibles" fill />
            </div>
            <div className="value-content">
              <span className="value-kicker">Personalización</span>
              <h3 className="value-headline">Diseño a tu medida.</h3>
              <p className="value-description">
                Cada proyecto arquitectónico es único. Adaptamos longitudes, colores y ópticas de nuestros sistemas lineales para cumplir exactamente con tu visión, sin los límites de productos estándar rígidos.
              </p>
            </div>
          </div>

          {/* Block 2: Technology (Reverse) */}
          <div className="value-block reverse">
            <div className="value-img-wrapper">
               <Image src="/gsg/kro-500.png" alt="Tecnología de Vanguardia" fill />
            </div>
            <div className="value-content">
              <span className="value-kicker">Tecnología</span>
              <h3 className="value-headline">Ingeniería de precisión.</h3>
              <p className="value-description">
                Calidad de luz superior. Utilizamos componentes de líderes mundiales como Philips y Tridonic, junto con disipadores de aluminio calculados térmicamente para garantizar una vida útil que supera los estándares de la industria.
              </p>
            </div>
          </div>

          {/* Block 3: Manufacture */}
          <div className="value-block">
            <div className="value-img-wrapper">
               <Image src="/gsg/hall.png" alt="Producción Nacional" fill />
            </div>
            <div className="value-content">
              <span className="value-kicker">Manufactura</span>
              <h3 className="value-headline">100% Industria Argentina.</h3>
              <p className="value-description">
                Control total del proceso. Desde nuestra planta en CABA, supervisamos cada detalle, desde el corte láser hasta el ensamblaje final, asegurando agilidad en los tiempos de respuesta y una posventa real.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FACTORY (Atelier) */}
      <section className="factory-section">
        <div className="factory-bg">
           <Image src="/gsg/p01-tr.png" alt="Visita Nuestra Fábrica" fill />
        </div>
        <div className="factory-overlay">
          <h2 className="factory-title">Ven a conocer<br/>nuestra fábrica.</h2>
          <Link href="/contacto" className="factory-btn">
            Agendar Visita
          </Link>
        </div>
      </section>

      <FooterM />
    </div>
  );
};

export default Nosotros;
