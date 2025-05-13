import { NextResponse } from "next/server";
import { loginUser, storeRefreshToken } from '@/lib/queries/auth.js';
import { loginSchema } from '@/validations/memberSchema.js';
import { generateAccessToken, generateRefreshToken } from '@/middleware/authMiddleware.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const result = await loginUser({ email, password });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const accessToken = generateAccessToken(result.user);
    const refreshToken = generateRefreshToken(result.user);

    await storeRefreshToken(result.user.id, refreshToken);

    const response = NextResponse.json({
      message: 'User logged in successfully',
      accessToken,
      refreshToken,
      user: result.user,
    }, { status: 200 });

   
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

  
    response.cookies.set('userId', String(result.user.id), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return response;
  } catch (error) {
    console.error('Login error: ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
