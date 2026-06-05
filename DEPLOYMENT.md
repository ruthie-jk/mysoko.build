# MySoko Deployment Guide

This guide covers deploying MySoko to Vercel and other hosting platforms.

## Vercel Deployment (Recommended)

Vercel is the optimal hosting platform for Next.js applications and is fully tested with MySoko.

### Prerequisites
- Vercel account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)
- v0 project code

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial MySoko commit"

# Add remote and push
git remote add origin https://github.com/yourusername/mysoko.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Select project settings when prompted
# Choose "Next.js" as framework
# Verify build settings are correct
```

**Option B: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your account
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Select the MySoko repo
6. Click "Import"
7. Vercel will auto-detect Next.js configuration
8. Click "Deploy"

### Step 3: Configure Environment Variables

If you have a custom backend, add environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add any required API endpoints:
   - `NEXT_PUBLIC_API_URL` (if using external API)

### Step 4: Access Your Deployed App

After deployment completes:
- Your app is live at `https://yourproject.vercel.app`
- All deployment previews and auto-deployments are enabled
- Changes pushed to `main` branch auto-deploy

## Production Build Verification

Before deploying, verify the production build works locally:

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Open http://localhost:3000
```

## Post-Deployment Testing

After deploying to Vercel:

- [ ] Login page loads and renders correctly
- [ ] Demo credentials work (test@example.com / password123)
- [ ] Dashboard shows user data and balance
- [ ] Loan browsing displays all loan types
- [ ] Loan modal opens and closes smoothly
- [ ] Wishlist functionality works
- [ ] Profile page updates user info
- [ ] Mobile layout is responsive
- [ ] Images and icons load properly
- [ ] Service worker registers (check DevTools)

## Performance Optimization

Vercel automatically optimizes your deployment:

### Built-in Features
- **Edge Caching**: Static assets cached globally
- **Image Optimization**: Automatic image resizing
- **Code Splitting**: Route-based code splitting
- **Compression**: Automatic gzip/brotli compression
- **CDN**: Global content delivery network

### Vercel-Specific Settings

In `vercel.json` (create if needed):

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "nodeVersion": "20.x"
}
```

## Environment-Specific Configuration

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

## Custom Domain Setup

To use your own domain:

1. Go to Vercel project settings
2. Go to "Domains"
3. Click "Add Domain"
4. Enter your domain
5. Follow DNS configuration instructions
6. Vercel provides automatic SSL certificates

## Monitoring & Analytics

Vercel provides built-in monitoring:

- **Real-time logs**: View deployment logs
- **Analytics**: Core Web Vitals and performance metrics
- **Error tracking**: Failed requests and errors
- **Deployment history**: Rollback to previous versions

## Troubleshooting Deployment

### Build Fails
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors (use `pnpm build` locally to test)
# - Image import issues
```

### Performance Issues
- Check Vercel Analytics dashboard
- Verify images are optimized
- Check for large bundle sizes
- Review Core Web Vitals metrics

### Service Worker Not Registering
- Check browser console for errors
- Verify `/public/sw.js` exists
- Check HTTPS is enabled (required for SW)

## Database Integration

When connecting to a backend:

### Add API Base URL
In `lib/mock-api.ts`, replace mock fetch calls:

```javascript
// Before (mock)
const response = await fetch('/api/loans')

// After (real API)
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loans`)
```

### Set Environment Variable
1. In Vercel project settings
2. Add `NEXT_PUBLIC_API_URL` with your backend URL
3. Redeploy

## Rollback & Version Management

To rollback to a previous deployment:

1. Go to Vercel project dashboard
2. Go to "Deployments"
3. Find the previous deployment
4. Click "..."
5. Click "Promote to Production"

## CI/CD Pipeline

Vercel automatically handles:
- **Builds**: Automatic on every push
- **Tests**: Run pre-deployment checks
- **Preview Deployments**: For every branch/PR
- **Production Deployments**: Only on main branch

## Scaling Considerations

Vercel automatically scales for you:
- **Auto-scaling**: Functions scale based on demand
- **Serverless Functions**: No server management needed
- **Global CDN**: Content served from nearest edge location

For high-traffic scenarios:
- Consider upgrading Vercel plan
- Implement caching headers
- Optimize database queries
- Use Vercel's Analytics to identify bottlenecks

## Security Best Practices

- Never commit sensitive keys to Git
- Use Vercel environment variables for secrets
- Enable "Protected Branch" deployments
- Review deployment logs regularly
- Implement rate limiting in API
- Keep dependencies updated

## Backup & Data Protection

- Enable Vercel's automatic backups
- Maintain Git history
- Document database backup procedures
- Test disaster recovery plan

## Monitoring Uptime

Vercel provides:
- **99.9% SLA** for business plans
- Status page at [status.vercel.com](https://status.vercel.com)
- Real-time alerts for outages

For additional monitoring:
- Integrate with Sentry for error tracking
- Use UptimeRobot for external monitoring
- Set up email alerts for failures

## Cost Management

Vercel pricing:
- **Hobby**: Free tier (good for getting started)
- **Pro**: $20/month (recommended for production)
- **Enterprise**: Custom pricing

Cost optimization:
- Monitor serverless function execution time
- Review bandwidth usage
- Use image optimization effectively
- Clean up old deployments

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community Forums](https://github.com/vercel/vercel/discussions)
- Vercel Support (available for Pro/Enterprise plans)

## Next Steps

After successful deployment:

1. Set up custom domain (if needed)
2. Configure analytics monitoring
3. Set up error tracking with Sentry
4. Implement backend API integration
5. Set up monitoring and alerts
6. Plan feature rollout strategy
7. Document deployment procedures

---

**Your MySoko app is now live and ready for users!**
