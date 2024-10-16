"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from "react";
import { Prisma } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

interface CarbonCreditBuyingContextI {
  step: string;
  buyerName: string;
  setBuyerName: Dispatch<SetStateAction<string>>;
  onLoginClickHandler: () => void;
  carbonCredits:
    | {
        name: string;
        id: number;
        price: number;
        volumn: number;
      }[]
    | undefined;
  tCO2Eq: number | undefined;
  onTCO2EqChange: (value: number) => void;
  amount: number | undefined;
  onAmountChange: (value: number) => void;
}

const CarbonCreditBuyingContext = createContext<CarbonCreditBuyingContextI | null>(null);

export const useCarbonCreditBuyingContext = () => useContext(CarbonCreditBuyingContext);

const CarbonCreditBuyingProvider = (props: PropsWithChildren) => {
  const { data: carbonCredits } = useSWR<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(
    "/api/carbon-credit",
    (url: string) =>
      axios.get<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(url).then((response) => response.data)
  );
  const [step, setStep] = useState<string>("login");
  const [buyerName, setBuyerName] = useState<string>("");
  const [tCO2Eq, setTCO2Eq] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();

  const onLoginClickHandler = () => {
    if (buyerName == "") {
      return;
    }
    setStep("buying");
  };

  const onTCO2EqChange = (value: number) => {
    console.log(value);
    if (!carbonCredits || value == undefined) {
      setTCO2Eq(undefined);
      setAmount(undefined);
      return;
    }
    const tCO2EqN = Number(value);
    const amountN = tCO2EqN * carbonCredits[0].price;
    setTCO2Eq(tCO2EqN);
    setAmount(amountN);
  };

  const onAmountChange = (value: number) => {
    if (!carbonCredits || value == undefined) {
      setTCO2Eq(undefined);
      setAmount(undefined);
      return;
    }
    const amountN = Number(value);
    const tCO2EqN = amountN / carbonCredits[0].price;
    setTCO2Eq(tCO2EqN);
    setAmount(amountN);
  };

  const value = useMemo(
    () => ({
      step,
      buyerName,
      setBuyerName,
      onLoginClickHandler,
      carbonCredits,
      tCO2Eq,
      onTCO2EqChange,
      amount,
      onAmountChange,
    }),
    [step, buyerName, setBuyerName, onLoginClickHandler, carbonCredits, tCO2Eq, onTCO2EqChange, amount, onAmountChange]
  );

  return <CarbonCreditBuyingContext.Provider value={value}>{props.children}</CarbonCreditBuyingContext.Provider>;
};

export default CarbonCreditBuyingProvider;
