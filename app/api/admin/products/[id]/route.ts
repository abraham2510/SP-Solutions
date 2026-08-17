import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminProductById } from "@/lib/data/admin";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const product = await getAdminProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error("API getAdminProductById error:", err);
    return NextResponse.json(
      { error: "Unauthorized or failed to fetch product" },
      { status: 401 }
    );
  }
}
