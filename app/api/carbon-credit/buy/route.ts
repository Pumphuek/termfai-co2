import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v6 as uuidv6 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  if (data.payment_channel == "prompt-pay") {
    const uuid = `hkt${uuidv6().split("-")[2]}${new Date().getMilliseconds().toString().substring(0, 4)}`;
    const buy = await prisma.buyTransaction.create({
      data: {
        amount: data.amount,
        tco2eq: data.tCO2Eq,
        buyer: data.buyer,
        carbon_credit_id: data.carbon_credit_id,
        payment_channel: data.payment_channel,
        reference_code: uuid,
      },
    });
    return NextResponse.json(buy);
  } else if (data.payment_channel == "true-money-wallet") {
    return NextResponse.json(data);
  } else {
    return NextResponse.error();
  }
}
