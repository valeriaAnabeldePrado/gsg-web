'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import './contact-premium.css';

const Contacto = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Mouse Move Effect for Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        spotlightRef.current.style.setProperty('--x', `${x}px`);
        spotlightRef.current.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const templateId = process.env.NEXT_PUBLIC_ID_TEMPLATE;
    const serviceId = process.env.NEXT_PUBLIC_ID_SERVICE;
    const publicKey = process.env.NEXT_PUBLIC_ID_PUBLICKEY;

    emailjs
      .send(serviceId, templateId, data, publicKey)
      .then(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        reset();

        // Reveal success animation could go here
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.contact-headline',
        { y: 100, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }
      )
      .fromTo(
          '.info-grid div',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
          '-=0.8'
        )
        .fromTo(
          '.form-group-floating',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          '.btn-magnetic',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8 },
          '-=0.5'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={containerRef}>
      {/* Spotlight Element */}
      <div className="spotlight" ref={spotlightRef}></div>

      <div className="contact-container">
        {/* Left Column: Typography */}
        <div className="contact-info-section">
          <div className="contact-label">Contacto</div>
          <h1 className="contact-headline">
            Iluminamos<br />
            <b>tu visión.</b>
          </h1>

          <div className="info-grid">
            <div>
              <span className="info-label">Escribinos</span>
              <a href="mailto:info@gsgdesign.com.ar" className="info-value">
                info@gsgdesign.com.ar
              </a>
            </div>
            <div>
              <span className="info-label">Llamanos</span>
              <a href="tel:+541139727957" className="info-value">
                +54 11 3972-7957
              </a>
            </div>
            <div>
              <span className="info-label">Ubicación</span>
              <a
                href="https://goo.gl/maps/..."
                target="_blank"
                rel="noopener noreferrer"
                className="info-value"
              >
                Buenos Aires, Argentina
              </a>
            </div>
            <div>
              <span className="info-label">Redes</span>
              <a
                href="https://instagram.com/gsgdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="info-value"
              >
                @gsgdesign
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Form */}
        <div className="minimal-form-container">
          {isSubmitted ? (
            <div className="success-overlay">
              <div className="success-content">
                <div className="success-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">Mensaje Enviado</h3>
                <p className="text-gray-400">Pronto nos pondremos en contacto.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="minimal-form">
              <div className="form-group-floating">
                <input
                  type="text"
                  id="name"
                  className="form-input-float"
                  placeholder=" "
                  {...register('name', { required: 'Requerido' })}
                />
                <label htmlFor="name" className="form-label-float">
                  Nombre
                </label>
                {errors.name && (
                  <span className="form-error-text">Requerido</span>
                )}
              </div>

              <div className="form-group-floating">
                <input
                  type="email"
                  id="email"
                  className="form-input-float"
                  placeholder=" "
                  {...register('email', {
                    required: 'Requerido',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Inválido',
                    },
                  })}
                />
                <label htmlFor="email" className="form-label-float">
                  Email
                </label>
                {errors.email && (
                  <span className="form-error-text">Inválido</span>
                )}
              </div>

              <div className="form-group-floating">
                <textarea
                  id="comments"
                  className="form-input-float"
                  placeholder=" "
                  rows={4}
                  style={{ resize: 'none', height: 'auto', minHeight: '120px' }}
                  {...register('comments', { required: 'Requerido' })}
                />
                <label htmlFor="comments" className="form-label-float">
                  Cuéntanos tu proyecto
                </label>
                {errors.comments && (
                  <span className="form-error-text">Requerido</span>
                )}
              </div>

              <div className="magnetic-button-container">
                <button type="submit" className="btn-magnetic" disabled={isLoading}>
                  <span className="btn-text">
                    {isLoading ? 'Enviando...' : 'Enviar Propuesta'}
                  </span>
                  <div className="btn-circle">
                    <svg
                      className="arrow-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacto;
