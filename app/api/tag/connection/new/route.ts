import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Tag } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: {
    noteId: number;
    tag: Tag;
  } = await req.json();

  if (!body)
    return NextResponse.json({ message: "No ID provided" }, { status: 403 });

  const updatedNote = await prisma?.note.update({
    where: {
      id: body.noteId,
    },

    data: {
      tags: {
        connect: body.tag,
      },
    },
  });

  return NextResponse.json(updatedNote, { status: 201 });
}
