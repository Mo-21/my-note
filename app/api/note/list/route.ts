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

  const notes = await prisma?.note.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });

  const hasMore = notes ? notes.length > limit : false;
  const nextCursor = hasMore ? notes?.pop()?.id : null;

  return NextResponse.json(
    { data: notes, hasMore, nextCursor },
    { status: 200 }
  );
}
