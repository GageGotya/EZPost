import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../[...nextauth]/route';

export async function GET(
  req: Request,
  { params }: { params: { platform: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { platform } = params;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/${platform}/callback`;

    let authUrl: string;
    switch (platform) {
      case 'twitter':
        authUrl = `https://twitter.com/i/oauth2/authorize?client_id=${
          process.env.TWITTER_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=tweet.read+tweet.write+users.read&response_type=code&state=${session.user.id}`;
        break;

      case 'facebook':
        authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${
          process.env.FACEBOOK_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=pages_show_list,pages_read_engagement,pages_manage_posts&state=${
          session.user.id
        }`;
        break;

      case 'instagram':
        authUrl = `https://api.instagram.com/oauth/authorize?client_id=${
          process.env.INSTAGRAM_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=basic&response_type=code&state=${session.user.id}`;
        break;

      case 'linkedin':
        authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${
          process.env.LINKEDIN_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=r_liteprofile%20w_member_social&response_type=code&state=${
          session.user.id
        }`;
        break;

      case 'tiktok':
        authUrl = `https://www.tiktok.com/auth/authorize?client_key=${
          process.env.TIKTOK_CLIENT_KEY
        }&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=user.info.basic,video.list,video.upload&response_type=code&state=${
          session.user.id
        }`;
        break;

      default:
        return NextResponse.json(
          { message: 'Invalid platform' },
          { status: 400 }
        );
    }

    return NextResponse.json({ authUrl }, { status: 200 });
  } catch (error) {
    console.error('Platform connection error:', error);
    return NextResponse.json(
      { message: 'Failed to initiate connection' },
      { status: 500 }
    );
  }
} 