import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    // Try to count users as a simple test
    const count = await prisma.user.count();
    return NextResponse.json({ success: true, userCount: count });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
} 