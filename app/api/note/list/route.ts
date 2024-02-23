import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 402 });

  const notes = await prisma?.note.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
  });

  return NextResponse.json(notes, { status: 201 });
}
