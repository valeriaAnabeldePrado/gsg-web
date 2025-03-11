import { getAccessories } from '@/utils/db';

import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const res = await getAccessories();
    return NextResponse.json({ accesorios: res });
  } catch (error) {
    console.error('Error en la conexión a MongoDB:', error);
    return new Response('Error en la conexión a MongoDB', {
      status: 500,
    });
  }
}
