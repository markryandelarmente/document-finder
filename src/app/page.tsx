import { getSession } from "@/auth";
import { LoginForm } from "@/components/auth/login-form"
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if(session) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
    
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      HELLO WORLD
    </div>
  )
}
