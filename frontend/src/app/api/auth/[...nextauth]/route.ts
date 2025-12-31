import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import type { NextRequest } from 'next/server';

const handler = NextAuth(authOptions);

export async function GET(
  req: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  return handler(req as any);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  return handler(req as any);
}

