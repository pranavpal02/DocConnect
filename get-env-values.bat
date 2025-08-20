@echo off
echo 🔑 DocConnect Environment Variables Helper
echo =========================================
echo.

echo 📋 Instructions:
echo 1. Make sure you're in the backend directory
echo 2. Look for a file called .env (or env, .env.local)
echo 3. Open it with Notepad and copy these values:
echo.

echo Required for Render deployment:
echo - MONGODB_URI
echo - CLOUDINARY_NAME (or CLOUDINARY_CLOUD_NAME)
echo - CLOUDINARY_API_KEY
echo - CLOUDINARY_SECRET_KEY
echo - JWT_SECRET
echo.

echo 🎯 Next Steps:
echo 1. Copy the values from your .env file
echo 2. Create Render account: https://render.com/
echo 3. Create Vercel account: https://vercel.com/
echo 4. Use the values in Render's environment variables
echo.

echo 💡 Tip: If you can't find .env file, check for:
echo    - env (without the dot)
echo    - .env.local
echo    - environment
echo    - config.env
echo.

pause 