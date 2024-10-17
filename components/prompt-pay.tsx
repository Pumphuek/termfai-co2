"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import useSWR from "swr";

export default function PromptPay() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  const { data } = useSWR(
    `/api/carbon-credit/buy/${carbonCreditBuyingCtx.buyTransactionID}/result/`,
    (url: string) => axios.get(url).then((response) => response.data),
    { refreshInterval: 2000 }
  );

  useEffect(() => {
    console.log(data);
    if (!!data && data.status == "SUCCESS") {
      carbonCreditBuyingCtx.setStep("cert");
    }
  }, [data]);

  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-50">
        <div className="max-w-[375px] mx-auto justify-center items-center h-14 flex">
          <h1 className="font-medium text-center">ชำระเงิน</h1>
        </div>
      </header>
      <div className="flex flex-col gap-8 max-w-[375px] mx-auto p-4">
        <div className="relative aspect-[12/13]">
          <Image
            src={URL.createObjectURL(carbonCreditBuyingCtx.qrcodeSrc)}
            alt="qrcode prompt pay"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <NumericFormat
          value={carbonCreditBuyingCtx.amount}
          displayType="text"
          thousandSeparator
          decimalScale={2}
          renderText={(value) => (
            <span className="text-xl font-medium text-gray-900 text-center">จำนวนเงิน {value} บาท</span>
          )}
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900 text-center">
            กรุณาบันทึกหน้าจอรูปภาพ เเละนำไปชำระผ่าน Application ของธนาคาร
          </span>
          <span className="text-sm text-gray-500 text-center">
            *เมื่อชำระเงินเล้วเสร็จ ท่านจะได้รับ Carbon Offset Cetificate
          </span>
        </div>
      </div>
    </main>
  );
}
