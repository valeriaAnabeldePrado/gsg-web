'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '@/app/home/home-premium.css';

gsap.registerPlugin(ScrollTrigger);

// Icons
const LightBulbIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M9 21h6M12 3a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.81c1.79-1.03 3-2.97 3-5.19a6 6 0 0 0-6-6z" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

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

const TruckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
    <path d="M18 14l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L16 16l1.5-.5.5-1.5z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const LeafIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6.5 21.5c3-3 7-6 10.5-9C20 9 21 6 21 3c-3 0-6 1-9.5 4-3.5 3.5-6 7.5-9 10.5" />
    <path d="M3 21c3-3 3-9 3-9s6 0 9-3" />
  </svg>
);

// Productos destacados
const featuredProducts = [
  {
    id: 1,
    name: 'Perfiles LED',
    category: 'Perfiles',
    image: '/home/card-perfiles.webp',
    link: '/productos?categoria=Perfiles',
  },
  {
    id: 2,
    name: 'Luminarias de Techo',
    category: 'Techo',
    image: '/home/card-techo.webp',
    link: '/productos?categoria=Techo',
  },
  {
    id: 3,
    name: 'Luminarias Colgantes',
    category: 'Colgantes',
    image: '/home/card-colgantes.webp',
    link: '/productos?categoria=colgantes',
  },
  {
    id: 4,
    name: 'Luminarias de Pared',
    category: 'Pared',
    image: '/home/card-pared.webp',
    link: '/productos?categoria=pared',
  },
  {
    id: 5,
    name: 'Iluminación Exterior',
    category: 'Exterior',
    image: '/home/card-exterior.webp',
    link: '/productos?categoria=exterior',
  },
  {
    id: 6,
    name: 'Luminarias de Pie',
    category: 'Pie',
    image: '/home/card-pie.webp',
    link: '/productos?categoria=pie',
  },
  {
    id: 7,
    name: 'Tiras LED',
    category: 'Tiras LED',
    image: '/home/card-tiras-led.webp',
    link: '/led',
  },
  {
    id: 8,
    name: 'Accesorios',
    category: 'Complementos',
    image: '/gsg/portadas/accesorios.png',
    link: '/accesorios',
  },
];

const features = [
  {
    icon: <LightBulbIcon />,
    title: 'Tecnología LED de Última Generación',
    text: 'Productos con eficiencia lumínica superior y vida útil de hasta 50,000 horas. Iluminación que transforma espacios.',
    number: '01',
  },
  {
    icon: <ShieldIcon />,
    title: 'Garantía Premium 5 Años',
    text: 'Respaldamos cada producto con garantía extendida y servicio técnico especializado en todo el país.',
    number: '02',
  },
  {
    icon: <ZapIcon />,
    title: '80% Ahorro Energético',
    text: 'Reduce drásticamente tu consumo eléctrico mientras disfrutas de iluminación superior y ambientes perfectos.',
    number: '03',
  },
  {
    icon: <TruckIcon />,
    title: 'Entrega en Todo el País',
    text: 'Red logística nacional con más de 100 distribuidores. Tu pedido llega donde lo necesites.',
    number: '04',
  },
  {
    icon: <SparklesIcon />,
    title: 'Diseños Exclusivos',
    text: 'Más de 200 productos únicos que combinan funcionalidad, estética y la más alta calidad en cada detalle.',
    number: '05',
  },
  {
    icon: <LeafIcon />,
    title: 'Compromiso Sustentable',
    text: 'Productos eco-friendly con materiales reciclables y procesos de fabricación responsables con el medio ambiente.',
    number: '06',
  },
];

const heroSlides = [
  {
    id: 1,
    image: '/home/hero1.webp',
    label: '130+ DISTRIBUIDORES',
    title: 'Espacios que inspiran',
    subtitle: 'Luminarias LED de fabricación argentina',
    cta: { text: 'ENCONTRAR DISTRIBUIDOR', href: '/distribuidores' },
  },
  {
    id: 2,
    image: '/home/hero2.webp',
    label: 'LÍNEA PROFESIONAL',
    title: 'Iluminación Arquitectónica',
    subtitle: 'Soluciones LED diseñadas para integrarse de forma precisa en proyectos corporativos, comerciales y arquitectónicos.',
    cta: { text: 'VER PROYECTOS', href: '/productos' },
  },
  {
    id: 3,
    image: '/home/hero3.webp',
    label: 'COLECCIÓN ALABASTRO',
    title: 'Diseño y Materialidad',
    subtitle: 'Piezas lumínicas que combinan tecnología LED, materiales nobles y una estética contemporánea para proyectos de alto nivel.',
    cta: { text: 'DESCUBRIR COLECCIÓN', href: '/productos' },
  },
];

const stats = [
  { number: '12', label: 'Años de experiencia' },
  { number: '133', label: 'Distribuidores' },
  { number: '24', label: 'Provincias' },
  { number: '100%', label: 'Fabricación e importación propia' },
];

export default function HomePremium() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);
  const productsScrollRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const titleRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (productsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        productsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollProducts = (direction) => {
    if (productsScrollRef.current) {
      const scrollAmount = productsScrollRef.current.clientWidth * 0.8;
      productsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animación inicial del hero (solo una vez)
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Animación del badge con efecto de escaneo
      gsap.fromTo(
        '.hero-badge',
        {
          opacity: 0,
          scale: 0.8,
          filter: 'brightness(0)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1)',
          duration: 0.8,
          ease: 'power2.out',
        },
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.stats-strip',
            start: 'top 80%',
          },
        },
      );

      // About section
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
          },
        },
      );

      // About section entry animation
      gsap.fromTo(
        ['.tech-main-image', '.tech-glass-card'],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
          },
        },
      );

      // About Parallax Effect (Restaurado y Potenciado)
      // Caja grande: movimiento hacia arriba
      gsap.fromTo(
        '.tech-main-image',
        { y: 0 },
        {
          y: -80, // Aumentado para que se note más
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );

      // Caja chica: movimiento hacia abajo
      gsap.fromTo(
        '.tech-glass-card',
        { y: 0 },
        {
          y: 100, // Aumentado para que se note más
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      );

      // Texto: movimiento sutil hacia arriba (capa intermedia)
      gsap.fromTo(
        '.about-content',
        { y: 0 },
        {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );

      // Products animation
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.products-showcase',
            start: 'top 70%',
          },
        },
      );

      // Features animation (Simple fade up, sticky does the rest)
      gsap.fromTo(
        '.feature-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 60%',
          },
        },
      );

      // Inspiration Parallax
      gsap.fromTo(
        '.inspiration-image img',
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.inspiration-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        '.inspiration-content',
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.inspiration-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      // Design Parallax
      gsap.fromTo(
        '.design-image img',
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.design-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        '.design-content',
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.design-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [mounted]);

  // Animación del título cuando cambia el slide
  useEffect(() => {
    if (!mounted || !titleRef.current) return;

    const titleText = heroSlides[currentSlide].title;
    // Dividir por palabras para una animación más elegante
    const words = titleText.split(' ');

    titleRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="hero-word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: bottom; margin-right: 0.25em;">
             <span class="hero-word" style="display: inline-block; transform: translateY(100%);">${word}</span>
           </span>`,
      )
      .join('');

    const wordElements = titleRef.current.querySelectorAll('.hero-word');

    // Animación de entrada elegante (Reveal desde abajo)
    gsap.fromTo(
      wordElements,
      {
        y: '100%',
        opacity: 0,
        filter: 'blur(10px)',
        rotateX: 20,
      },
      {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      },
    );

    // Label fade in
    gsap.fromTo(
      '.hero-label',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    );

    // Subtítulo con fade in suave y subida
    gsap.fromTo(
      '.hero-subtitle',
      {
        opacity: 0,
        y: 20,
        filter: 'blur(5px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      },
    );

    // CTA fade in
    gsap.fromTo(
      '.hero-slide-cta',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' },
    );
  }, [mounted, currentSlide]);

  if (!mounted) return null;

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-premium" ref={heroRef}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-image-container">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="hero-overlay"></div>
            </div>
          </div>
        ))}

        <div className="hero-content">
          <span className="hero-label">{heroSlides[currentSlide].label}</span>

          <h1 className="hero-title" ref={titleRef}>
            {heroSlides[currentSlide].title}
          </h1>

          <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>

          <Link
            href={heroSlides[currentSlide].cta.href}
            className="hero-slide-cta"
          >
            {heroSlides[currentSlide].cta.text} <ArrowRightIcon />
          </Link>

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" ref={aboutRef}>
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">Nuestra Empresa</span>
            <h2 className="about-title">
              Soluciones LED para proyectos profesionales
            </h2>
            <p className="about-text">
              Más de 12 años desarrollando soluciones de iluminación para
              distribuidores, comercios y proyectos en todo el país.
            </p>
            <Link href="/nosotros" className="btn-glow">
              Conocer más
            </Link>
          </div>

          <div className="about-visual">
            <div className="tech-visual-container">
              <div className="tech-main-image">
                <Image
                  src="/home/empresa.webp"
                  alt="Fabricación propia GSG"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SHOWCASE */}
      <section className="home-products-showcase" ref={productsRef}>
        <div className="home-products-header">
          <h2>Nuestras Líneas</h2>
          <p>Soluciones de iluminación para cada proyecto</p>
        </div>

        <div className="home-products-grid">
          {featuredProducts.map((product) => (
            <Link
              href={product.link}
              key={product.id}
              className="home-product-card"
            >
              <div className="home-product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="home-product-info">
                <span className="home-product-category">
                  {product.category}
                </span>
                <h3 className="home-product-name">{product.name}</h3>
                <span className="home-product-link">
                  Ver más <ArrowRightIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSPIRATION SECTION */}
      <section className="inspiration-section">
        <div className="inspiration-container">
          <div className="inspiration-image">
            <Image
              src="/home/ilu-experiencia.webp"
              alt="La iluminación como experiencia"
              fill
              className="object-cover"
            />
          </div>
          <div className="inspiration-content">
            <span className="section-label">NUESTRA VISIÓN</span>
            <h2 className="inspiration-title">La iluminación como experiencia</h2>
            <p className="inspiration-text">
              Desarrollamos soluciones LED que combinan diseño, funcionalidad y
              tecnología para proyectos residenciales y comerciales.
            </p>
            <Link href="/nosotros" className="btn-link">
              CONOCER MÁS
            </Link>
          </div>
        </div>
      </section>

      {/* DESIGN SECTION */}
      <section className="design-section">
        <div className="design-container">
          <div className="design-content">
            <span className="section-label">PROYECTOS PROFESIONALES</span>
            <h2 className="design-title">Soluciones LED para obras y comercios</h2>
            <p className="design-text">
              Trabajamos junto a distribuidores, estudios y empresas desarrollando
              soluciones de iluminación para proyectos residenciales, comerciales
              y corporativos.
            </p>
            <Link href="/productos" className="btn-link">
              VER PRODUCTOS
            </Link>
          </div>
          <div className="design-image">
            <Image
              src="/proyectos-profesionales.webp"
              alt="Proyectos Profesionales"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-bg">
          <Image
            src="/home/cta-final.webp"
            alt="Iluminación profesional"
            fill
            className="object-cover"
          />
          <div className="cta-overlay" />
        </div>

        <div className="cta-inner">
          <div className="cta-main">
            <span className="section-label" style={{ color: 'rgba(245,180,100,0.9)' }}>
              ILUMINACIÓN PROFESIONAL
            </span>
            <h2 className="cta-title">
              Iluminación profesional<br />para cada proyecto
            </h2>
            <p className="cta-text">
              Más de 12 años desarrollando soluciones de iluminación LED para
              distribuidores, comercios y proyectos en todo el país.
            </p>
            <div className="cta-buttons">
              <Link href="/contacto" className="btn-glow">
                CONTACTAR EQUIPO
              </Link>
              <Link href="/distribuidores" className="btn-outline">
                ENCONTRAR DISTRIBUIDOR
              </Link>
            </div>
          </div>

          <div className="cta-features">
            {[
              { title: 'Calidad profesional', text: 'Productos de alta performance y garantía real.' },
              { title: 'Stock permanente', text: 'Disponibilidad inmediata para tus proyectos.' },
              { title: 'Asesoramiento técnico', text: 'Acompañamiento profesional en cada etapa.' },
              { title: 'Cobertura nacional', text: 'Red de distribuidores en todo el país.' },
            ].map((item, i) => (
              <div key={i} className="cta-feature">
                <span className="cta-feature-title">{item.title}</span>
                <span className="cta-feature-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CATALOG SECTION */}
      <section className="catalog-section">
        <div className="catalog-bg">
          <Image
            src="/home/catalogo-2024.webp"
            alt="Catálogo GSG 2024"
            fill
            className="object-cover"
          />
          <div className="catalog-overlay" />
        </div>

        <div className="catalog-inner">
          <span className="catalog-label">CATÁLOGO DIGITAL</span>
          <h2 className="catalog-title">
            Descargá nuestro<br />catálogo completo
          </h2>
          <p className="catalog-description">
            Accedé a toda nuestra línea de productos con especificaciones
            técnicas detalladas, dimensiones y aplicaciones profesionales.
          </p>

          <div className="catalog-features">
            <div className="catalog-feature">
              <CheckCircleIcon />
              <span>Especificaciones técnicas completas</span>
            </div>
            <div className="catalog-feature">
              <CheckCircleIcon />
              <span>Imágenes y renders de alta calidad</span>
            </div>
            <div className="catalog-feature">
              <CheckCircleIcon />
              <span>Guía de aplicaciones y montaje</span>
            </div>
          </div>

          <div className="catalog-actions">
            <button
              className="btn-download"
              onClick={() =>
                window.open(
                  'https://drive.google.com/file/d/1-5Pz9clY2-odo61hT5UDpTiUfy_kmrDg/view?usp=sharing',
                  '_blank',
                )
              }
            >
              <DownloadIcon />
              DESCARGAR CATÁLOGO
            </button>
            <span className="catalog-note">PDF • 15 MB</span>
          </div>
        </div>
      </section>
    </>
  );
}
