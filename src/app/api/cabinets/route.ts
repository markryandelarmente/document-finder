import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchKey = searchParams.get("searchKey") || "";

  const cabinets = await prisma.cabinet.findMany({
    where: {
      name: {
        contains: searchKey,
        mode: "insensitive", // Case-insensitive search
      },
    },
  });

  return new Response(JSON.stringify(cabinets), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name } = body;

    // Validate input
    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Cabinet name is required and must be a string." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new cabinet in DB
    const newCabinet = await prisma.cabinet.create({
      data: { name },
    });

    return new Response(JSON.stringify(newCabinet), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating cabinet:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}