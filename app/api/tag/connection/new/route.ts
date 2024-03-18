import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Note, Tag } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: {
    note: Note;
    tag: Tag;
  } = await req.json();

  if (!body)
    return NextResponse.json({ message: "No ID provided" }, { status: 403 });

  const updatedNote = await prisma?.note.update({
    where: {
      id: body.note.id,
    },

    data: {
      tags: {
        connect: {
          id: body.tag.id,
        },
      },
    },
  });

  return NextResponse.json(updatedNote, { status: 201 });
}
