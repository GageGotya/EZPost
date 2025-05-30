import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_PRISMA_URL!);

export async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export { sql }; 