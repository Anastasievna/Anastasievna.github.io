import { PRODUCTS } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const productId = Number(id);
  const product = PRODUCTS.find((t) => t.id === productId);

  if (!product)
    return NextResponse.json({ error: "product not found" }, { status: 404 });

  return NextResponse.json(product);
}
