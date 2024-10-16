import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const carbonCredits = await prisma.carbonCredit.findMany();
  const response = NextResponse.json(carbonCredits);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
