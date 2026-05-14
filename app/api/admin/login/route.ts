import { NextRequest, NextResponse } from 'next/server';

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@decoisme.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create response with success
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
      });

      // Set secure HTTP-only cookie
      response.cookies.set('admin_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
