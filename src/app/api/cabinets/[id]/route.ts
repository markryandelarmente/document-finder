import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  
  const cabinet = await prisma.cabinet.findUnique({
    where: {
      id: id
    }
  })

  return new Response(JSON.stringify(cabinet), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
