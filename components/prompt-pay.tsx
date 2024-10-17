"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import Image from "next/image";

export default function PromptPay() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-50">
        <div className="max-w-[375px] mx-auto justify-center items-center h-14 flex">
          <h1 className="font-medium text-center">ชำระเงิน</h1>
        </div>
      </header>
      <div className="max-w-[375px] mx-auto flex p-4 relative aspect-[9/16]">
        <Image
          src={URL.createObjectURL(carbonCreditBuyingCtx.qrcodeSrc)}
          alt="qrcode prompt pay"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </main>
  );
}
