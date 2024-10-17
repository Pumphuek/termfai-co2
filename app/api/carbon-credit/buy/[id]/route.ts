import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const buyTransaction = await prisma.buyTransaction.findUnique({ where: { id: Number(params.id) } });

  console.log(buyTransaction);

  if (!buyTransaction) {
    console.log("Not found buy transaction id.");
    return NextResponse.json({ message: "Not found buy transaction id." }, { status: 404 });
  }

  return NextResponse.json(buyTransaction);
}
