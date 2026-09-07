import { NextResponse } from "next/server";
import { calculatePrice } from "@/lib/print-pricing";
import type { QuoteRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequest;

    if (!body.documents || !Array.isArray(body.documents) || !body.config) {
      return NextResponse.json(
        { error: "Invalid request: documents and config are required" },
        { status: 400 },
      );
    }

    // Simulate small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Transform to internal shape expected by calculatePrice
    const docs = body.documents.map((d, idx) => ({
      id: `srv-${idx}`,
      name: `doc-${idx}`,
      type: d.type,
      sizeBytes: 0,
      pages: d.pages,
      uploadedAt: Date.now(),
      status: "ready" as const,
    }));

    const breakdown = calculatePrice(docs, body.config, body.promoCode);

    return NextResponse.json({
      ok: true,
      breakdown,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate quote", detail: String(error) },
      { status: 500 },
    );
  }
}
