"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from "react";

interface CarbonCreditBuyingContextI {
  step: string;
  buyerName: string;
  setBuyerName: Dispatch<SetStateAction<string>>;
  onLoginClickHandler: () => void;
}

const CarbonCreditBuyingContext = createContext<CarbonCreditBuyingContextI | null>(null);

export const useCarbonCreditBuyingContext = () => useContext(CarbonCreditBuyingContext);

const CarbonCreditBuyingProvider = (props: PropsWithChildren) => {
  const [step, setStep] = useState<string>("login");
  const [buyerName, setBuyerName] = useState<string>("");

  const onLoginClickHandler = () => {
    if (buyerName == "") {
      return;
    }
    setStep("buying");
  };

  const value = useMemo(
    () => ({
      step,
      buyerName,
      setBuyerName,
      onLoginClickHandler,
    }),
    [step, buyerName, setBuyerName, onLoginClickHandler]
  );

  return <CarbonCreditBuyingContext.Provider value={value}>{props.children}</CarbonCreditBuyingContext.Provider>;
};

export default CarbonCreditBuyingProvider;
