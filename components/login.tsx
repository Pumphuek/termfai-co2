interface LoginProps {}

export default function Login(props: LoginProps) {
  return (
    <main className="w-screen">
      <header className="w-full">
        <div className="max-w-[375px] mx-auto flex justify-center items-center h-14 border-b border-g">
          <h1 className="font-medium">เข้าสู่ระบบ</h1>
        </div>
      </header>
    </main>
  );
}
