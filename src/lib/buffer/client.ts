class BufferClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const baseUrl = 'https://api.buffer.com/1';
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Buffer API error: ${response.statusText}`);
    }

    return response.json();
  }

  async schedulePost({
    text,
    platform,
    scheduledAt,
  }: {
    text: string;
    platform: string;
    scheduledAt: Date;
  }) {
    try {
      // Get the first profile for the specified platform
      const profiles = await this.request('/profiles.json');
      const profile = profiles.find((p: any) => p.service === platform);

      if (!profile) {
        throw new Error(`No profile found for platform: ${platform}`);
      }

      // Create and schedule the post
      const post = await this.request('/updates/create.json', {
        method: 'POST',
        body: JSON.stringify({
          text,
          profile_ids: [profile.id],
          scheduled_at: scheduledAt.toISOString(),
        }),
      });

      return post;
    } catch (error) {
      console.error('Buffer API error:', error);
      throw error;
    }
  }

  async getPostAnalytics(postId: string) {
    try {
      const analytics = await this.request(`/updates/${postId}/analytics.json`);
      return {
        likes: analytics.reactions || 0,
        comments: analytics.comments || 0,
        shares: analytics.shares || 0,
        impressions: analytics.reach || 0,
        engagement_rate: analytics.engagement || 0,
      };
    } catch (error) {
      console.error('Buffer Analytics API error:', error);
      throw error;
    }
  }
}

if (!process.env.BUFFER_ACCESS_TOKEN) {
  throw new Error('Missing env.BUFFER_ACCESS_TOKEN');
}

export const buffer = new BufferClient(process.env.BUFFER_ACCESS_TOKEN); 