import { getSession } from "@/auth";
import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if(session) {
    redirect("/dashboard")
  }
    
  return (
    <>

      <div className="text-center flex flex-col justify-center items-center gap-4 mt-8">
        <Image width={80} height={80} src="/logo.jpeg" alt="Logo"></Image>
        <h2 className="text-xl font-medium">LGU STA. MARGARITA - ACCOUNTING OFFICE</h2>
        <h1 className="text-2xl font-bold">DOCUMENT FINDER</h1>
      </div>
      <div className="flex mt-8 w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
