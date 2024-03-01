import {
  editorNoteSchema,
  EditorNoteType,
} from "@/prisma/schema/editorNoteSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: EditorNoteType = await req.json();
  if (!body)
    return NextResponse.json({ message: "incorrect request" }, { status: 400 });

  const noteValidation = editorNoteSchema.safeParse(body);
  if (!noteValidation.success)
    return NextResponse.json(
      { message: noteValidation.error.format() },
      { status: 400 }
    );

  const newNote = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      User: {
        connect: { email: session.user?.email },
      },
    },
  });

  return NextResponse.json(newNote, { status: 201 });
}
