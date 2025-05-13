import { NextResponse } from "next/server";
import { signOutUser } from "@/lib/queries/auth.js";
import { VERIFY_ACCESS_TOKEN } from "@/middleware/authMiddleware.js";

export async function POST(req) {
    try {
      const result = await VERIFY_ACCESS_TOKEN(req);
  
      if (!result.success) {
        return result.response;
      }
  
      const userId = result.id;
  
      await signOutUser(userId);
  
      const response = NextResponse.json(
        { message: "User signed out successfully" },
        { status: 200 }
      );
  
      // Clear cookies
      response.cookies.set("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
  
      response.cookies.set("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
  
      return response;
  
    } catch (error) {
      console.error("Error signing out user:", error.message);
      return NextResponse.json(
        { error: "Error signing out user" },
        { status: 500 }
      );
    }
  }
  