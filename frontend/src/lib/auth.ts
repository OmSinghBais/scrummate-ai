import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Get API URL - prioritize environment variable
// Note: NextAuth runs server-side, so we can only use environment variables
function getApiUrl(): string {
  // Always check environment variable first
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (apiUrl) {
    // Ensure it's a full URL
    if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
      return apiUrl;
    }
    // If it doesn't start with http, add https
    return `https://${apiUrl}`;
  }
  
  // Fallback: Try to detect production from NODE_ENV or VERCEL_URL
  if (process.env.VERCEL_URL) {
    // We're on Vercel, use Render backend
    return 'https://scrummate-ai-21yl.onrender.com';
  }
  
  // Default to localhost for local development
  return 'http://localhost:3001';
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Login: Missing credentials');
          return null;
        }

        try {
          const apiUrl = getApiUrl();
          const loginUrl = `${apiUrl}/auth/login`;
          
          console.log('Login attempt:', {
            apiUrl,
            loginUrl,
            email: credentials.email,
            hasEnvVar: !!process.env.NEXT_PUBLIC_API_URL,
            envVarValue: process.env.NEXT_PUBLIC_API_URL,
            vercelUrl: process.env.VERCEL_URL,
            nodeEnv: process.env.NODE_ENV,
          });

          const response = await axios.post(loginUrl, {
            email: credentials.email,
            password: credentials.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          });

          console.log('Login response:', {
            hasToken: !!response.data.access_token,
            hasUser: !!response.data.user,
          });

          if (response.data.access_token) {
            return {
              id: response.data.user.id.toString(),
              email: response.data.user.email,
              name: response.data.user.name,
              accessToken: response.data.access_token,
              teams: response.data.user.teams || [],
            };
          }
          
          console.error('Login: No access token in response');
          return null;
        } catch (error: any) {
          const errorDetails = {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            code: error.code,
          };
          
          console.error('Login error:', errorDetails);
          
          // Provide more specific error information
          if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            console.error('Cannot connect to backend server. Check NEXT_PUBLIC_API_URL:', apiUrl);
            throw new Error('Cannot connect to backend server. Please check server configuration.');
          }
          
          if (error.response?.status === 404) {
            console.error('Backend endpoint not found. Check if backend is deployed correctly.');
            throw new Error('Backend endpoint not found. Please check server configuration.');
          }
          
          if (error.response?.status === 401) {
            // Invalid credentials - return null to show generic error
            return null;
          }
          
          if (error.response?.status === 500) {
            console.error('Backend server error. Check backend logs.');
            throw new Error('Backend server error. Please try again later.');
          }
          
          // For other errors, return null to show generic error
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.teams = (user as any).teams || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).accessToken = token.accessToken;
        (session as any).user.id = token.sub;
        (session as any).teams = token.teams || [];
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-nextauth-secret-key-change-in-production',
};

