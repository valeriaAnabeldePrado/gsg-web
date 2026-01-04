import React from 'react';
import FooterM from '@/components/footer/footer';
import Head from 'next/head';
import FloatingMapButton from './FloatingMapButton';
import MapSection from './MapSection';
import { listDistributors } from '@/lib/supabase/helpers';
import DistribuidoresClient from './DistribuidoresClient';
import './distribuidores-premium.css'; // Importar el nuevo CSS aquí también por si acaso

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Server Component - se ejecuta en el servidor
export default async function DistribuidoresPage() {
  let distribuidores = {};

  try {
    // Obtener distribuidores desde Supabase
    const data = await listDistributors();

    // Agrupar por provincia
    distribuidores = data.reduce((acc, distributor) => {
      const province = distributor.province || 'Sin Provincia';
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(distributor);
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching distributors:', error);
    // En caso de error, se pasará un objeto vacío al cliente
    distribuidores = {};
  }

  return (
    <>
      <Head>
        <title>Distribuidores - GSG</title>
        <meta
          name="Distribuidores"
          content="A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section Premium */}
      <div className="distribuidores-hero">
        <h1 className="distribuidores-title">Nuestra Red</h1>
        <p className="distribuidores-subtitle">
          A través de nuestra red de distribuidores, aseguramos que nuestros
          productos y servicios lleguen a cada rincón, garantizando atención
          personalizada y calidad superior en cada interacción.
        </p>
      </div>

      {/* Lista de Distribuidores - Client Component con datos del servidor */}
      <DistribuidoresClient initialDistribuidores={distribuidores} />

      {/* Mapa Section */}
      <MapSection />

      {/* Botón flotante para ir al mapa */}
      <FloatingMapButton />

      <FooterM />
    </>
  );
}
