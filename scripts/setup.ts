import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    console.log(`
To set up your Supabase database:

1. Create a new project at https://app.supabase.com
2. Get your project URL and anon key from Project Settings > API
3. Add the following environment variables to your .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

4. Run the SQL migrations in your Supabase dashboard:
   - Navigate to the SQL editor
   - Copy and paste the contents of sql/migrations/*.sql
   - Execute the migrations in order

For more information, check the README.md file.
`);
    console.log('✅ Database setup instructions provided');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

async function setupCronJob() {
  try {
    console.log('Setting up cron job...');
    console.log(`
To set up the cron job in Vercel:

1. Add the following to your vercel.json file:
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "0 0 * * *"
  }]
}

2. Make sure to set the CRON_SECRET environment variable in your Vercel project settings.
`);
    console.log('✅ Cron job setup instructions provided');
  } catch (error) {
    console.error('Error setting up cron job:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await setupDatabase();
    await setupCronJob();
    
    console.log(`
Setup complete! 🎉

Next steps:
1. Set up your environment variables in .env.local:
   - Supabase configuration
   - Clerk authentication keys
   - OpenAI API key
   - Buffer access token
   - Stripe configuration
2. Deploy your project to Vercel
3. Configure social media API credentials
4. Set up the cron job in Vercel as described above

For more information, check the README.md file.
`);
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

main(); 