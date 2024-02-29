import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: number = await req.json();

  if (!body)
    return NextResponse.json({ message: "No ID provided" }, { status: 403 });

  await prisma?.note.delete({
    where: {
      id: body,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
