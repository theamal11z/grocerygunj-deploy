#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Vercel Deployment Setup Helper\n');
console.log('This script will help you prepare your project for Vercel deployment.\n');

// Check for vercel.json
const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelJsonPath)) {
  console.log('✅ vercel.json already exists');
} else {
  console.log('❌ vercel.json not found. This file is required for proper routing in a SPA.');
  console.log('   Please run this script from the project root directory.\n');
  process.exit(1);
}

// Check for environment variables
console.log('\n📝 Environment Variables Check');
console.log('The following environment variables need to be set in your Vercel project:');
console.log('  - VITE_SUPABASE_URL');
console.log('  - VITE_SUPABASE_ANON_KEY');
console.log('  - VITE_SUPABASE_SERVICE_ROLE_KEY');
console.log('  - VITE_APP_NAME');
console.log('  - VITE_AUTH_REMEMBER_SESSION');
console.log('  - VITE_AUTH_SESSION_EXPIRY');

// Helper functions
const checkCommand = (command) => {
  try {
    require('child_process').execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Check if Vercel CLI is installed
const isVercelInstalled = checkCommand('vercel');

console.log('\n🔍 System Check');
if (isVercelInstalled) {
  console.log('✅ Vercel CLI is installed');
} else {
  console.log('❌ Vercel CLI is not installed');
  console.log('   You can install it with: npm install -g vercel');
}

// Ask if user wants to proceed with deployment
rl.question('\n❓ Do you want to proceed with deployment now? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    if (isVercelInstalled) {
      console.log('\n🚀 Starting Vercel deployment process...');
      console.log('\nFollow the interactive prompts from Vercel CLI:');
      
      // Close readline before starting Vercel
      rl.close();
      
      try {
        require('child_process').execSync('vercel', { stdio: 'inherit' });
      } catch (e) {
        console.error('Error running Vercel command:', e);
      }
    } else {
      console.log('\n⚠️  Please install Vercel CLI first with: npm install -g vercel');
      console.log('   Then run: npm run deploy:vercel');
      rl.close();
    }
  } else {
    console.log('\n👍 No problem! When you\'re ready, you can deploy using:');
    console.log('   npm run deploy:vercel');
    console.log('\nOr, deploy manually through the Vercel dashboard.');
    rl.close();
  }
}); 