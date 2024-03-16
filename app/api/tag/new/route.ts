import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  if (!body)
    return NextResponse.json({ message: "incorrect request" }, { status: 400 });

  const newTag = await prisma.tag.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newTag, { status: 201 });
}
