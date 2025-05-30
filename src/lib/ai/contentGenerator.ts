import OpenAI from 'openai';
import { UserPreferences } from '@prisma/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Platform = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok';

interface ContentRequest {
  platform: Platform;
  userPreferences: UserPreferences;
  previousPosts?: string[];
  topic?: string;
}

const platformGuidelines: Record<Platform, string> = {
  twitter: 'Create engaging tweets under 280 characters. Use relevant hashtags sparingly.',
  linkedin: 'Professional tone, business-focused content with industry insights. 1300 characters max.',
  instagram: 'Visual-first approach with engaging captions. Use emojis and relevant hashtags.',
  facebook: 'Conversational tone, community-focused content. Can be longer form.',
  tiktok: 'Trendy, entertaining scripts optimized for short-form video content.'
};

const platformPrompts: Record<Platform, string> = {
  twitter: 'Write a tweet that',
  linkedin: 'Create a LinkedIn post that',
  instagram: 'Write an Instagram caption that',
  facebook: 'Create a Facebook post that',
  tiktok: 'Write a TikTok script that'
};

export async function generateContent(request: ContentRequest): Promise<string> {
  const { platform, userPreferences, previousPosts = [], topic } = request;
  
  const systemPrompt = `You are an expert social media content creator specializing in ${platform}. 
${platformGuidelines[platform]}
Brand voice: ${userPreferences.brandVoice || 'Professional and engaging'}
Industry: ${userPreferences.industryType || 'General business'}
Key brand terms: ${userPreferences.brandKeywords?.join(', ') || 'None specified'}`;

  const contentPrompt = `${platformPrompts[platform]} promotes the business while maintaining the brand voice and following platform best practices.${
    topic ? ` The post should be about: ${topic}` : ''
  }`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: contentPrompt }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content || '';
}

export async function generateHashtags(
  content: string,
  platform: Platform,
  industry: string
): Promise<string[]> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a social media hashtag expert. Generate relevant, trending hashtags for ${platform} posts in the ${industry} industry.`
      },
      {
        role: "user",
        content: `Generate 3-5 relevant hashtags for this post: "${content}"`
      }
    ],
    temperature: 0.6,
    max_tokens: 100
  });

  const hashtagText = completion.choices[0].message.content || '';
  return hashtagText
    .split(' ')
    .filter(tag => tag.startsWith('#'))
    .map(tag => tag.trim());
}

export async function generateContentBatch(
  request: ContentRequest,
  count: number
): Promise<string[]> {
  const posts: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const content = await generateContent({
      ...request,
      previousPosts: posts // Pass previously generated posts to maintain variety
    });
    posts.push(content);
  }
  
  return posts;
}

export async function optimizeContent(
  content: string,
  platform: Platform,
  goal: 'engagement' | 'clicks' | 'awareness'
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI expert at optimizing social media content for ${platform} to maximize ${goal}.`
      },
      {
        role: "user",
        content: `Optimize this post for ${goal}: "${content}"`
      }
    ],
    temperature: 0.5,
    max_tokens: 500
  });

  return completion.choices[0].message.content || content;
} 