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
        volume: number;
      }[]
    | undefined;
  tCO2Eq: number | undefined;
  onTCO2EqChange: (value: number) => void;
  amount: number | undefined;
  onAmountChange: (value: number) => void;
  onBuyClickHandler: () => void;
  onPromptPayClickHandler: () => void;
  qrcodeSrc: any;
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
  const [paymentRefCode, setPaymentRefCode] = useState<string>("");
  const [qrcodeSrc, setQRCodeSrc] = useState<any>();

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

  const onBuyClickHandler = () => {
    if (tCO2Eq == undefined || amount == undefined || tCO2Eq == null || amount == null || tCO2Eq <= 0 || amount <= 0) {
      return;
    }
    setStep("paying");
  };

  const onPromptPayClickHandler = () => {
    axios
      .post<any>("/api/carbon-credit/buy/", {
        amount: amount,
        tCO2Eq: tCO2Eq,
        payment_channel: "prompt-pay",
        buyer: buyerName,
        carbon_credit_id: carbonCredits![0].id,
      })
      .then((response) => {
        console.log(response.data);
        setPaymentRefCode(response.data.reference_code);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL}/api/qrcode-payment/`,
            {
              amount: response.data.amount, // Number (10, 2)
              referenceNo: response.data.reference_code, // invoice reference ห้ามซ้ำ String (15)
              backgroundUrl: `${process.env.NEXT_PUBLIC_URL}/api/carbon-credit/buy/${response.data.id}/result/`, //  String (250) After the transaction is completed as a response from the back-end system
              detail: "Hackathon", // String (250) Product Description
              customerName: "", // String (100)
              customerEmail: "", // Email String (100)
              merchantDefined1: "", // ID Tax (13)
              merchantDefined2: "", // Branch.(5) (00000 head office, 00001 )
              merchantDefined3: "", // Address1 90
              merchantDefined4: "", // Address2 90
              merchantDefined5: "", // String (250)
              customerTelephone: "", // Number (10)
              customerAddress: "", // String (250). note to PUPAPAY
            },
            { responseType: "blob" }
          )
          .then((response) => {
            console.log(response.data);
            setQRCodeSrc(response.data);
            setStep("prompt-pay");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
      onBuyClickHandler,
      onPromptPayClickHandler,
      qrcodeSrc,
    }),
    [
      step,
      buyerName,
      setBuyerName,
      onLoginClickHandler,
      carbonCredits,
      tCO2Eq,
      onTCO2EqChange,
      amount,
      onAmountChange,
      onBuyClickHandler,
      onPromptPayClickHandler,
      qrcodeSrc,
    ]
  );

  return <CarbonCreditBuyingContext.Provider value={value}>{props.children}</CarbonCreditBuyingContext.Provider>;
};

export default CarbonCreditBuyingProvider;
