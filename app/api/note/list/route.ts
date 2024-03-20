import prisma from "@/prisma/prisma";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 402 });

  const cursor = parseInt(req.nextUrl.searchParams.get("cursor")!, 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
  const skip = (cursor - 1) * limit;
  
  const notes = await prisma?.note.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
    include: { tags: true },
    orderBy: {
      updatedAt: "desc",
    },
    skip,
    take: limit,
  });

  const totalNotes = await prisma.note.count();
  const hasMore = skip + limit < totalNotes;

  return NextResponse.json({ data: notes, hasMore }, { status: 200 });
}
