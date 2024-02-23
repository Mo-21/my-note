import {
  SignUpSchemaType,
  signUpSchema,
} from "@/prisma/schema/validationSchema";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body: SignUpSchemaType = await req.json();

  if (!body || Object.keys(body).length === 0)
    return NextResponse.json(
      { message: "Request body is empty or invalid." },
      { status: 400 }
    );

  const validation = signUpSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
      image: body?.avatar,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
