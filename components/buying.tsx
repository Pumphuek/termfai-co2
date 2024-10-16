"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

export default function Buying() {
  const { data, error, isLoading } = useSWR<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(
    "/api/carbon-credit",
    (url: string) =>
      axios.get<Prisma.CarbonCreditGetPayload<{ include: null }>[]>(url).then((response) => response.data)
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="pt-[168px]">
      <header className="fixed top-0 left-0 right-0 h-[134px] w-screen">
        <div className="relative h-full w-full">
          <div className="absolute bg-gradient-to-bl from-primary-500 to-secondary-600 rounded-b-2xl bottom-0 left-0 right-0 top-[-200px]"></div>
          <div className="absolute bottom-[-34px] left-0 right-0 top-0">
            <div className="max-w-[375px] mx-auto p-4 flex flex-col gap-6">
              <div className="bg-white rounded-xl p-1 h-14 w-full grid grid-cols-3 relative">
                <button disabled className="font-semibold order-1 text-gray-400">
                  Port
                </button>
                <button disabled className="font-semibold order-2 text-gray-400">
                  Sell
                </button>
                <button className="font-semibold order-3 text-white rounded-lg bg-secondary-600">Buy</button>
              </div>
              <div className="bg-white rounded-2xl h-[68px] shadow-2xl px-4 flex items-center">
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
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-[85px] max-w-[375px] mx-auto py-6 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex">
            <h3 className="font-semibold text-3xl text-gray-900 flex-1">{data && data.length > 0 && data[0].name}</h3>
            <span className="font-semibold text-2xl text-gray-900">฿ {data && data.length > 0 && data[0].price}</span>
          </div>
          <div className="rounded-2xl flex flex-col overflow-hidden shadow">
            <div className="h-14 bg-primary-500 flex justify-center items-center">
              <h4 className="text-white font-semibold text-lg">Carbon Credit {error && error}</h4>
            </div>
            <div className="grid grid-cols-2 h-12 bg-gray-25">
              <div className="flex px-4 py-3">
                <span className="text-left ">Offer</span>
              </div>
              <div className="flex px-4 py-3">
                <span className="text-left ">Volumn</span>
              </div>
            </div>
            <div className="grid grid-cols-2 h-12">
              <div className="flex px-4 py-3">
                <span className="text-left text-success-500">{data && data.length > 0 && data[0].price} ฿</span>
              </div>
              <div className="flex px-4 py-3">
                <span className="text-left ">{data && data.length > 0 && data[0].volumn}</span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
}
