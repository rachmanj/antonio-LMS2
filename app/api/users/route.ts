import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, name, username, password } = await req.json();

    const emailExists = await db.user.findUnique({
      where: {
        email,
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

    const usernameExists = await db.user.findUnique({
      where: {
        username,
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

    const hashedPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
      },
    });

    // remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        data: userWithoutPassword,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
    },
  });

  return NextResponse.json(
    {
      data: users,
    },
    {
      status: 200,
    }
  );
}
