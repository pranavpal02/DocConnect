#!/bin/bash

echo "🚀 DocConnect Deployment Setup Script"
echo "====================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin YOUR_GITHUB_REPO_URL"
    echo ""
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Create accounts on:"
echo "   - MongoDB Atlas: https://www.mongodb.com/atlas"
echo "   - Cloudinary: https://cloudinary.com/"
echo "   - Render: https://render.com/"
echo "   - Vercel: https://vercel.com/"
echo ""
echo "2. Follow the DEPLOYMENT_GUIDE.md for detailed steps"
echo ""
echo "3. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "4. Deploy backend on Render"
echo "5. Deploy frontend on Vercel"
echo ""
echo "Good luck! 🚀" 