"use client"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const [searchKey, setSearchKey] = useState("")
  const [cabinet, setCabinet] = useState<any>({})
  const [documents, setDocuments] = useState<any>([])
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  // Fetch data from API
  const fetchCabinet = async () => {
    try {
      const res = await fetch(`/api/cabinets/${params.id}`, {
        cache: "no-store",
      })
      if (!res.ok) throw new Error("Failed to fetch documents")
      const data = await res.json()
      setCabinet(data)
    } catch (error) {
      console.error("Error fetching cabinet:", error)
    }
  }

  const fetchDocuments = async (query: string) => {
    try {
      const res = await fetch(
        `/api/documents?searchKey=${query}&cabinetId=${params.id}`,
        { cache: "no-store" }
      )
      if (!res.ok) throw new Error("Failed to fetch documents")
      const data = await res.json()
      setDocuments(data)
    } catch (error) {
      console.error("Error fetching documents:", error)
    }
  }

  // Handle search input change with manual debounce using setTimeout
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchKey(query)
    setIsLoading(true)

    if (typingTimeout) clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      fetchDocuments(query)
      setIsLoading(false)
    }, 1000) // Delay API call

    setTypingTimeout(timeout) // Store timeout reference
  }

  // Initial fetch (empty search)
  useEffect(() => {
    fetchCabinet()
    fetchDocuments("")
  }, [])

  if (!cabinet) {
    return <div>NOT FOUND</div>
  }

  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 lg:mb-0">{cabinet.name} Documents</h1>
        <Input
          placeholder="Search documents"
          className="lg:w-1/3 h-12 placeholder:text-base bg-white"
          value={searchKey}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        <Table className="bg-white/30">
          <TableCaption className="text-black">A list of your documents.</TableCaption>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[150px] ">CHECK NO.</TableHead>
              <TableHead className="text-center">DV NUMBER</TableHead>
              <TableHead className="text-center">DOCUMENT NAME</TableHead>
              <TableHead className="text-center">DEPARTMENT</TableHead>
              <TableHead className="text-center">PAYEE</TableHead>
              <TableHead className="text-center">DATE ADDED</TableHead>
              <TableHead className="text-center">CABINET NO.</TableHead>
              <TableHead className="text-center">STATUS</TableHead>
              <TableHead className="text-center">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="font-medium py-6 text-center" colSpan={5}>LOADING...</TableCell>
              </TableRow>
            ) : documents.length > 0 ? (
                documents.map((document: any) => (
                  <TableRow>
                    <TableCell className="font-medium py-6">{document.id}</TableCell>
                    <TableCell>2024-001</TableCell>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>Mayor's Office</TableCell>
                    <TableCell>Bengie Arcagua</TableCell>
                    <TableCell>{document.createdAt}</TableCell>
                    <TableCell>{cabinet.name}</TableCell>
                    <TableCell><Badge variant="secondary">Available</Badge></TableCell>
                    <TableCell>
                      <Button className="bg-green-500"> view document  </Button> <Button >borrow</Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell className="font-medium py-6 text-center" colSpan={5}>NO CABINETS FOUND</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Link href={'/'}>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
