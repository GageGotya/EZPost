import OpenAI from 'openai';
import Anthropic from 'anthropic';
import Replicate from 'replicate';
import { ContentTone, PlatformType } from '../supabase/types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env.OPENAI_API_KEY');
}

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing env.ANTHROPIC_API_KEY');
}

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('Missing env.REPLICATE_API_TOKEN');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface GenerateContentParams {
  topic: string;
  tone: ContentTone;
  platform: PlatformType;
  businessProfile: {
    name: string;
    type: string;
    description: string;
    targetAudience: string;
    keywords: string[];
  };
}

interface GenerateImageParams {
  prompt: string;
  style: string;
  ratio: '1:1' | '4:5' | '16:9';
}

export async function generateContent({
  topic,
  tone,
  platform,
  businessProfile,
}: GenerateContentParams): Promise<string> {
  // Use Claude for longer content (LinkedIn, Facebook)
  if (platform === 'linkedin' || platform === 'facebook') {
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Generate a ${platform} post about ${topic} for ${businessProfile.name}, a ${businessProfile.type} business. 
        Tone: ${tone}
        Target audience: ${businessProfile.targetAudience}
        Business description: ${businessProfile.description}
        Keywords: ${businessProfile.keywords.join(', ')}
        
        Make it engaging and optimized for ${platform}'s best practices.`
      }]
    });

    return response.content[0].text;
  }

  // Use GPT-4 for shorter content (Twitter, Instagram, TikTok)
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a social media expert who creates engaging ${platform} content.`
      },
      {
        role: 'user',
        content: `Generate a ${platform} post about ${topic} for ${businessProfile.name}, a ${businessProfile.type} business.
        Tone: ${tone}
        Target audience: ${businessProfile.targetAudience}
        Business description: ${businessProfile.description}
        Keywords: ${businessProfile.keywords.join(', ')}
        
        Make it engaging and optimized for ${platform}'s best practices.`
      }
    ]
  });

  return response.choices[0].message.content || '';
}

export async function generateImage({
  prompt,
  style,
  ratio,
}: GenerateImageParams): Promise<string> {
  // Use Replicate's SDXL model for high-quality images
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: `${prompt}, ${style}, professional quality, commercial photography`,
        negative_prompt: "low quality, blurry, watermark, text, logo",
        width: ratio === '16:9' ? 1024 : 1024,
        height: ratio === '4:5' ? 1280 : ratio === '16:9' ? 576 : 1024,
        num_outputs: 1,
      }
    }
  );

  return Array.isArray(output) ? output[0] : '';
}

export async function improveContent(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a social media expert who improves content engagement.'
      },
      {
        role: 'user',
        content: `Improve this social media post to make it more engaging and likely to get better reach:

${content}

Keep the same general message but make it more compelling.`
      }
    ]
  });

  return response.choices[0].message.content || content;
}

export async function suggestHashtags(content: string, platform: PlatformType): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a social media expert who suggests relevant hashtags for ${platform}.`
      },
      {
        role: 'user',
        content: `Suggest 5-10 relevant and trending hashtags for this ${platform} post:

${content}

Return only the hashtags, separated by spaces.`
      }
    ]
  });

  return (response.choices[0].message.content || '').split(' ').filter(tag => tag.startsWith('#'));
} 