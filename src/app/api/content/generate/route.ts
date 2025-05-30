import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Get the authorization token from the request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get request body
    const { prompt, platform, tone, length } = await request.json();

    if (!prompt || !platform || !tone || !length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional social media content creator. Create content for ${platform} that is ${tone} in tone and ${length} in length.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedContent = completion.choices[0].message.content;

    return NextResponse.json({
      content: generatedContent,
      platform,
      userId
    });

  } catch (error: any) {
    console.error('Content generation error:', error);
    
    if (error.code === 'auth/invalid-token') {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 