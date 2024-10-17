"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Prisma } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";

interface CarbonCreditBuyingContextI {
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
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
  buyTransactionID: string;
  onTrueMoneyWalletClickHandler: () => void;
  trueMoneyContent: any;
}

const CarbonCreditBuyingContext = createContext<CarbonCreditBuyingContextI | null>(null);

export const useCarbonCreditBuyingContext = () => useContext(CarbonCreditBuyingContext);

const CarbonCreditBuyingProvider = (props: PropsWithChildren) => {
  const { data: carbonCredits, isLoading: coIsLoading } = useSWR<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(
    "/api/carbon-credit",
    (url: string) =>
      axios.get<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(url).then((response) => response.data)
  );
  const [step, setStep] = useState<string>("login");
  const [buyerName, setBuyerName] = useState<string>("");
  const [tCO2Eq, setTCO2Eq] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [buyTransactionID, setBuyTransactionID] = useState<string>("");
  const [paymentRefCode, setPaymentRefCode] = useState<string>("");
  const [qrcodeSrc, setQRCodeSrc] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trueMoneyContent, setTrueMoneycontent] = useState<any>();

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
    setIsLoading(true);
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
        setBuyTransactionID(response.data.id);
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
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const onTrueMoneyWalletClickHandler = () => {
    setIsLoading(true);
    axios
      .post<any>("/api/carbon-credit/buy/", {
        amount: amount,
        tCO2Eq: tCO2Eq,
        payment_channel: "true-money-wallet",
        buyer: buyerName,
        carbon_credit_id: carbonCredits![0].id,
      })
      .then((response) => {
        console.log(response.data);
        setBuyTransactionID(response.data.id);
        setPaymentRefCode(response.data.reference_code);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL}/api/truemoney-payment/`,
            {
              amount: (response.data.amount as number).toFixed(2), // Number (10, 2)
              referenceNo: response.data.reference_code, // invoice reference ห้ามซ้ำ String (15)
              backgroundUrl: `${process.env.NEXT_PUBLIC_URL}/api/carbon-credit/buy/${response.data.id}/result/`, //  String (250) After the transaction is completed as a response from the back-end system
              responseUrl: `${process.env.NEXT_PUBLIC_URL}/`,
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
            {
              headers: {
                Accept: "text/html", // Specify that you expect 'text/html' content
              },
              responseType: "text",
            }
          )
          .then((response) => {
            console.log(response);
            setTrueMoneycontent(response.data);
            setStep("true-money-wallet");
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({
      step,
      setStep,
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
      buyTransactionID,
      onTrueMoneyWalletClickHandler,
      trueMoneyContent,
    }),
    [
      step,
      setStep,
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
      buyTransactionID,
      onTrueMoneyWalletClickHandler,
      trueMoneyContent,
    ]
  );

  return (
    <CarbonCreditBuyingContext.Provider value={value}>
      {props.children}
      {(coIsLoading || isLoading) && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-opacity-[0.01] backdrop-blur-sm z-50">
          <Image src="/termfai-logo.png" alt="loading spinner" width={80} height={80} />
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </CarbonCreditBuyingContext.Provider>
  );
};

export default CarbonCreditBuyingProvider;
