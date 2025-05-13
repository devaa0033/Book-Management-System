import { NextResponse } from 'next/server';
import { generateAccessToken, verifyRefreshToken } from '@/middleware/authMiddleware.js';

export async function POST(req) {
  console.log('🔔 Refresh route hit');
  

  console.log('All cookies:', req.cookies.getAll());

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    console.log('Incoming refresh token:', refreshToken);

    if (!refreshToken) {
      console.warn('No refresh token provided');
      return NextResponse.json({ error: 'Not authenticated!' }, { status: 401 });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      console.warn('Refresh token is invalid or expired');
      return NextResponse.json({ error: 'Refresh token is not valid!' }, { status: 403 });
    }

    const newAccessToken = generateAccessToken(decoded);
    console.log('New access token issued:', newAccessToken);

    return NextResponse.json({ accessToken: newAccessToken }, { status: 200 });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Refresh token error' }, { status: 500 });
  }
}
