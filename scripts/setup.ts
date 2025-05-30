import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Run database migrations
    await execAsync('npx prisma migrate deploy');
    console.log('✅ Database migrations applied');

    // Generate Prisma client
    await execAsync('npx prisma generate');
    console.log('✅ Prisma client generated');

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

async function setupCronJob() {
  try {
    console.log('Setting up cron job...');

    // For Vercel, we'll use their Cron Jobs feature
    console.log(`
To set up the cron job in Vercel:

1. Add the following to your vercel.json file:
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "*/5 * * * *"
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
1. Set up your environment variables in .env.local
2. Deploy your project to Vercel
3. Configure social media API credentials
4. Set up the cron job in Vercel as described above

For more information, check the README.md file.
`);
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 