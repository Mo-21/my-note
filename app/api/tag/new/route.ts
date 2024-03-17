import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const body: { name: string } = await req.json();
  if (!body)
    return NextResponse.json({ message: "incorrect request" }, { status: 400 });

  const isExist = await prisma.tag.findMany({
    where: {
      name: body.name,
    },
  });

  if (isExist.length > 0)
    return NextResponse.json(
      { message: "Tag name must be unique" },
      { status: 400 }
    );

  const newTag = await prisma.tag.create({
    data: {
      name: body.name,
      User: {
        connect: { email: session.user.email },
      },
    },
  });

  return NextResponse.json(newTag, { status: 201 });
}
