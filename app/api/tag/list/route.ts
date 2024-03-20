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

  const tags = await prisma?.tag.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
    include: { notes: true },
    skip,
    take: limit,
  });

  const totalTags = await prisma.tag.count();
  const hasMore = skip + limit < totalTags;

  return NextResponse.json({ data: tags, hasMore }, { status: 200 });
}
