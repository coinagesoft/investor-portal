import connectDB from "@/lib/db";

import User from "@/models/User";

import {
  createToken,
  cookieOptions,
} from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    await connectDB();

    const {
      email,
      password,
    } = await req.json();

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        {
          status: 401,
        }
      );
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      createToken(user);

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login successful",
      });

    response.cookies.set(
      "token",
      token,
      cookieOptions
    );

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}