import { NextResponse } from 'next/server';
import axios from 'axios';

// Test endpoint to verify API configuration
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const vercelUrl = process.env.VERCEL_URL;
  const nodeEnv = process.env.NODE_ENV;

  // Try to ping the backend
  let backendStatus = 'unknown';
  let backendError = null;

  try {
    // Try to reach the backend (even if it's just a 404, it means server is up)
    await axios.get(`${apiUrl}/auth/me`, {
      timeout: 5000,
      validateStatus: () => true, // Don't throw on any status
    });
    backendStatus = 'reachable';
  } catch (error: any) {
    backendStatus = 'unreachable';
    backendError = error.message;
  }

  return NextResponse.json({
    config: {
      apiUrl,
      hasEnvVar: !!process.env.NEXT_PUBLIC_API_URL,
      envVarValue: process.env.NEXT_PUBLIC_API_URL,
      vercelUrl,
      nodeEnv,
    },
    backend: {
      status: backendStatus,
      error: backendError,
      testUrl: `${apiUrl}/auth/me`,
    },
    recommendation: !process.env.NEXT_PUBLIC_API_URL
      ? 'Set NEXT_PUBLIC_API_URL in Vercel environment variables'
      : 'Configuration looks good',
  });
}

