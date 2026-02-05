import { getProductByCode } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

// Server Component - se ejecuta en el servidor
export default async function ProductPage({ params }) {
  // Esperar a que params se resuelva
  const { code } = await params;
  const decodedCode = decodeURIComponent(code);

  // Ignorar solicitudes de archivos estáticos
  if (decodedCode.includes('.') || decodedCode === 'favicon.ico') {
    notFound();
  }

  // Obtener el producto desde Supabase usando el código
  let product;
  try {
    product = await getProductByCode(decodedCode);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    notFound(); // Muestra la página 404 de Next.js
  }

  if (!product) {
    notFound();
  }

  // Serializar el producto para evitar problemas con objetos no serializables
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetailClient product={serializedProduct} />;
}
