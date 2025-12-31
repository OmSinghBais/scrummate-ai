import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/sprints/:path*', '/teams/:path*', '/planning/:path*', '/performance/:path*', '/settings/:path*'],
};

