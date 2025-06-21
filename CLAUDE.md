# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack web application for SVCI (Student Vice Council Initiative) with the following architecture:

- **Frontend**: React + Vite application with 3D graphics using React Three Fiber
- **Backend**: Supabase instance (complete Firebase alternative) with PostgreSQL database
- **Additional**: Node.js server for guild member ranking system

### Key Directories

- `frontend/` - React application with 3D components, authentication, and UI
- `backend/supabase/` - Full Supabase monorepo including docs, studio, and packages
- `dev-data/` - Contains sample data (data.json)
- `profiles/` - User profile images and assets
- `template/` - HTML templates for rendering member data
- `index.js` - Simple Node.js HTTP server for guild member ranking

## Development Commands

### Frontend (React + Vite)
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend (Supabase)
```bash
cd backend/supabase
pnpm dev             # Start all services in parallel
pnpm build           # Build all packages
pnpm lint            # Run lint across all packages
pnpm typecheck       # Run TypeScript checks
pnpm test:docs       # Test documentation
pnpm test:studio     # Test studio application
```

### Node.js Server
```bash
node index.js        # Start the guild member ranking server
```

## Architecture Details

### Frontend Technologies
- **React 18** with functional components
- **Vite** for fast development and building
- **React Three Fiber** for 3D graphics and WebGL
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for HTTP requests
- **Express** and **Mongoose** for server capabilities
- **Lucide React** for icons

### Backend (Supabase Ecosystem)
- **PostgreSQL** database with real-time subscriptions
- **Authentication** system with JWT tokens
- **RESTful APIs** auto-generated from database schema
- **File Storage** for user assets
- **Edge Functions** for serverless computing
- **Real-time** WebSocket connections

### Key Frontend Components
- `HackerRoom.jsx` - 3D room visualization
- `Hero.jsx` - Landing page hero section
- `Login.jsx`, `SvciLogin.jsx` - Authentication components
- `Leadership.jsx` - Team member display
- `Events.jsx` - Event management
- `ContactUs.jsx` - Contact form
- `Media.jsx` - Media gallery

### Authentication System
The application uses a dual authentication approach:
- Supabase Auth for main application authentication
- Custom JWT implementation for guild member system
- Context-based auth state management in `AuthContext.jsx`

## Testing and Quality

- **ESLint** configured for React and React Hooks
- **TypeScript** support in both frontend and backend
- **Prettier** for code formatting (backend)
- **Vitest** for testing (configured in various packages)

## Important Notes

- The project uses **pnpm** as the package manager for the Supabase backend
- Frontend uses **npm** for package management
- 3D models are stored in `public/models/` directory
- Profile images are stored in `profiles/` directory
- The guild ranking system is separate from the main application authentication