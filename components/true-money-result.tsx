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
      carbonCreditBuyingCtx.setStep("cert");
    }
  }, [data]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-opacity-[0.01] backdrop-blur-sm z-50">
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
