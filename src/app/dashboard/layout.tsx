import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <header className="py-4 flex justify-between items-center border-b">
        <Image width={80} height={80} src="/logo.jpeg" alt="Logo"></Image>
        <Button>Logout</Button>
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