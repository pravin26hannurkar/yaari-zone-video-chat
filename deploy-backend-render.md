# Deploy Backend to Render

## Step-by-Step Deployment Guide

### 1. Prepare Your Repository
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Connect your GitHub repository

### 3. Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `yaari-zone-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Environment Variables
Add these environment variables in Render dashboard:

```
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
REDIS_URL=redis://your-redis-url  # Optional
JWT_SECRET=your-super-secret-jwt-key-change-this
TURN_SERVER_URL=turn:your-turn-server.com:3478  # Optional
TURN_USERNAME=your-turn-username  # Optional
TURN_PASSWORD=your-turn-password  # Optional
```

### 5. Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your backend will be available at: `https://yaari-zone-backend.onrender.com`

### 6. Update Frontend
Update your frontend's `.env` file:
```
VITE_BACKEND_URL=https://yaari-zone-backend.onrender.com
```

## Troubleshooting

### Common Issues:
- **Port Issues**: Render uses port 10000 by default
- **CORS**: Make sure FRONTEND_URL matches your deployed frontend
- **WebRTC**: Add TURN server for production use

### Free Tier Limitations:
- 750 hours/month
- Sleeps after 15 minutes of inactivity
- Can be woken up automatically

## Next Steps
After backend deployment, deploy your frontend to Vercel and update the CORS settings.
