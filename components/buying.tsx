"use client";

import Head from "next/head";

export default function Buying() {
  return (
    <main>
      <Head>
        {/* Set the theme color for the status bar */}
        <meta name="theme-color" content="#FF5733" />
        {/* For iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#FF5733" />
      </Head>
      <header className="relative h-[134px] w-screen">
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
            <div className="bg-white rounded-xl h-[68px] shadow-2xl px-4 flex items-center">
              <div className="rounded-full border border-gray-50 bg-gray-25 h-11 w-full"></div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
