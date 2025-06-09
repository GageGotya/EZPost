import { auth } from '@clerk/nextjs/server';

export interface UserJwtPayload {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
  auth: {
    userId: string;
  };
}

export interface BackendJwtPayload {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
  permissions: string[];
}

export async function getToken() {
  const { getToken } = auth();
  try {
    const token = await getToken({
      template: 'backend'
    });
    return token;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
}

export async function getUserToken() {
  const { getToken } = auth();
  try {
    const token = await getToken({
      template: 'client'
    });
    return token;
  } catch (error) {
    console.error('Error getting user JWT token:', error);
    return null;
  }
} 