import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mt-8">
      <div>
        <Input placeholder="Search document" className="lg:w-1/2 mx-auto h-12 placeholder:text-base" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10 gap-6">
        {
          Array.from({ length: 15 }).map((_, index) => (
            <Link href={`/dashboard/${index}`} key={index} className="bg-gray-500 p-6 rounded-sm cursor-pointer">
              <div className="border-2 border-gray-50 p-4 rounded-sm">
                <span className="h-6 block mx-8 w-auto rounded-4xl border-2 border-gray-50"></span>
                <p className="uppercase font-bold mt-3 text-lg text-white text-center">Cabinet {index + 1}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
