import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await req.json();

  // check if email exists
  if (body.email) {
    const emailExists = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (emailExists) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }
  }

  // check if username exists
  if (body.username) {
    const usernameExists = await db.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }
  }

  // check if password exists
  if (body.password) {
    const hashedPassword = await hash(body.password, 10);
    body.password = hashedPassword;
  }

  const user = await db.user.update({
    where: {
      id: userId,
    },
    data: body,
  });

  // remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({
    data: userWithoutPassword,
  });
}
