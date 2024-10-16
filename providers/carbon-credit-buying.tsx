"use client";

import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

interface CarbonCreditBuyingContextI {
  step: string;
}

const CarbonCreditBuyingContext = createContext<CarbonCreditBuyingContextI | null>(null);

export const useCarbonCreditBuyingContext = () => useContext(CarbonCreditBuyingContext);

const CarbonCreditBuyingProvider = (props: PropsWithChildren) => {
  const [step, setStep] = useState<string>("login");

  const value = useMemo(
    () => ({
      step,
    }),
    [step]
  );

  return <CarbonCreditBuyingContext.Provider value={value}>{props.children}</CarbonCreditBuyingContext.Provider>;
};

export default CarbonCreditBuyingProvider;
