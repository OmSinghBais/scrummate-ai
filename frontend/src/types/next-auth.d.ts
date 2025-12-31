import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
    };
    teams?: any[];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
    teams?: any[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    teams?: any[];
  }
}

