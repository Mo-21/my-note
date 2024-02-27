import { NextRequest, NextResponse } from "next/server";
import { LoginSchemaType, loginSchema } from "@/prisma/schema/validationSchema";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body: LoginSchemaType = await req.json();
  if (!body || Object.keys(body).length === 0)
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );

  const validation = loginSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user)
    return NextResponse.json({ message: "No user found" }, { status: 404 });

  const hashedPassword = await bcrypt.compare(
    body.password,
    user.hashedPassword
  );

  if (!hashedPassword)
    return NextResponse.json(
      { message: "Password is incorrect" },
      { status: 402 }
    );

  return NextResponse.json({ status: 201 });
}
