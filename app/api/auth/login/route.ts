import { NextRequest, NextResponse } from "next/server";
import { LoginSchemaType, loginSchema } from "@/app/validationSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: LoginSchemaType = await req.json();
  console.log(body);
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
