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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.text();
  const p = new URLSearchParams(body);
  const parsedBody: { [key: string]: string } = {};
  p.forEach((value, key) => {
    parsedBody[key] = value;
  });

  console.log(parsedBody);

  const buyTransaction = await prisma.buyTransaction.findUnique({ where: { id: Number(params.id) } });

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
    await prisma.buyTransaction.update({ where: { id: Number(params.id) }, data: { status: "FAIL" } });
    return NextResponse.json({ message: "Updated success." });
  }

  await prisma.buyTransaction.update({ where: { id: Number(params.id) }, data: { status: "SUCCESS" } });
  const co = await prisma.carbonCredit.findUnique({ where: { id: buyTransaction.carbon_credit_id } });
  const newVolume = co!.volume - buyTransaction.tco2eq;
  await prisma.carbonCredit.update({ where: { id: buyTransaction.carbon_credit_id }, data: { volume: newVolume } });
  return NextResponse.json({ message: "Updated success." });
}
