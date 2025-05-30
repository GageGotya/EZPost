# EZPost - AI-Powered Social Media Management

EZPost is a comprehensive social media management platform that leverages artificial intelligence to help small and medium-sized businesses automate and optimize their social media presence across multiple platforms.

## Features

- **AI-Powered Content Creation**: Automatically generate engaging, platform-optimized content for TikTok, LinkedIn, Instagram, Twitter, and Facebook
- **Smart Analytics**: Track performance metrics and get AI-driven insights to improve your social media strategy
- **Automated Scheduling**: Intelligent posting schedule that maximizes engagement
- **Multi-Platform Support**: Manage all your social media accounts from a single dashboard
- **Secure Authentication**: Enterprise-grade security for social media account access
- **Custom Branding**: Maintain consistent brand voice and style across all platforms

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI/ML**: OpenAI GPT-4
- **Authentication**: NextAuth.js
- **Hosting**: Vercel
- **Analytics**: Recharts
- **Styling**: Tailwind CSS, clsx, tailwind-merge

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- PostgreSQL database
- Social media platform developer accounts
- OpenAI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ezpost"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Social Media API Keys
# Twitter
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# LinkedIn
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# Instagram/Facebook
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# TikTok
TIKTOK_CLIENT_KEY="your-tiktok-client-key"
TIKTOK_CLIENT_SECRET="your-tiktok-client-secret"

# Cron Job
CRON_SECRET="your-cron-secret"
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

3. Set up the database:
   ```bash
   npx prisma migrate deploy
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

1. Create a new project on Vercel:
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. Set up environment variables in Vercel:
   - Go to your project settings
   - Add all environment variables from `.env.local`
   - Ensure `NEXTAUTH_URL` is set to your production domain

3. Configure social media API credentials:
   - Create developer accounts on each platform
   - Set up OAuth applications
   - Add credentials to environment variables

4. Set up the cron job:
   - The `vercel.json` file already includes the cron job configuration
   - Vercel will automatically run the cron job every 5 minutes

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
│   │   ├── ai/         # AI-related functions
│   │   ├── posting/    # Posting automation
│   │   └── scheduling/ # Scheduling logic
│   └── types/         # TypeScript type definitions
├── prisma/            # Database schema and migrations
├── scripts/          # Setup and utility scripts
├── public/           # Static assets
└── tests/           # Test files (coming soon)
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
- Secure OAuth2 authentication for social media platforms
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