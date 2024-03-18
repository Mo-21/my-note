import prisma from "@/prisma/prisma";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 402 });

  const cursorParam = req.nextUrl.searchParams.get("cursor");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

  let cursor = cursorParam ? parseInt(cursorParam, 10) : null;
  if (cursor && isNaN(cursor)) {
    // Check if cursor is NaN after conversion attempt
    cursor = null; // Reset cursor to null if conversion failed
  }

  const tags = await prisma?.tag.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
    include: { notes: true },
    take: limit + 1,
    cursor: cursor ? { id: cursor.toString() } : undefined,
  });

  const hasMore = tags ? tags.length > limit : false;
  const nextCursor = hasMore ? tags?.pop()?.id : null;

  return NextResponse.json(
    { data: tags, hasMore, nextCursor },
    { status: 200 }
  );
}
