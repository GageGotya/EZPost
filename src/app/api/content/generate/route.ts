import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { topic, platform, tone } = await request.json();

    // Get user's business profile from Supabase
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Choose AI model based on platform
    let content;
    if (platform === 'linkedin' || platform === 'facebook') {
      // Use Claude for longer-form content
      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Generate a ${platform} post about ${topic} for ${profile?.name || 'a business'}. 
          Tone: ${tone}
          Target audience: ${profile?.target_audience || 'professionals'}
          Business type: ${profile?.type || 'business'}
          Make it engaging and optimized for ${platform}'s best practices.`
        }]
      });
      content = response.content[0].text;
    } else {
      // Use GPT-4 for shorter content (Twitter, Instagram)
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a social media expert who creates engaging ${platform} content.`
          },
          {
            role: 'user',
            content: `Generate a ${platform} post about ${topic} for ${profile?.name || 'a business'}.
            Tone: ${tone}
            Target audience: ${profile?.target_audience || 'general audience'}
            Business type: ${profile?.type || 'business'}
            Make it engaging and optimized for ${platform}'s best practices.`
          }
        ]
      });
      content = response.choices[0].message.content;
    }

    // Store the generated content in Supabase
    await supabase.from('social_posts').insert({
      user_id: userId,
      platform,
      content,
      status: 'draft',
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 