import Image from "next/image";

interface LoginProps {}

export default function Login(props: LoginProps) {
  return (
    <main className="w-screen">
      <header className="w-full border-b border-gray-200">
        <div className="max-w-[375px] mx-auto flex justify-center items-center h-14">
          <h1 className="font-medium">เข้าสู่ระบบ</h1>
        </div>
      </header>
      <center className="max-w-[375px] mx-auto">
        <div className="flex flex-col gap-12 py-4">
          <div className="flex flex-col gap-4 items-start">
            <div className="p-4">
              <Image alt="TERMFAI logo" src="/termfai-logo.png" width={80} height={80} />
            </div>
            <div className="flex flex-col gap-2 py-2 px-4 items-start">
              <h2 className="text-2xl font-semibold text-primary-500">ยินดีต้อนรับเข้าสู่ Termfai</h2>
              <span className="text-lg text-gray-700">Carbon Trade Exchange</span>
            </div>
          </div>
          <div className="px-4">
            <input
              className="border rounded-lg border-gray-50 h-[50px] w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary-300 px-2 py-3"
              placeholder="ระบุชื่อ"
            />
          </div>
          <div className="px-4">
            <button className="rounded-lg bg-primary-500 h-11 text-white w-full">ถัดไป</button>
          </div>
        </div>
      </center>
    </main>
  );
}
