import { NextResponse } from 'next/server';
import { testConnection } from '../../../lib/db';

export async function GET() {
  try {
    const isConnected = await testConnection();
    return NextResponse.json({ success: isConnected });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
} 