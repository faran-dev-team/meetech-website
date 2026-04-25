# Vercel Deployment Guide — Meetech Development

## Quick checklist — do these before every production deploy

### 1. Environment Variables (Vercel Dashboard → Settings → Environment Variables)

Add **every** variable from `.env.example`. Critical ones that will break the build or runtime if missing:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | MongoDB Atlas → Connect → Drivers. **Append `&maxPoolSize=1`** for serverless |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your Vercel production URL, e.g. `https://meetech.dev` |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → your endpoint secret |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | Must be a verified sender in Resend |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | manage.sanity.io |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_TOKEN` | manage.sanity.io → API → Tokens |
| `SANITY_WEBHOOK_SECRET` | Any random string |
| `BLOB_READ_WRITE_TOKEN` | Auto-provided when Vercel Blob is enabled |

### 2. MongoDB Atlas — Vercel Serverless settings

1. Go to Atlas → Network Access → Add `0.0.0.0/0` (allow all IPs — required for Vercel)
2. Make sure `DATABASE_URL` ends with `&maxPoolSize=1&appName=MEETECH`

### 3. Stripe Webhook

Register your Vercel URL in Stripe:
- Endpoint: `https://YOUR_DOMAIN/api/stripe/webhook`
- Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
- Copy the signing secret into `STRIPE_WEBHOOK_SECRET`

### 4. Sanity CORS

Add your Vercel domain in manage.sanity.io → API → CORS Origins:
- `https://YOUR_DOMAIN`
- `https://YOUR_PROJECT.vercel.app`

### 5. Vercel Blob Storage

Enable it in Vercel Dashboard → Storage → Blob. The `BLOB_READ_WRITE_TOKEN` is then auto-injected.

---

## Build & Deploy

```bash
# Local production build test (run before pushing)
npm ci
npx prisma generate
npm run build
npm start
```

```bash
# Deploy via Vercel CLI
npx vercel --prod
```

---

## Performance — what's already optimised

| Optimisation | Status |
|---|---|
| AVIF/WebP image formats | ✅ |
| 30-day image CDN cache | ✅ |
| Immutable static asset cache (`/_next/static`) | ✅ |
| `optimizePackageImports` (framer-motion, lucide-react, react-icons) | ✅ |
| `optimizeCss` — inline critical CSS | ✅ |
| Work Sans loaded with `display: swap` + fallback metric adjustment | ✅ |
| Below-fold sections code-split with `next/dynamic` | ✅ |
| NeuralBackground deferred with `requestIdleCallback` | ✅ |
| Security headers (HSTS, CSP, X-Frame-Options…) | ✅ |
| `maxPoolSize=1` on DATABASE_URL for serverless | ✅ |
| OG image (`/og-image.png`) | ✅ |
| Favicon (`/iconlight.png`) | ✅ |
| Web App Manifest (`/manifest.json`) | ✅ |

---

## Admin first run

After the first deploy, seed the admin user:

```bash
# Locally, with your production DATABASE_URL exported:
DATABASE_URL="mongodb+srv://..." npx tsx prisma/seed.ts
```

Then change the default password immediately at `/admin`.
