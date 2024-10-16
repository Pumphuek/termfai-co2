"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import Image from "next/image";

export default function Login() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-200">
        <div className="max-w-[375px] mx-auto flex justify-center items-center h-14">
          <h1 className="font-medium">เข้าสู่ระบบ</h1>
        </div>
      </header>
      <div className="max-w-[375px] mx-auto">
        <div className="flex flex-col gap-12 py-4">
          <div className="flex flex-col gap-4 items-start">
            <div className="p-4">
              <Image alt="TERMFAI logo" src="/termfai-logo.png" width={80} height={80} />
            </div>
            <div className="flex flex-col gap-2 py-2 px-4 items-start">
              <h2 className="text-2xl font-semibold text-primary-500">ยินดีต้อนรับเข้าสู่ Termfai</h2>
              <span className="text-lg text-gray-700">Carbon Trade Exchange</span>
            </div>
          </div>
          <div className="px-4">
            <input
              className="border rounded-lg border-gray-50 h-[50px] w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary-300 px-2 py-3 transition duration-300"
              placeholder="ระบุชื่อ"
              value={carbonCreditBuyingCtx.buyerName}
              onChange={(e) => carbonCreditBuyingCtx.setBuyerName(e.target.value)}
            />
          </div>
          <div className="px-4">
            <button
              disabled={carbonCreditBuyingCtx.buyerName == ""}
              onClick={carbonCreditBuyingCtx.onLoginClickHandler}
              className="rounded-lg bg-primary-500 h-11 text-white w-full hover:bg-primary-600 transition duration-300 font-medium active:scale-[0.98] hover:shadow-xl shadow-primary-500 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
