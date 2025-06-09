import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId, getToken } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the JWT token with our backend template
    const token = await getToken({
      template: 'backend'
    });

    // You can now use this token to make authenticated requests to your backend
    // or verify the user's permissions using the JWT claims

    return NextResponse.json({
      message: 'Authenticated successfully',
      userId,
      // Don't send the actual token to the client in production
      token: process.env.NODE_ENV === 'development' ? token : undefined
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 