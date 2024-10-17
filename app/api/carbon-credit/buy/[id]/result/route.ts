import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v6 as uuidv6 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json(data);
}
