import { searchById } from "@/utils/db";

import { NextResponse } from "next/server";
export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");

  try {
    const res = await searchById(id);
    console.log(res);
    return NextResponse.json({ product: res });
  } catch (error) {
    console.error("Error en la conexión a MongoDB:", error);
    return new Response("Error en la conexión a MongoDB", {
      status: 500,
    });
  }
}
