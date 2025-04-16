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
    <div className="min-h-screen bg-gray-100">
      <div className="absolute inset-0">
        <Image
          src="/dash.PNG"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col justify-center items-center gap-2 mt-4">
          <Image width={200} height={200} src="/logo.png" alt="Logo"></Image>
          <h2 className="text-2xl font-medium">LGU STA. MARGARITA, SAMAR - ACCOUNTING OFFICE</h2>
          <h1 className="text-4xl font-bold">DOCUMENT FINDER</h1>
        </div>
        <div className="flex mt-5 w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-black shadow-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
