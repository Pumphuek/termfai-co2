import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { parameters }: { parameters: { id: number } }) {
  const body = await request.text();
  const params = new URLSearchParams(body);
  const parsedBody: { [key: string]: any } = {};
  params.forEach((value, key) => {
    parsedBody[key] = value;
  });

  const buyTransaction = await prisma.buyTransaction.findUnique({ where: { id: parameters.id } });

  if (!buyTransaction) {
    console.log("Not found buy transaction id.");
    return NextResponse.json({ message: "Not found buy transaction id." }, { status: 404 });
  }

  if (buyTransaction.reference_code != parsedBody.referenceNo) {
    console.log("Invalid ref no.");
    return NextResponse.json({ message: "Invalid ref no." }, { status: 400 });
  }

  if (buyTransaction.amount != Number(parsedBody.amount)) {
    console.log("Invalid amount.");
    return NextResponse.json({ message: "Invalid amount." }, { status: 400 });
  }

  if (parsedBody.resultCode != "00") {
    console.log("Transaction fail.");
    await prisma.buyTransaction.update({ where: { id: parameters.id }, data: { status: "FAIL" } });
    return NextResponse.json({ message: "Updated success." });
  }

  await prisma.buyTransaction.update({ where: { id: parameters.id }, data: { status: "SUCCESS" } });
  return NextResponse.json({ message: "Updated success." });
}
