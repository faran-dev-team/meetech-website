import type { NextAuthConfig } from 'next-auth'

/**
 * Auth configuration that is safe to import in Edge Runtime (middleware).
 * Must NOT import Prisma, bcryptjs, or any Node.js-only module.
 * Providers are omitted here — they live in auth.ts (Node.js only).
 */
export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    // Guard protected routes at the JWT verification layer (no DB hit needed)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!isLoggedIn) return false
        const role = (auth?.user as any)?.role ?? ''
        return ['ADMIN', 'EDITOR', 'VIEWER'].includes(role)
      }

      if (pathname.startsWith('/client') && pathname !== '/client/login') {
        if (!isLoggedIn) return false
        return (auth?.user as any)?.role === 'CLIENT'
      }

      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  basePath: '/api/auth',
  trustHost: true,
}
