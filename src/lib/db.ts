import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export { prisma }; 