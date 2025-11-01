# YaariZone Video Chat

An Omegle-style anonymous/random video + text chat web app with a luxurious neon theme. Built with React (Vite) + TailwindCSS for frontend, Node.js + Express + Socket.io for backend, and WebRTC for real-time video communication.

## Features

- Random pairing for video and text chat
- Real-time video (WebRTC) and text messaging
- "Next" to skip connections
- Responsive neon-luxury UI with glassmorphism and gradient glows
- Safety features: age-gating, moderation, reporting
- Production-ready deployment instructions

## Project Structure

```
yaari-zone-video-chat/
├── backend/                 # Node.js backend
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/                # React frontend
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── VideoChat.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── TermsOfService.jsx
│   │   │   ├── CommunityGuidelines.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   └── FAQ.jsx
│   │   └── components/
│   │       ├── VideoPlayer.jsx
│   │       ├── ChatBox.jsx
│   │       ├── Controls.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Footer.jsx
│   │       ├── AnimatedBackground.jsx
│   │       └── FloatingAvatars.jsx
├── README.md
└── TODO.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yaari-zone-video-chat
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:3000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=3000
PUBLIC_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379  # Optional, for production scaling
```

## Contact Information

- **Email:** team.yaarizone@gmail.com
- **Instagram:** [@yaarizone_app](https://www.instagram.com/yaarizone_app/)

## Deployment

### Backend Deployment

**Important Note:** Firebase Hosting only supports static files and cannot host the Node.js backend. The backend must be deployed separately to a platform that supports server-side applications.

Recommended hosting options for the backend:
- **Render** (recommended for simplicity and free tier)
- **Railway**
- **Heroku**
- **Vercel** (for serverless functions)
- **AWS EC2** or **Google Cloud Run** (for more control)

Ensure HTTPS is enabled for WebRTC functionality. Follow the deployment guide in `deploy-backend-render.md` for Render-specific instructions.

### Frontend Deployment

The frontend has been deployed to Firebase Hosting.

**Firebase Hosting URL:** https://yari-zone.web.app

To deploy updates:
1. Build the frontend: `cd frontend && npm run build`
2. Copy build files to public directory: `xcopy frontend\dist\* public\ /Y` (Windows) or `cp -r frontend/dist/* public/` (Linux/Mac)
3. Copy assets: `xcopy frontend\dist\assets\* public\assets\ /Y` (Windows) or `cp -r frontend/dist/assets/* public/assets/` (Linux/Mac)
4. Deploy: `firebase deploy --only hosting`

Alternatively, deploy the frontend to Vercel or Netlify. Set the backend URL in environment variables.

### TURN Server

For production, set up a TURN server (e.g., Coturn) to handle NAT traversal for WebRTC.

## Security & Moderation

- Age gating: Users under 18 are blocked from video sections
- Real-time moderation: Profanity and nudity detection
- Reporting system for abusive behavior
- Rate limiting and abuse prevention

## Legal & Ethical Considerations

- Respect user privacy with ephemeral streams
- Implement safe defaults for moderation
- Comply with local laws regarding online communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
