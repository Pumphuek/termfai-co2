"use client";

import PageTransition from "@/components/animations/page-transition";
import Buying from "@/components/buying";
import Login from "@/components/login";
import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  return (
    <AnimatePresence mode="wait">
      {carbonCreditBuyingCtx.step == "login" && (
        <PageTransition key="login">
          <Login />
        </PageTransition>
      )}
      {carbonCreditBuyingCtx.step == "buying" && (
        <PageTransition key="buying">
          <Buying />
        </PageTransition>
      )}
    </AnimatePresence>
  );
}
