import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cabinetId = searchParams.get("cabinetId") || "";
  const searchKey = searchParams.get("searchKey") || "";

  if(!cabinetId) {
    return new Response(JSON.stringify({message: "NOT FOUND"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const documents = await prisma.document.findMany({
    where: {
      cabinetId: cabinetId,
      name: {
        contains: searchKey,
        mode: "insensitive", // Case-insensitive search
      },
    },
  });

  return new Response(JSON.stringify(documents), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
