"use client";

import PageTransition from "@/components/animations/page-transition";
import Buying from "@/components/buying";
import Cert from "@/components/cert";
import Login from "@/components/login";
import Paying from "@/components/paying";
import PromptPay from "@/components/prompt-pay";
import TrueMoney from "@/components/true-money";
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
      {carbonCreditBuyingCtx.step == "paying" && (
        <PageTransition key="paying">
          <Paying />
        </PageTransition>
      )}
      {carbonCreditBuyingCtx.step == "prompt-pay" && (
        <PageTransition key="prompt-pay">
          <PromptPay />
        </PageTransition>
      )}
      {carbonCreditBuyingCtx.step == "cert" && (
        <PageTransition key="cert">
          <Cert />
        </PageTransition>
      )}
      {carbonCreditBuyingCtx.step == "true-money-wallet" && (
        <PageTransition key="true-money-wallet">
          <TrueMoney />
        </PageTransition>
      )}
    </AnimatePresence>
  );
}
