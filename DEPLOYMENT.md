# Dashboard Admin Panel Deployment Guide

This document provides instructions for deploying the Dashboard Admin Panel to various environments.

## Prerequisites

- Node.js (v18+)
- npm or yarn or bun
- Supabase project with configured schema

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   > **IMPORTANT**: The service role key should only be used for privileged operations and not exposed to client-side code in production.

## Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The build process will create a `dist` directory containing the compiled application.

## Deployment Options

### 1. Static Hosting (Vercel, Netlify, etc.)

#### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

#### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

### 2. Traditional Hosting

Upload the contents of the `dist` directory to your web server.

### 3. Docker Deployment

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t dashboard-admin .

# Run the container
docker run -p 8080:80 dashboard-admin
```

## Vercel Deployment (Recommended)

This project is specially configured for deployment on [Vercel](https://vercel.com), which offers a simple and efficient way to deploy web applications.

### Using the Deployment Helper

We've included a helper script to guide you through the Vercel deployment process:

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Run the setup helper
npm run vercel:setup
```

The helper script will:
1. Check if you have the necessary configuration files
2. Verify if Vercel CLI is installed
3. Guide you through the deployment process

### Manual Vercel Deployment

#### Option 1: Using Vercel CLI

```bash
# Install the CLI if you haven't already
npm install -g vercel

# Deploy from the project directory
npm run deploy:vercel
# or directly use
vercel
```

#### Option 2: Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your repository
4. Configure the project with these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add the required environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_APP_NAME`
   - `VITE_AUTH_REMEMBER_SESSION`
   - `VITE_AUTH_SESSION_EXPIRY`

### Vercel Configuration

The `vercel.json` file in the project root includes:
- SPA routing configuration to handle client-side routing
- Security headers setup
- Cache policies for static assets

## Post-Deployment Configuration

1. Ensure Supabase authentication is properly configured
2. Set up proper Row Level Security (RLS) policies
3. Create initial admin user through the `/create-admin` route (only available in development)

## Troubleshooting

- **API Connection Issues**: Verify your Supabase URL and keys are correct
- **Authentication Problems**: Check your Supabase authentication settings
- **CORS Errors**: Ensure your Supabase project has the correct origins allowed

## Security Considerations

1. Never commit `.env` files with real credentials
2. Use environment variables for all sensitive information
3. Configure proper CORS policies in Supabase
4. Implement proper RLS policies in Supabase

## Maintenance

Regular maintenance tasks:

1. Update dependencies with `npm update`
2. Monitor Supabase usage and plan accordingly
3. Implement proper backup strategies for your database 