import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const carbonCredits = await prisma.carbonCredit.findMany();
  return NextResponse.json(carbonCredits);
}
