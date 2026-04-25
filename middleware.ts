import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth/auth.config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Create a lightweight NextAuth instance that only uses the edge-compatible
 * config (JWT decode only — no Prisma, no bcryptjs, safe for Edge Runtime).
 */
const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Admin routes — require ADMIN, EDITOR, or VIEWER role
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()

    if (!session?.user) {
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    const role = (session.user as any).role ?? ''
    if (!['ADMIN', 'EDITOR', 'VIEWER'].includes(role)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Client portal — require CLIENT role
  if (pathname.startsWith('/client')) {
    if (pathname === '/client/login') return NextResponse.next()

    if (!session?.user) {
      const url = new URL('/client/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    if ((session.user as any).role !== 'CLIENT') {
      return NextResponse.redirect(new URL('/client/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
}
