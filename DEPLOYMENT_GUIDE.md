# 🚀 DocConnect Deployment Guide

## 📋 Prerequisites
- GitHub account
- ✅ **MongoDB Atlas account** (Already set up!)
- ✅ **Cloudinary account** (Already set up!)
- Render account (for backend)
- Vercel account (for frontend)

---

## 🗄️ Step 1: Get Your Current Credentials

### 1.1 Extract MongoDB URI
1. Check your backend `.env` file for `MONGODB_URI`
2. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/docconnect`
3. **Copy this entire string** - you'll need it for Render

### 1.2 Extract Cloudinary Credentials
1. Check your backend `.env` file for:
   - `CLOUDINARY_NAME` (or `CLOUDINARY_CLOUD_NAME`)
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_SECRET_KEY`
2. **Copy all three values** - you'll need them for Render

### 1.3 Check JWT Secret
1. Look for `JWT_SECRET` in your `.env` file
2. If it exists, copy it
3. If not, generate a random string (you can use any random text generator)

---

## ☁️ Step 2: Create Hosting Accounts

### 2.1 Create Render Account
1. Go to [Render](https://render.com/)
2. Click "Sign Up" and create account
3. This will host your backend

### 2.2 Create Vercel Account
1. Go to [Vercel](https://vercel.com/)
2. Click "Sign Up" and create account
3. This will host your frontend

---

## 🔧 Step 3: Backend Deployment (Render)

### 3.1 Push Code to GitHub
```bash
# In your project root
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 3.2 Deploy on Render
1. Go to [Render](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: `docconnect-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 3.3 Set Environment Variables
In Render dashboard, go to "Environment" tab and add:

```
MONGODB_URI=your_existing_mongodb_uri_from_env_file
JWT_SECRET=your_existing_jwt_secret_or_generate_new_one
CLOUDINARY_CLOUD_NAME=your_existing_cloudinary_name
CLOUDINARY_API_KEY=your_existing_cloudinary_api_key
CLOUDINARY_API_SECRET=your_existing_cloudinary_secret_key
NODE_ENV=production
PORT=10000
```

**Note**: Use the exact values from your current `.env` file!

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait for build to complete
3. Copy your service URL (e.g., `https://docconnect-backend.onrender.com`)

---

## 🎨 Step 4: Frontend Deployment (Vercel)

### 4.1 Update API Configuration
1. Open `frontend/src/config/api.js`
2. Replace `your-backend-domain.onrender.com` with your actual backend URL from Render
3. Save and commit changes

### 4.2 Deploy on Vercel
1. Go to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### 4.3 Get Frontend URL
After deployment, copy your frontend URL (e.g., `https://docconnect.vercel.app`)

---

## 🔄 Step 5: Update Backend CORS

### 5.1 Update Backend Environment
In Render dashboard, add:
```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 5.2 Redeploy Backend
1. Go to Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## ✅ Step 6: Test Everything

### 6.1 Test Backend
- Visit your backend URL
- Should see "API WORKING"

### 6.2 Test Frontend
- Visit your frontend URL
- Test login, registration, appointments
- Check if images upload correctly

### 6.3 Test Database
- Create a test user
- Check if data appears in MongoDB Atlas

---

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check if FRONTEND_URL is set correctly in backend
   - Ensure backend is redeployed after changes

2. **Database Connection Issues**
   - Verify MongoDB URI is correct (copy exactly from your .env)
   - Check if IP is whitelisted in Atlas

3. **Image Upload Issues**
   - Verify Cloudinary credentials (copy exactly from your .env)
   - Check if CLOUDINARY_* variables are set

4. **Build Failures**
   - Check package.json dependencies
   - Ensure all imports are correct

---

## 📱 Final URLs

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **Database**: MongoDB Atlas (cloud) - Already working!

---

## 🔒 Security Notes

- Use your existing JWT_SECRET if you have one
- Consider restricting MongoDB IP access later
- Monitor usage to stay within free tier limits

---

## 💰 Cost Breakdown

- **MongoDB Atlas**: Free (512MB) - Already set up!
- **Cloudinary**: Free (25GB storage, 25GB bandwidth) - Already set up!
- **Render**: Free (750 hours/month)
- **Vercel**: Free (unlimited)

**Total Cost: $0/month** 🎉

---

## 📞 Support

If you encounter issues:
1. Check Render logs in dashboard
2. Check Vercel build logs
3. Verify environment variables (copy exactly from your .env)
4. Test locally first

**Happy Deploying! 🚀** 