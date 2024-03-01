import { editorNoteSchema } from "@/prisma/schema/editorNoteSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { NewNoteType } from "@/app/hooks/useCreateAndUpdateNote";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: NewNoteType = await req.json();
  if (!body)
    return NextResponse.json({ message: "incorrect request" }, { status: 400 });

  const noteValidation = editorNoteSchema.safeParse(body);
  if (!noteValidation.success)
    return NextResponse.json(
      { message: noteValidation.error.format() },
      { status: 400 }
    );

  console.log(body);
  const newNote = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      NoteType: body.NoteType,
      User: {
        connect: { email: session.user?.email },
      },
    },
  });

  return NextResponse.json(newNote, { status: 201 });
}
