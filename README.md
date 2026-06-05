# MySoko - Democratizing Credit for MSMEs

A modern fintech platform designed to democratize access to credit for micro, small, and medium enterprises (MSMEs). MySoko provides fast, accessible credit solutions with an intuitive mobile-first interface and comprehensive loan management system.

## Features

### Core Features
- **User Authentication**: Secure login, registration, and password reset functionality
- **Onboarding Flow**: Business preference selection during first login
- **Dashboard**: Real-time balance overview, available funds, active loans, and quick actions
- **Loan Browsing**: Carousel-based loan discovery with multiple filter categories
- **Loan Details Modal**: Step-by-step loan application process with requirements display
- **Wishlist Management**: Save favorite loans for later consideration
- **Profile Management**: Update profile information, change password, and manage settings
- **Offline Support**: Full offline functionality for viewing saved loans and data
- **PWA Installation**: Install MySoko as an app on mobile and desktop devices

### Design Features
- **Mobile-First Design**: Fully responsive layout optimized for mobile devices
- **Dark Mode Support**: System-aware theme switching with persistent preferences
- **Modern UI**: Clean, intuitive interface with Fredoka font and custom purple/cyan color scheme
- **Smooth Animations**: Framer Motion-powered transitions and carousel effects
- **Loading States**: Skeleton loading components for better perceived performance
- **Custom Branding**: Curved bridge logo representing data connectivity and seamless connection

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Custom components with Lucide icons
- **State Management**: React Context API
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Offline**: Service Worker + IndexedDB
- **Font**: Fredoka (Google Fonts)

## Getting Started

### Installation via shadcn CLI (Recommended)

The easiest way to install and run MySoko is using the shadcn CLI:

```bash
npx shadcn-cli@latest init mysoko -d https://github.com/yourusername/mysoko
```

This will:
1. Create a new Next.js project with MySoko
2. Install all dependencies
3. Configure Tailwind CSS
4. Set up the project structure

### Manual Installation

If you prefer manual setup:

```bash
# Clone the repository
git clone https://github.com/yourusername/mysoko.git
cd mysoko

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

For testing the application, use these demo credentials:

- **Email**: `test@example.com`
- **Password**: `password123`

## Project Structure

```
mysoko/
├── app/
│   ├── (auth)/              # Authentication routes (no bottom nav)
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── onboarding/
│   ├── (app)/               # App routes (with navigation)
│   │   ├── home/
│   │   ├── loans/
│   │   └── profile/
│   ├── api/                 # API endpoints
│   │   ├── auth/
│   │   ├── user/
│   │   └── loans/
│   ├── layout.tsx           # Root layout with PWA config
│   ├── globals.css          # Global styles and design tokens
│   └── page.tsx             # Root redirect page
├── components/
│   ├── layout/              # Navigation and layout components
│   │   ├── top-nav.tsx
│   │   ├── bottom-nav.tsx
│   │   └── app-provider.tsx
│   ├── features/            # Feature components
│   │   ├── loan-carousel.tsx
│   │   ├── loan-modal.tsx
│   │   └── wishlist-offcanvas.tsx
│   └── ui/                  # UI components
│       └── skeleton.tsx
├── lib/
│   ├── auth-context.tsx     # Authentication state
│   ├── theme-context.tsx    # Theme management
│   ├── offline-context.tsx  # Offline state
│   ├── types.ts             # TypeScript types
│   └── mock-api.ts          # Mock data for development
├── public/
│   ├── sw.js                # Service worker
│   ├── manifest.json        # PWA manifest
│   ├── icon-192x192.png     # App icon
│   ├── icon-512x512.png     # Large app icon
│   └── favicon-custom.png   # Favicon
└── package.json
```

## Key Pages and Routes

### Authentication (No Navigation)
- `/` - Root redirect (redirects to /login if not authenticated)
- `/login` - Sign in page with demo credentials display
- `/register` - Account creation form
- `/reset-password` - Password recovery flow
- `/onboarding` - Business preference selection

### App (With Top & Bottom Navigation)
- `/home` - Dashboard with balance, actions, and loan carousel
- `/loans` - Loan browsing with filters, modal details, and wishlist
- `/profile` - User profile with tabs for profile, password, and settings

## API Integration Points

The application is ready for backend integration with the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/reset-password` - Password reset

### User Management
- `GET/PUT /api/user/profile` - Get/update user profile
- `POST /api/user/password` - Change password

### Loans
- `GET /api/loans` - Get available loans
- `POST /api/loans/apply` - Submit loan application
- `POST /api/loans/wishlist` - Manage wishlist

Currently, all endpoints return mock data. Replace the mock implementations with your actual backend API calls.

## Offline Functionality

MySoko includes comprehensive offline support:

1. **Service Worker**: Caches API responses and static assets
2. **IndexedDB Storage**: Persists loans and user preferences locally
3. **Offline Context**: Tracks connection status and syncs when online
4. **Offline UI**: Shows status indicator when offline

All loan data is cached, allowing users to browse even without internet connection.

## PWA Installation

### Web App
1. Open MySoko in a modern browser
2. Look for "Install" prompt or app menu option
3. Click "Install" to add to home screen

### Desktop
1. Open MySoko in Chrome/Edge
2. Click the install icon in address bar
3. Follow installation wizard

The app includes:
- Web app manifest with custom icons
- Service worker for offline support
- Splash screen on launch
- Full-screen mode support

## Customization

### Branding
- Colors: Modify design tokens in `app/globals.css`
- Font: Change in `app/layout.tsx` and `app/globals.css`
- Icons: Replace or customize using Lucide React icons
- Logo: Update favicon and icons in `public/`

### Loan Types
Update loan categories in `lib/types.ts` and `lib/mock-api.ts`

### Theme Colors
The app uses a purple primary (#6D28D9) and cyan secondary (#06B6D4) color scheme. Customize in `app/globals.css` under the `@theme` block.

## Building for Production

```bash
# Build the application
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start
```

## Deployment

### Vercel (Recommended)
MySoko is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Vercel will automatically:
1. Detect Next.js configuration
2. Build the application
3. Deploy with edge caching
4. Enable automatic SSL

Your app will be live at a public URL that anyone can access.

### Other Platforms
The application can be deployed to any platform that supports Node.js:
- Docker: Use the Docker-based deployment
- Traditional hosting: Build and upload the `.next/` directory
- Serverless: Deploy as serverless functions

## Testing Checklist

### Authentication
- [ ] Login with demo credentials succeeds
- [ ] Register form accepts new account data
- [ ] Reset password flow works
- [ ] Onboarding captures preferences
- [ ] Protected routes redirect to login

### Dashboard
- [ ] Home page loads with user data
- [ ] Balance cards display correctly
- [ ] Quick action buttons are functional
- [ ] Loan carousel animates smoothly
- [ ] Navigation updates on action

### Loans
- [ ] Loans page loads all loan types
- [ ] Filter buttons change displayed loans
- [ ] Loan modal opens and closes smoothly
- [ ] Modal steps progress correctly
- [ ] Wishlist button adds/removes loans

### Profile
- [ ] Profile tab shows user information
- [ ] Password change form validates
- [ ] Settings tab displays preferences
- [ ] Theme toggle works (once enabled)

### Offline
- [ ] Service worker registers successfully
- [ ] App works offline after caching
- [ ] Offline indicator shows when needed
- [ ] Data syncs when connection restored

### PWA
- [ ] App can be installed on home screen
- [ ] Splash screen appears on launch
- [ ] Full-screen mode works
- [ ] Custom icons display correctly

## Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Route-based code splitting
- **CSS-in-JS**: Tailwind CSS for minimal CSS bundle
- **Lazy Loading**: Components load on demand
- **Service Worker Caching**: Fast repeat visits
- **IndexedDB**: No repeated API calls for cached data

## Troubleshooting

### Service Worker Not Registering
- Clear browser cache
- Check browser console for errors
- Ensure HTTPS (or localhost)
- Try private/incognito mode

### Theme Not Persisting
- Check localStorage is enabled
- Clear browser cache
- Verify JavaScript is enabled

### Offline Features Not Working
- Check IndexedDB is supported
- Verify Service Worker registered
- Check Network tab in DevTools

## Future Enhancements

- SMS/Email notifications for loan status
- Video KYC verification
- Real-time loan tracking
- Analytics dashboard for MSME owners
- Multi-language support
- Advanced credit scoring
- Integration with banking partners
- API webhooks for loan updates

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@mysoko.app

## SEO & Accessibility

- **SEO**: Metadata optimized with proper title, description, and open graph tags
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Mobile Friendly**: Responsive design tested on all device sizes
- **Performance**: Optimized for Core Web Vitals (LCP, CLS, INP)

---

**MySoko** - Making credit accessible for every business, every time.
