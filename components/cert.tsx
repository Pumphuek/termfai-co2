"use client";

import Image from "next/image";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";

export default function Cert() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  const contentRef = useRef<HTMLDivElement | null>(null);

  const onDownloadClick = () => {
    const input = contentRef.current;
    html2canvas(input!, { scale: 3 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "TERMFAI_CO2_Certificate.png";
      link.click();
    });
  };

  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-50">
        <div className="max-w-[375px] mx-auto justify-center items-center h-14 flex">
          <h1 className="font-medium text-center">Certificate</h1>
        </div>
      </header>
      <div className="max-w-[375px] mx-auto px-4 flex flex-col items-center pb-8">
        <div className="flex flex-col py-8 gap-4 items-center">
          <Image src="/check.png" width={60} height={60} alt="check" />
          <div className="flex flex-col gap-3">
            <span className="text-center text-success-500 text-2xl font-semibold">
              แลกเปลี่ยน Carbon Credit สำเร็จ!!
            </span>
            <span className="text-lg text-gray-700 text-center">คุณได้รับหนังสือรับรองเพื่อแสดงว่า</span>
          </div>
        </div>
        <div ref={contentRef} className="relative w-[350px] h-[323px] shadow-xl rounded-xl mb-8">
          <Image src="/cert.png" alt="cert" fill style={{ objectFit: "cover" }} />
          <span className="absolute top-[105px] left-[25px] text-success-800 font-semibold text-sm">
            {carbonCreditBuyingCtx.buyerName}
          </span>
          <span className="absolute top-[148px] left-[25px] text-success-800 font-semibold text-sm">
            {carbonCreditBuyingCtx.tCO2Eq} T of CO2 emissions
          </span>
        </div>
        <button
          onClick={onDownloadClick}
          className="rounded-lg bg-primary-500 h-11 text-white w-full hover:bg-primary-600 transition duration-300 font-medium active:scale-[0.98] hover:shadow-xl shadow-primary-500 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
        >
          Download
        </button>
      </div>
    </main>
  );
}
