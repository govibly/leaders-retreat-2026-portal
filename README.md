## Church Audio Portal

This project is a Next.js media portal for Leader's Retreat 2026. It uses:

- Supabase Auth for registration and sign-in
- Cloudflare R2 for MP3 and PDF delivery
- Local typed metadata for the session library

## Local Development

Create a `.env.local` file from `.env.example`, then run:

```bash
npm run dev
```

Open http://localhost:3000/login.

## Signup Data

Right now, signup data goes into Supabase Auth:

- Email and password go into `auth.users`
- `full_name` and `church_branch` go into `auth.users.raw_user_meta_data`

If you want a cleaner audit and outreach workflow, run the SQL in `supabase/profiles.sql` inside the Supabase SQL Editor. That creates a `public.profiles` table and mirrors auth data into it automatically.

Example audit query after running that SQL:

```sql
select email, full_name, church_branch, created_at
from public.profiles
order by created_at desc;
```

## Vercel Deployment

Add these environment variables in Vercel:

- `NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app`
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
- `NEXT_PUBLIC_STORAGE_PROVIDER=cloudflare-r2`
- `NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BASE_URL=https://pub-d44ff5448e9e41dfb68e298ae2b174dc.r2.dev`

Before deploying, make sure Supabase Auth has:

- Email/password enabled
- The Vercel domain added to allowed redirect URLs
- The callback URL `/auth/callback` allowed

If you are using Cloudflare R2 for media delivery, also upload the four bonus PDF guides into the same public booklet path used by the session PDFs:

- `leaders/booklet/Bonus - The Abiding Presence - A Beginner’s Guide to Walking with the Holy Spirit.pdf`
- `leaders/booklet/Bonus - Holistic Restoration Protocol.pdf`
- `leaders/booklet/Bonus - The Resident, Not the Visitor - 5 Surprising Shifts for Living in Continuous Spiritual Presence.pdf`
- `leaders/booklet/Bonus - Full 2026 Leaders Retreat Teaching Learning Framework.pdf`

The app already has local fallback copies in `public/media/booklets/`, but production should mirror them into Cloudflare R2 so all media follows the same hosting strategy.

Then deploy with:

```bash
npm run lint
npm run build
```

## Auth Notes

The current auth flow protects the homepage and session pages server-side by checking the current Supabase user on each request.

"Tighten auth flow" means moving from basic page-level checks to a stricter production setup such as:

- central route protection with middleware
- explicit public vs private route handling
- a dedicated `profiles` table for reporting and outreach
- better auth error messages and session expiry handling

The current flow is good enough to deploy, but these are the next hardening steps after launch.
