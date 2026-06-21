# DEPLOYMENT GUIDE

## Overview

ProjectHub is designed to be deployed with:
- **Frontend**: Vercel (free tier available)
- **Backend**: Render (free tier available)
- **Database**: PostgreSQL on Render

## Backend Deployment (Render)

### Step 1: Prepare Backend

1. Update `backend/requirements.txt` if needed
2. Ensure `backend/.env.example` is up to date
3. Update CORS origins in `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.vercel.app", "http://localhost:5173"],
    ...
)
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Deploy to Render

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in details:
   - **Name**: projecthub-api
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0`
6. Click "Advanced" and add environment variables:

```
DATABASE_URL=postgresql://user:password@localhost/projecthub
SECRET_KEY=<generate-a-secure-random-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=production
DEBUG=false
```

7. Create a PostgreSQL database on Render:
   - Click "New +" → "PostgreSQL"
   - Fill in name and region
   - Copy the database URL to `DATABASE_URL` above

8. Deploy

### Step 4: Verify Backend

```bash
curl https://projecthub-api.onrender.com/health
# Should return: {"status": "healthy"}
```

API documentation: `https://projecthub-api.onrender.com/docs`

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `frontend/.env.example`:

```
VITE_API_URL=https://projecthub-api.onrender.com
```

2. Build locally to test:

```bash
cd frontend
npm run build
npm run preview
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `frontend`
6. Add environment variable:
   - **VITE_API_URL**: `https://projecthub-api.onrender.com`
7. Deploy

### Step 3: Update CORS

Update `backend/app/main.py` with your Vercel domain:

```python
allow_origins=[
    "https://your-project-name.vercel.app",
    "http://localhost:5173"
]
```

Commit and redeploy backend.

## Production Checklist

### Backend
- ✅ `DEBUG=false` in environment
- ✅ `SECRET_KEY` is strong and random
- ✅ `ENVIRONMENT=production`
- ✅ PostgreSQL database configured
- ✅ CORS origins updated
- ✅ Environment variables set on Render
- ✅ SSL/HTTPS enabled (automatic on Render)

### Frontend
- ✅ `VITE_API_URL` points to production backend
- ✅ `npm run build` completes without errors
- ✅ Environment variables set on Vercel
- ✅ SSL/HTTPS enabled (automatic on Vercel)

### Database
- ✅ Regular backups enabled on Render
- ✅ Database password is strong
- ✅ Not publicly accessible

### Security
- ✅ All secrets are in environment variables
- ✅ No credentials in code
- ✅ HTTPS enforced everywhere
- ✅ CORS properly configured

## Monitoring

### Backend (Render)
- Check logs: Dashboard → Logs
- Monitor metrics: Dashboard → Metrics
- Set up alerts for errors

### Frontend (Vercel)
- Check deployment logs: Project → Deployments
- Monitor analytics: Dashboard → Analytics
- Check real-time errors

## Database Backups

On Render PostgreSQL:
1. Go to your database dashboard
2. Enable automatic backups (recommended)
3. View backups in backup settings

## Troubleshooting

### Backend won't start

1. Check environment variables are set
2. Review build logs on Render
3. Verify PostgreSQL connection string

```bash
# Test locally with production URL
psql <DATABASE_URL>
```

### Frontend shows blank page

1. Check browser console for errors
2. Verify `VITE_API_URL` is correct
3. Ensure backend API is accessible
4. Check network requests in browser DevTools

### API calls failing

1. Check CORS settings in backend
2. Verify API URL in frontend `.env`
3. Check backend logs on Render

## Scaling

As user base grows:

1. **Database**: Upgrade PostgreSQL plan on Render
2. **Backend**: Upgrade Web Service plan on Render
3. **Frontend**: Automatic through Vercel CDN
4. **Caching**: Implement Redis on Render
5. **Search**: Add Elasticsearch for better search

## Cost Estimation

### Free Tier
- Render Web Service (free): $0
- Render PostgreSQL (free): $0
- Vercel (free): $0
- **Total**: $0/month

### Paid Tier (for production)
- Render Web Service: ~$7/month
- Render PostgreSQL: ~$15/month
- Vercel Pro: $20/month
- **Total**: ~$42/month

## Rollback

If deployment fails:

**Backend (Render)**:
1. Dashboard → Deployments
2. Select previous successful deployment
3. Click "Redeploy"

**Frontend (Vercel)**:
1. Project → Deployments
2. Click "..." on previous deployment
3. Select "Redeploy"

## Advanced: GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy ProjectHub

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and deploy backend
        # Add build steps
      - name: Build and deploy frontend
        # Add build steps
```

## Monitoring & Analytics

### Backend
- Monitor API response times
- Track error rates
- Monitor database queries
- Set up alerts for high error rates

### Frontend
- Monitor page load time
- Track user interactions
- Monitor error tracking (Sentry)
- Analyze user behavior

---

For detailed Render documentation: https://render.com/docs
For detailed Vercel documentation: https://vercel.com/docs
