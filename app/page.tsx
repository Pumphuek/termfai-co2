"use client";

import Login from "@/components/login";
import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";

export default function Home() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  return <>{carbonCreditBuyingCtx.step == "login" && <Login />}</>;
}
