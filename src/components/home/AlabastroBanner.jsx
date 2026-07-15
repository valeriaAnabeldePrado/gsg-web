'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function AlabastroBanner() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.08, filter: 'blur(8px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.8',
        )
        .fromTo(
          '.alabastro-badge',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.9',
        )
        .fromTo(
          '.alabastro-char',
          { opacity: 0, y: 40, rotateX: 25 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.5',
        )
        .fromTo(
          '.alabastro-text',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5',
        )
        .fromTo(
          '.alabastro-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        );

      // Parallax suave en la imagen al hacer scroll
      gsap.fromTo(
        '.alabastro-image-inner img',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = 'Alabastro';

  return (
    <section className="alabastro-section" ref={sectionRef}>
      <div className="alabastro-bg-text" aria-hidden="true">
        Alabastro
      </div>

      <div className="alabastro-container">
        <div className="alabastro-image-wrap" ref={imageRef}>
          <div className="alabastro-image-inner">
            <Image
              src="/alabastro.png"
              alt="Colección Alabastro"
              fill
              className="object-cover"
              sizes="(max-width: 968px) 80vw, 40vw"
            />
          </div>
          <div className="alabastro-image-glow" aria-hidden="true" />
        </div>

        <div className="alabastro-content" ref={contentRef}>
          <span className="alabastro-badge">Nueva colección</span>

          <h2 className="alabastro-title" style={{ perspective: '1000px' }}>
            {title.split('').map((char, index) => (
              <span
                key={index}
                className="alabastro-char"
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center bottom',
                }}
              >
                {char}
              </span>
            ))}
          </h2>

          <p className="alabastro-text">
            Luminarias que dialogan con la piedra. Textura, calidez y diseño
            contemporáneo se funden en una línea exclusiva pensada para
            proyectos residenciales y comerciales de alto nivel.
          </p>

          <Link
            href="/productos?categoria=alabastro"
            className="alabastro-cta"
          >
            Descubrir Alabastro
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
