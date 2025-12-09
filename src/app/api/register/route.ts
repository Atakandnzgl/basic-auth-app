import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    if ( !email || !password) {
      return NextResponse.json(
          { message: "Email and password are required." },
          { status: 400 }
          );
      }
      const existingUser = await prisma.user.findUnique({
      where: { email },
      });
      if (existingUser) {
      return NextResponse.json(
          { message: "User with this email already exists." },
          { status: 400 }
          );
      }
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
      data: {
          name,
          email,
          password: hashedPassword,
      },
      });
      return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}