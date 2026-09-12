# LearnX AI - Personalized Adaptive Learning Platform

Adaptive EdTech platform that pinpoints knowledge gaps with diagnostic audits, constructs customized roadmaps, adapts with an intelligent Socratic AI tutor, and persists progress to Supabase.

---

## 🚀 Deploying on Netlify

This project is pre-configured for **1-click Netlify deployment** with SPA routing rewrites and serverless API functions.

### Quick Settings in Netlify UI:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### Environment Variables (Site configuration -> Environment variables):
| Variable | Value | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://nvmrymkwrgzacqngoxfs.supabase.co` | Supabase project endpoint |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_m6FosiMmNPP_e1bcal8hsA_XkDpJWQX` | Supabase publishable key |
| `GEMINI_API_KEY` | *(Optional)* | For live Gemini AI Tutor responses |

*(Note: The app also has built-in defaults for your Supabase project, so it connects automatically even before environment variables are set!)*

---

## 🛠 Features Configured for Netlify
1. **SPA Catch-All Routing**: Includes `/public/_redirects` (`/* /index.html 200`) and `netlify.toml` redirects to prevent 404 errors on page reload.
2. **Serverless Functions**: `/netlify/functions/tutor-chat.ts` and `/netlify/functions/health.ts` for AI tutor communication.
3. **Database Integration**: Direct real-time sync with Supabase PostgreSQL for profiles, diagnostics, quiz records, topic masteries, and roadmaps.
