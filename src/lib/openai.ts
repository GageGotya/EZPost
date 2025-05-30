import { OpenAI } from 'openai';
import { LRUCache } from 'lru-cache';
import type { SocialPlatform } from './social';

const contentCache = new LRUCache({
  max: 500, // Store up to 500 items
  ttl: 1000 * 60 * 60 * 24, // Cache for 24 hours
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateContentParams = {
  prompt: string;
  platforms: SocialPlatform[];
  tone?: string;
  industry?: string;
  brandVoice?: string;
  brandKeywords?: string[];
};

export async function generateContent({
  prompt,
  platforms,
  tone = 'professional',
  industry = 'general',
  brandVoice = 'professional',
  brandKeywords = [],
}: GenerateContentParams): Promise<string> {
  // Create a cache key from the parameters
  const cacheKey = JSON.stringify({
    prompt,
    platforms,
    tone,
    industry,
    brandVoice,
    brandKeywords,
  });

  // Check cache first
  const cached = contentCache.get(cacheKey);
  if (cached) {
    return cached as string;
  }

  // If not in cache, generate new content
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using 3.5-turbo instead of GPT-4 to reduce costs
      messages: [
        {
          role: "system",
          content: `You are a social media content expert. Create content that is optimized for ${platforms.join(', ')}. 
                   Tone: ${tone}
                   Industry: ${industry}
                   Brand Voice: ${brandVoice}
                   Brand Keywords: ${brandKeywords.join(', ')}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500, // Limit token usage
    });

    const content = completion.choices[0].message.content || '';
    
    // Cache the result
    contentCache.set(cacheKey, content);
    
    return content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateHashtags(
  content: string,
  platform: SocialPlatform,
  industry: string
): Promise<string[]> {
  const cacheKey = `hashtags:${content.slice(0, 100)}:${platform}:${industry}`;
  
  // Check cache first
  const cached = contentCache.get(cacheKey);
  if (cached) {
    return cached as string[];
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate relevant hashtags for ${platform} content in the ${industry} industry. 
                   For Twitter: max 3 hashtags
                   For Instagram: max 15 hashtags
                   For LinkedIn: max 5 hashtags
                   For TikTok: max 8 hashtags
                   For Facebook: max 3 hashtags`
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.6,
      max_tokens: 100,
    });

    const hashtags = (completion.choices[0].message.content || '')
      .split(/\s+/)
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.toLowerCase());

    // Cache the result
    contentCache.set(cacheKey, hashtags);
    
    return hashtags;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return [];
  }
} 