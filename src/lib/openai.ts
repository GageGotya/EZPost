import OpenAI from 'openai';
import { ContentRequest, GeneratedContent, Platform } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PLATFORM_SPECS = {
  twitter: { maxLength: 280, style: 'concise and engaging' },
  linkedin: { maxLength: 3000, style: 'professional and insightful' },
  instagram: { maxLength: 2200, style: 'visual and trendy' },
  facebook: { maxLength: 63206, style: 'conversational and informative' },
  tiktok: { maxLength: 2200, style: 'trendy and entertaining' }
};

export async function generateContent(request: ContentRequest): Promise<GeneratedContent[]> {
  const { prompt, tone = 'professional', platforms, keywords = [] } = request;

  const results: GeneratedContent[] = [];

  for (const platform of platforms) {
    const spec = PLATFORM_SPECS[platform];
    
    const systemPrompt = `You are a social media expert who creates ${spec.style} content. 
    Create a post for ${platform} (max ${spec.maxLength} characters) that is ${tone} in tone.
    Include relevant hashtags. The content should incorporate these keywords: ${keywords.join(', ')}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) continue;

    // Extract hashtags
    const hashtags = content.match(/#[\w]+/g) || [];
    const cleanContent = content.replace(/(#[\w]+\s*)+$/, '').trim();

    results.push({
      platform,
      content: cleanContent,
      hashtags,
      suggestedTime: getSuggestedPostTime(platform)
    });
  }

  return results;
}

function getSuggestedPostTime(platform: Platform): string {
  // Get current date
  const now = new Date();
  
  // Add 24 hours to current time
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  // Best posting times by platform (simplified)
  const times = {
    linkedin: '9:00',
    twitter: '12:00',
    facebook: '15:00',
    instagram: '17:00',
    tiktok: '19:00'
  };
  
  // Set time to platform's best time
  const [hours, minutes] = times[platform].split(':');
  tomorrow.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return tomorrow.toISOString();
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