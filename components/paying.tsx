"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import Image from "next/image";
import { NumericFormat } from "react-number-format";

export default function Paying() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-50">
        <div className="max-w-[375px] mx-auto justify-center items-center h-14 grid grid-cols-6">
          <button className="h-full text-left">{"<"}</button>
          <h1 className="font-medium col-span-4 text-center">เลือกช่องทางการชำระเงิน</h1>
        </div>
      </header>
      <div className="max-w-[375px] mx-auto flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-4 border-b border-gray-50 pb-4">
          <span className="text-sm text-gray-900 font-semibold">สรุปรายละเอียด</span>
          <div className="flex justify-between">
            <span className="text-gray-900">ยอดเงิน (บาท)</span>
            <NumericFormat
              displayType="text"
              value={carbonCreditBuyingCtx.amount}
              decimalScale={2}
              renderText={(value) => <span className="text-gray-900 text-end font-semibold">{value} ฿</span>}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-900">จำนวนคาร์บอนเครดิต</span>
            <NumericFormat
              displayType="text"
              value={carbonCreditBuyingCtx.tCO2Eq}
              decimalScale={2}
              renderText={(value) => <span className="text-gray-900 text-end font-semibold">{value} tCo2eq</span>}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-900 font-semibold">ช่องทางชำระเงิน</span>
          <button
            className="flex gap-2 border rounded-lg border-gray-50 h-16 py-3 px-4 items-center disabled:bg-gray-50 disabled:text-gray-500"
            onClick={carbonCreditBuyingCtx.onPromptPayClickHandler}
          >
            <Image src="/prompt-pay.png" width={40} height={40} alt="prompt pay" />
            <span className="font-semibold text-sm">คิวอาร์โค้ด PromptPay</span>
            <span className="flex-1 text-end text-gray-500 font-semibold">{">"}</span>
          </button>
          <button
            className="flex gap-2 border rounded-lg border-gray-50 h-16 py-3 px-4 items-center disabled:bg-gray-50 disabled:text-gray-500"
            onClick={carbonCreditBuyingCtx.onTrueMoneyWalletClickHandler}
          >
            <Image src="/true-money-wallet.png" width={40} height={40} alt="prompt pay" />
            <span className="font-semibold text-sm">True Money Wallet</span>
            <span className="flex-1 text-end text-gray-500 font-semibold">{">"}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
