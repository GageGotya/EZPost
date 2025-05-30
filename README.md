# EZPost - AI-Powered Social Media Management

EZPost is a comprehensive social media management platform that leverages artificial intelligence to help small and medium-sized businesses automate and optimize their social media presence across multiple platforms.

## Features

- **AI-Powered Content Creation**: Automatically generate engaging, platform-optimized content for TikTok, LinkedIn, Instagram, Twitter, and Facebook
- **Smart Analytics**: Track performance metrics and get AI-driven insights to improve your social media strategy
- **Automated Scheduling**: Intelligent posting schedule that maximizes engagement
- **Multi-Platform Support**: Manage all your social media accounts from a single dashboard
- **Secure Authentication**: Enterprise-grade security with Clerk.com
- **Custom Branding**: Maintain consistent brand voice and style across all platforms

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk.com
- **Database**: Supabase
- **AI/ML**: OpenAI GPT-4, Claude, Replicate
- **Social Media**: Buffer API
- **Payments**: Stripe
- **Analytics**: Recharts
- **Styling**: Tailwind CSS, clsx

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Clerk.com account
- Supabase account
- OpenAI API key
- Buffer account
- Stripe account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Claude Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Replicate Configuration
REPLICATE_API_TOKEN=your_replicate_api_token

# Buffer Configuration
BUFFER_ACCESS_TOKEN=your_buffer_access_token

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GageGotya/EZPost.git
   cd EZPost
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
EZPost/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── dashboard/   # Dashboard pages
│   │   └── auth/        # Authentication pages
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   └── ui/         # Reusable UI components
│   ├── lib/            # Utility functions and helpers
│   │   ├── supabase/   # Supabase configuration and types
│   │   ├── ai/         # AI-related functions
│   │   └── stripe/     # Stripe integration
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
└── tests/           # Test files
```

## Social Media Platform Integration

### Twitter
1. Create a Twitter Developer account
2. Set up a Project and App
3. Configure OAuth 2.0 settings
4. Add credentials to environment variables

### LinkedIn
1. Create a LinkedIn Developer account
2. Create an application
3. Configure OAuth 2.0 settings
4. Add credentials to environment variables

### Facebook/Instagram
1. Create a Meta Developer account
2. Set up a Meta App
3. Configure OAuth settings
4. Add credentials to environment variables

### TikTok
1. Join the TikTok for Developers program
2. Create an application
3. Configure OAuth settings
4. Add credentials to environment variables

## AI Content Generation

EZPost uses OpenAI's GPT-4 to generate platform-specific content. The system:
1. Analyzes your brand voice and industry
2. Generates content optimized for each platform
3. Adds relevant hashtags and mentions
4. Schedules posts at optimal times

## Automated Scheduling

The scheduling system:
1. Analyzes historical engagement data
2. Determines optimal posting times for each platform
3. Maintains a consistent posting schedule
4. Automatically adjusts for time zones
5. Handles post failures and retries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

EZPost implements several security measures:
- End-to-end encryption for sensitive data
- Secure Clerk.com Authentication
- Regular security audits and updates
- Compliance with data protection regulations

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@ezpost.net or join our Discord community.

## Roadmap

- [ ] Advanced analytics dashboard
- [ ] AI-powered image generation
- [ ] Custom scheduling rules
- [ ] Team collaboration features
- [ ] API access for enterprise customers

## Contact

Website: [https://ezpost.net](https://ezpost.net)
GitHub: [https://github.com/GageGotya/EZPost](https://github.com/GageGotya/EZPost) 