# Deploy Frontend to Vercel

## Step-by-Step Deployment Guide

### 1. Prepare Your Repository
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Frontend ready for deployment"
git push origin main
```

### 2. Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Connect your GitHub repository

### 3. Import Project
1. Click "New Project" → "Import Project"
2. Select your GitHub repository
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4. Environment Variables
Add these environment variables in Vercel dashboard:

```
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_APP_NAME=YaariZone Video Chat
VITE_APP_VERSION=1.0.0
VITE_TURN_SERVER_URL=turn:your-turn-server.com:3478  # Optional
VITE_TURN_USERNAME=your-turn-username  # Optional
VITE_TURN_PASSWORD=your-turn-password  # Optional
```

### 5. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at: `https://yaari-zone.vercel.app`

### 6. Update Backend CORS
Update your backend's environment variables to allow the new frontend URL:

```
FRONTEND_URL=https://yaari-zone.vercel.app
```

## Custom Domain (Optional)

### Add Custom Domain
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Troubleshooting

### Common Issues:
- **Build Failures**: Check that all dependencies are in package.json
- **Environment Variables**: Make sure VITE_ prefix is used for client-side vars
- **CORS Issues**: Update backend FRONTEND_URL after deployment

### Performance Optimization:
- Vercel automatically optimizes for performance
- Images and assets are served from CDN
- Automatic HTTPS included

## Next Steps
1. Test the deployed application
2. Set up monitoring and analytics
3. Configure TURN server for better WebRTC connectivity
4. Add error tracking (Sentry, etc.)
