import { obtenerProductosDestacados } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener todos los productos que tienen esDestacado: true
    const featuredProducts = await obtenerProductosDestacados();

    return NextResponse.json({ products: featuredProducts });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Error fetching featured products' },
      { status: 500 },
    );
  }
}
