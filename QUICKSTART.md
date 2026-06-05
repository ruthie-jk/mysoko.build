# MySoko Quick Start Guide

## 30-Second Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:3000
```

## Demo Login

**Email**: `test@example.com`  
**Password**: `password123`

## Key Routes

| Route | Purpose |
|-------|---------|
| `/login` | Sign in page |
| `/register` | Create new account |
| `/reset-password` | Recover password |
| `/onboarding` | Business preferences |
| `/home` | Dashboard with balance |
| `/loans` | Browse loans with filters |
| `/profile` | User profile & settings |

## What to Explore

### 1. Dashboard (`/home`)
- View available balance
- See active loans
- Browse loan carousel
- View financial charts

### 2. Loans (`/loans`)
- Filter by loan type (Growth, Equipment, etc.)
- View loan details in modal
- Add/remove from wishlist
- See loan requirements

### 3. Profile (`/profile`)
- View personal information
- Change password
- Update settings

## Features Showcase

✅ Mobile-first responsive design  
✅ Dark/light mode support  
✅ Smooth animations  
✅ Offline support  
✅ PWA installation  
✅ Real-time form validation  
✅ Intuitive navigation  

## Build for Production

```bash
# Create optimized build
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel (one command)
vercel
```

## Project Structure

```
MySoko/
├── app/
│   ├── (auth)/      → Login, Register, Reset, Onboarding
│   ├── (app)/       → Home, Loans, Profile
│   └── api/         → Backend endpoints
├── components/      → Reusable UI components
├── lib/            → Utilities & state management
└── public/         → Static assets & PWA files
```

## Tech Stack at a Glance

- **Framework**: Next.js 16 (React)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State**: React Context
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Type**: TypeScript

## Configuration

### Environment Variables
Create `.env.local` for custom settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Customization

**Colors**: Edit `app/globals.css` @theme section
**Font**: Fredoka (from Google Fonts)
**Logo**: Update files in `public/`
**Content**: Mock data in `lib/mock-api.ts`

## Common Tasks

### Add a New Page
```bash
# Create app page
mkdir -p app/(app)/newpage
echo "'use client'\n\nexport default function NewPage() {\n  return <div>New Page</div>\n}" > app/(app)/newpage/page.tsx
```

### Change Colors
Edit `app/globals.css` and update the @theme block:
```css
--color-primary: hsl(YOUR_HUE YOUR_SAT YOUR_LIGHT%);
```

### Add a Component
```bash
# Create component file
echo "export function MyComponent() {\n  return <div>Component</div>\n}" > components/my-component.tsx
```

### Connect Real API
Replace mock calls in `lib/mock-api.ts`:
```javascript
// Before
const data = MOCK_LOANS;

// After
const response = await fetch('/api/loans');
const data = await response.json();
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Dev Server Issues
```bash
# Kill process and restart
pkill -f "next dev"
pnpm dev
```

### Styling Problems
```bash
# Rebuild Tailwind
pnpm build
pnpm dev
```

## Performance Tips

- Images auto-optimize via Next.js
- Code splits by route automatically
- Service Worker caches static assets
- Database queries get paginated
- Use next/image for images

## Security Reminders

- Never commit `.env.local` to Git
- Keep dependencies updated: `pnpm update`
- Validate all user inputs
- Use environment variables for secrets
- Check console for security warnings

## Testing

### Manual Testing Checklist
- [ ] Login with demo account
- [ ] View dashboard
- [ ] Browse loans
- [ ] Open loan details
- [ ] Add to wishlist
- [ ] Visit profile
- [ ] Toggle theme (once enabled)
- [ ] Test on mobile

### Browser DevTools
- Check Console for errors
- Use Network tab to inspect API calls
- Use Lighthouse for performance audit
- Check Application tab for Service Worker

## Deployment Checklist

Before deploying to production:

- [ ] Update `meta` tags in `app/layout.tsx`
- [ ] Set up environment variables in Vercel
- [ ] Test production build locally
- [ ] Verify Service Worker registers
- [ ] Test PWA installation
- [ ] Check mobile responsiveness
- [ ] Review security settings
- [ ] Set up analytics (optional)

## Next Steps

1. **Explore**: Navigate through all pages
2. **Customize**: Update colors, fonts, and branding
3. **Integrate**: Connect to your backend API
4. **Deploy**: Push to Vercel with `vercel` command
5. **Monitor**: Track performance in Vercel dashboard
6. **Scale**: Add features and handle more users

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Vercel Docs](https://vercel.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

## Support

- Check `README.md` for detailed documentation
- See `DEPLOYMENT.md` for deployment guide
- Review `PROJECT_SUMMARY.md` for architecture overview
- Check inline code comments for implementation details

---

**That's it! You're ready to explore and build with MySoko.**

Happy coding! 🚀
