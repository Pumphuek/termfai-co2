"use client";

import { useCarbonCreditBuyingContext } from "@/providers/carbon-credit-buying";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import SectionTransition from "./animations/section-transition";

export default function Buying() {
  const carbonCreditBuyingCtx = useCarbonCreditBuyingContext()!;
  const [tab, setTab] = useState<number>(3);

  const selectedClass = "font-semibold text-white rounded-lg bg-secondary-600";
  const unselectedClass = "font-semibold text-gray-400";

  return (
    <>
      <AnimatePresence mode="wait">
        {tab == 1 && (
          <SectionTransition key="tab-1">
            <main className="pt-[168px] overflow-scroll h-screen">
              <div className="max-w-[375px] mx-auto py-6 px-4 flex flex-col items-center">
                <span className="font-semibold text-center text-secondary-700 text-xl">อยู่ระหว่างการพัฒนา</span>
              </div>
            </main>
          </SectionTransition>
        )}
        {tab == 2 && (
          <SectionTransition key="tab-2">
            <main className="pt-[168px] overflow-scroll h-screen">
              <div className="max-w-[375px] mx-auto py-6 px-4 flex flex-col items-center">
                <span className="font-semibold text-center text-secondary-700 text-xl">อยู่ระหว่างการพัฒนา</span>
              </div>
            </main>
          </SectionTransition>
        )}
        {tab == 3 && (
          <SectionTransition key="tab-3">
            <main className="pt-[168px] overflow-scroll h-screen">
              <div className="flex flex-col gap-[85px] max-w-[375px] mx-auto py-6 px-4">
                <div className="flex flex-col gap-6">
                  <div className="flex">
                    <h3 className="font-semibold text-3xl text-gray-900 flex-1">
                      {carbonCreditBuyingCtx.carbonCredits &&
                        carbonCreditBuyingCtx.carbonCredits.length > 0 &&
                        carbonCreditBuyingCtx.carbonCredits[0].name}
                    </h3>
                    {carbonCreditBuyingCtx.carbonCredits && carbonCreditBuyingCtx.carbonCredits.length > 0 && (
                      <NumericFormat
                        value={carbonCreditBuyingCtx.carbonCredits[0].price}
                        displayType="text"
                        thousandSeparator
                        renderText={(value) => <span className="font-semibold text-2xl text-gray-900">฿ {value}</span>}
                      />
                    )}
                  </div>
                  <div className="rounded-2xl flex flex-col overflow-hidden shadow">
                    <div className="h-14 bg-primary-500 flex justify-center items-center">
                      <h4 className="text-white font-semibold text-lg">Carbon Credit</h4>
                    </div>
                    <div className="grid grid-cols-2 h-12 bg-gray-25">
                      <div className="flex px-4 py-3">
                        <span className="text-left ">Offer</span>
                      </div>
                      <div className="flex px-4 py-3">
                        <span className="text-left ">Volume</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 h-12">
                      <div className="flex px-4 py-3">
                        <span className="text-left text-success-500">
                          {carbonCreditBuyingCtx.carbonCredits &&
                            carbonCreditBuyingCtx.carbonCredits.length > 0 &&
                            carbonCreditBuyingCtx.carbonCredits[0].price}{" "}
                          ฿
                        </span>
                      </div>
                      <div className="flex px-4 py-3">
                        {carbonCreditBuyingCtx.carbonCredits && carbonCreditBuyingCtx.carbonCredits.length > 0 && (
                          <NumericFormat
                            value={carbonCreditBuyingCtx.carbonCredits[0].volume}
                            displayType="text"
                            thousandSeparator
                            renderText={(value) => <span className="text-left">{value}</span>}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 items-center">
                    <span className="text-lg font-medium text-gray-900">จำนวน (tCO2eq)</span>
                    <NumericFormat
                      className="border rounded-lg border-gray-50 h-[50px] focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary-300 px-2 py-3 transition duration-300"
                      placeholder="ระบุจำนวน"
                      value={carbonCreditBuyingCtx.tCO2Eq ?? ""}
                      onValueChange={(values) => carbonCreditBuyingCtx.onTCO2EqChange(values.floatValue!)}
                      thousandSeparator
                      allowNegative={false}
                      decimalScale={0}
                      isAllowed={(values) =>
                        values.floatValue == undefined ||
                        values.floatValue! <= carbonCreditBuyingCtx.carbonCredits![0].volume
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <span className="text-lg font-medium text-gray-900">ราคารวม (฿)</span>
                    <NumericFormat
                      className="border rounded-lg border-gray-50 h-[50px] focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary-300 px-2 py-3 transition duration-300"
                      placeholder="จำนวนเงิน"
                      value={carbonCreditBuyingCtx.amount ?? ""}
                      onValueChange={(values) => carbonCreditBuyingCtx.onAmountChange(values.floatValue!)}
                      thousandSeparator
                      allowNegative={false}
                      decimalScale={0}
                      isAllowed={(values) =>
                        values.floatValue == undefined ||
                        values.floatValue! / carbonCreditBuyingCtx.carbonCredits![0].price <=
                          carbonCreditBuyingCtx.carbonCredits![0].volume
                      }
                    />
                  </div>
                  <button
                    disabled={
                      carbonCreditBuyingCtx.tCO2Eq == undefined ||
                      carbonCreditBuyingCtx.amount == undefined ||
                      carbonCreditBuyingCtx.tCO2Eq == null ||
                      carbonCreditBuyingCtx.amount == null ||
                      carbonCreditBuyingCtx.tCO2Eq <= 0 ||
                      carbonCreditBuyingCtx.amount <= 0
                    }
                    onClick={carbonCreditBuyingCtx.onBuyClickHandler}
                    className="rounded-lg bg-primary-500 h-11 text-white w-full hover:bg-primary-600 transition duration-300 font-medium active:scale-[0.98] hover:shadow-xl shadow-primary-500 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
                  >
                    ส่งคำสั่งซื้อ
                  </button>
                </div>
              </div>
            </main>
          </SectionTransition>
        )}
      </AnimatePresence>
      <header className="fixed top-0 left-0 right-0 h-[134px] w-screen">
        <div className="relative h-full w-full">
          <div className="absolute bg-gradient-to-bl from-primary-500 to-secondary-600 rounded-b-2xl bottom-0 left-0 right-0 top-[-200px]"></div>
          <div className="absolute bottom-[-34px] left-0 right-0 top-0">
            <div className="max-w-[375px] mx-auto p-4 flex flex-col gap-6">
              <div className="flex flex-col items-center relative">
                <Image
                  src="/white-small-logo.png"
                  alt="logo"
                  width={13}
                  height={15}
                  style={{ position: "absolute", top: 0, left: 90 }}
                />
                <h1 className="text-3xl font-bold text-white text-center">TERMFAI</h1>
                <h2 className="text-2xl font-semibold text-white text-center">Carbon Trade Exchange</h2>
              </div>
              <div className="bg-white rounded-xl p-1 h-14 w-full grid grid-cols-3 relative shadow-2xl">
                <button className={tab == 1 ? selectedClass : unselectedClass} onClick={() => setTab(1)}>
                  Port
                </button>
                <button className={tab == 2 ? selectedClass : unselectedClass} onClick={() => setTab(2)}>
                  Sell
                </button>
                <button className={tab == 3 ? selectedClass : unselectedClass} onClick={() => setTab(3)}>
                  Buy
                </button>
              </div>
              {/* <div className="bg-white rounded-2xl h-[68px] shadow-2xl px-4 flex items-center">
                <div
                  className="rounded-full border border-gray-50 bg-gray-25 h-11 w-full flex gap-2 px-3 py-2"
                  onClick={() => {
                    document.getElementById("search-input")!.focus();
                  }}
                >
                  <img src="/search-icon.svg" alt="search icon" />
                  <input
                    id="search-input"
                    type="text"
                    className="focus:outline-none bg-gray-25 disabled:text-gray-500"
                    disabled
                    value="termfai"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
