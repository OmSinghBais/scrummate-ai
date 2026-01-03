import { NextResponse } from 'next/server';
import axios from 'axios';

// Get API URL
function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (apiUrl) {
    if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
      return apiUrl;
    }
    return `https://${apiUrl}`;
  }
  
  if (process.env.VERCEL_URL) {
    return 'https://scrummate-ai-21yl.onrender.com';
  }
  
  return 'http://localhost:3001';
}

export async function GET() {
  const apiUrl = getApiUrl();
  
  try {
    // Test backend health
    const healthResponse = await axios.get(`${apiUrl}/`, {
      timeout: 5000,
      validateStatus: () => true, // Don't throw on any status
    });
    
    // Test login endpoint exists
    const loginResponse = await axios.post(
      `${apiUrl}/auth/login`,
      { email: 'test@test.com', password: 'test' },
      {
        timeout: 5000,
        validateStatus: () => true, // Don't throw on any status
      }
    );
    
    return NextResponse.json({
      success: true,
      apiUrl,
      backend: {
        reachable: healthResponse.status < 500,
        status: healthResponse.status,
        message: healthResponse.data?.message || healthResponse.statusText,
      },
      loginEndpoint: {
        exists: loginResponse.status !== 404,
        status: loginResponse.status,
        message: loginResponse.data?.message || loginResponse.statusText,
        // If 401, endpoint exists but credentials are wrong (expected)
        // If 404, endpoint doesn't exist (problem)
        // If 500, endpoint exists but server error (problem)
      },
      environment: {
        hasEnvVar: !!process.env.NEXT_PUBLIC_API_URL,
        envVarValue: process.env.NEXT_PUBLIC_API_URL,
        vercelUrl: process.env.VERCEL_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      apiUrl,
      error: {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      },
      environment: {
        hasEnvVar: !!process.env.NEXT_PUBLIC_API_URL,
        envVarValue: process.env.NEXT_PUBLIC_API_URL,
        vercelUrl: process.env.VERCEL_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    }, { status: 500 });
  }
}

