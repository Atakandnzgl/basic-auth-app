// src/app/api/profile/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name } = await req.json();

  if (!name || !name.trim()) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: { name: name.trim() },
  });

  return NextResponse.json({
    success: true,
    user: {
      id: updated.id,
      email: updated.email,
      name: updated.name,
    },
  });
}
