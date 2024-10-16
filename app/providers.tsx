import CarbonCreditBuyingProvider from "@/providers/carbon-credit-buying";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CarbonCreditBuyingProvider>{children}</CarbonCreditBuyingProvider>;
}
