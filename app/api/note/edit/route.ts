import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: {
    id: number;
    content: string;
    title?: string | null | undefined;
  } = await req.json();

  if (!body)
    return NextResponse.json({ message: "No ID provided" }, { status: 403 });

  const updatedNote = await prisma?.note.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(updatedNote, { status: 201 });
}
