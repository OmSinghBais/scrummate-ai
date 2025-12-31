import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import type { NextRequest } from 'next/server';

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return handler(req, context);
}

