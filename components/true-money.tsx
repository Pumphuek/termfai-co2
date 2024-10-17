"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";

export default function TrueMoney() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;

  return (
    <>
      {carbonCreditBuyingCtx.trueMoneyContent && (
        <div dangerouslySetInnerHTML={{ __html: carbonCreditBuyingCtx.trueMoneyContent }}></div>
      )}
    </>
  );
}
