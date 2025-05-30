import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import { generateContent } from '@/lib/openai';
import { z } from 'zod';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});

const generateSchema = z.object({
  prompt: z.string().min(1).max(1000),
  platforms: z.array(z.enum(['twitter', 'linkedin', 'instagram', 'facebook', 'tiktok'])),
  tone: z.enum(['professional', 'casual', 'friendly', 'formal']).optional(),
  contentType: z.enum(['text', 'image', 'video']).optional(),
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(10, 'GENERATE_CONTENT'); // 10 requests per minute
    } catch {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const result = generateSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { prompt, platforms, tone = 'professional', contentType = 'text' } = result.data;

    // Get user preferences for context
    const userPreferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    // Generate content using our optimized client
    const generatedContent = await generateContent({
      prompt,
      platforms,
      tone,
      industry: userPreferences?.industryType,
      brandVoice: userPreferences?.brandVoice,
      brandKeywords: userPreferences?.brandKeywords,
    });

    // Store the generated content
    const post = await prisma.post.create({
      data: {
        userId: session.user.id,
        content: generatedContent || '',
        platforms,
        status: 'draft',
      },
    });

    return NextResponse.json({ 
      success: true, 
      post,
    });

  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 