"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Page() {
  const [searchKey, setSearchKey] = useState("")
  const [cabinets, setCabinets] = useState([])
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  // Fetch data from API
  const fetchCabinets = async (query: string) => {
    try {
      const res = await fetch(`/api/cabinets?searchKey=${query}`, {
        cache: "no-store",
      })
      if (!res.ok) throw new Error("Failed to fetch cabinets")
      const data = await res.json()
      setCabinets(data)
    } catch (error) {
      console.error("Error fetching cabinets:", error)
    }
  }

  // Handle search input change with manual debounce using setTimeout
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchKey(query)
    setIsLoading(true)

    if (typingTimeout) clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      fetchCabinets(query)
      setIsLoading(false)
    }, 1000) // Delay API call

    setTypingTimeout(timeout) // Store timeout reference
  }

  // Initial fetch (empty search)
  useEffect(() => {
    fetchCabinets("")
  }, [])

  return (
    <div className="mt-5">
      <div>
        <Input
          placeholder="Search cabinets"
          className="lg:w-1/2 mx-auto h-12 placeholder:text-base bg-white"
          value={searchKey}
          onChange={handleSearchChange}
        />
      </div>

      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : cabinets.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10 gap-6">
          {cabinets.map((cabinet: any) => (
            <Link
              href={`/dashboard/${cabinet.id}`}
              key={cabinet.id}
              className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="border-2 border-emerald-700 p-4 rounded-sm bg-white">
                <span className="h-6 block mx-8 w-auto rounded-4xl border-2 border-orange-700"></span>
                <p className="uppercase font-bold mt-3 text-lg text-black text-center">
                  {cabinet.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center w-full border-dotted border mt-8 flex items-center justify-center h-[50vh]">
          <p>NO CABINETS FOUND!</p>
        </div>
      )}
    </div>
  )
}
