import {NextResponse} from 'next/server';
import {generateAccessToken, verifyRefreshToken} from '@/middleware/authMiddleware.js';


export async function POST(req) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            return NextResponse.json({error: 'Not authenticated!'}, {status: 401});
        }
        const decoded = verifyRefreshToken(refreshToken);
        if(!decoded) {
            return NextResponse.json({error: 'Refresh token is not valid!'}, {status: 403});
        }
        const newAccessToken = generateAccessToken(decoded);
        return NextResponse.json({accessToken: newAccessToken}, {status: 200});
    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({error: 'Refresh token error'}, {status: 500});
    }
}