import { buscarProductosAvanzado } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filtros = {};

    if (searchParams.has('incluyeLed')) {
      filtros.incluyeLed = searchParams.get('incluyeLed') === 'true';
    }
    if (searchParams.has('incluyeEquipo')) {
      filtros.incluyeEquipo = searchParams.get('incluyeEquipo') === 'true';
    }

    // Filtro por color (puedes pasar varios separados por coma)
    if (searchParams.has('color')) {
      filtros.color = searchParams.get('color')?.toLocaleLowerCase().split(','); // Ej: ?color=blanco,negro
    }
    // Filtro por acabado (puedes pasar varios separados por coma)
    if (searchParams.has('acabado')) {
      filtros.acabado = searchParams
        .get('acabado')
        ?.toLocaleLowerCase()
        .split(',');
    }
    if (searchParams.has('cantidad')) {
      filtros.cantidad = parseInt(searchParams.get('cantidad') || '0', 10);
    }

    console.log(filtros.cantidad);
    // Puedes agregar más filtros aquí...

    const res = await buscarProductosAvanzado(filtros);
    return NextResponse.json({ products: res });
  } catch (error) {
    console.error('Error en la conexión a MongoDB:', error);
    return NextResponse.json(
      { error: 'Error en la conexión a MongoDB' },
      { status: 500 },
    );
  }
}
