import { getSession } from "next-auth/react"
import Image from "next/image"
import Logout from "@/components/auth/logout"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  console.log(session, "session");

  if(!session) {
    redirect("/")
  }

  return (
      
    <div className="container mx-auto">
      <header className="py-4 flex justify-between items-center border-b">
        <Image width={80} height={80} src="/logo.jpeg" alt="Logo"></Image>
        <Logout/>
      </header>  
      <div className="text-center py-20">
        <h2 className="text-xl font-medium">LGU STA. MARGARITA - ACCOUNTING OFFICE</h2>
        <h1 className="text-4xl font-bold mt-2">DOCUMENT FINDER</h1>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}