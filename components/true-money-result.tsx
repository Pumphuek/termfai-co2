"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";

export default function TrueMoneyResult() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  const { data } = useSWR(
    `/api/carbon-credit/buy/${carbonCreditBuyingCtx.buyTransactionID}/`,
    (url: string) => axios.get(url).then((response) => response.data),
    { refreshInterval: 2000 }
  );

  useEffect(() => {
    console.log(data);
    if (!!data && data.status == "SUCCESS") {
      carbonCreditBuyingCtx.setBuyerName(data.buyer);
      carbonCreditBuyingCtx.setTCO2Eq(data.tco2eq);
      carbonCreditBuyingCtx.setStep("cert");
    }
  }, [data]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-opacity-[0.01] backdrop-blur-sm z-50">
      <Image src="/termfai-logo.png" alt="loading spinner" width={80} height={80} />
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
