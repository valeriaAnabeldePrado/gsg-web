'use client';
import React from 'react';

export default function WelcomeSection() {
  return (
    <section className="welcome-section bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-10">
      <div
        className="welcome-header bg-gradient-to-r from-red-50 to-red-100 text-center"
        style={{ padding: 'var(--padding-generico-x-y)' }}
      >
        <h1
          className="welcome-title"
          style={{
            fontSize: 'var(--text-xxxl)',
            fontFamily: 'var(--tipo-fuente)',
            color: 'var(--color-fuente-black)',
            fontWeight: 'bold',
            marginBottom: 'var(--padding-chico)',
          }}
        >
          Bienvenido a GSG Iluminación
        </h1>
        <p
          className="welcome-description"
          style={{
            fontSize: 'var(--text-medios)',
            fontFamily: 'var(--tipo-fuente)',
            color: 'var(--color-fuente-grey)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Somos especialistas en soluciones de iluminación LED para hogares,
          comercios y proyectos arquitectónicos. Descubre productos de calidad,
          diseño y eficiencia.
        </p>
      </div>
      <div
        className="welcome-actions bg-white"
        style={{ padding: 'var(--padding-generico-x-y)' }}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#catalogo"
            className="welcome-btn welcome-btn-primary"
            style={{
              padding: 'var(--padding-chico) calc(var(--padding-chico) * 1.5)',
              backgroundColor: 'var(--color-fuente-roja)',
              color: 'white',
              fontFamily: 'var(--tipo-fuente)',
              fontSize: 'var(--text-small)',
              fontWeight: '500',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d63512';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-fuente-roja)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Ver catálogo
          </a>
          <a
            href="/contacto"
            className="welcome-btn welcome-btn-secondary"
            style={{
              padding: 'var(--padding-chico) calc(var(--padding-chico) * 1.5)',
              backgroundColor: 'transparent',
              color: 'var(--color-fuente-black)',
              fontFamily: 'var(--tipo-fuente)',
              fontSize: 'var(--text-small)',
              fontWeight: '500',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid var(--color-bg-gray-200)',
              boxShadow: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--color-bg-gray-200)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
