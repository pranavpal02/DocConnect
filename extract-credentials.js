import fs from 'fs';
import path from 'path';

console.log("🔑 DocConnect Credentials Extractor");
console.log("====================================");
console.log("");

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
  console.log("❌ No .env file found in current directory");
  console.log("   Make sure you're in the backend directory");
  console.log("   Or check if your .env file has a different name");
  console.log("");
  process.exit(1);
}

console.log("✅ Found .env file");
console.log("");

// Read and parse .env file
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });

  console.log("📋 Here are the credentials you need for deployment:");
  console.log("");

  // MongoDB
  if (envVars.MONGODB_URI) {
    console.log("🗄️  MONGODB_URI:");
    console.log(`   ${envVars.MONGODB_URI}`);
    console.log("");
  } else {
    console.log("❌ MONGODB_URI not found in .env");
    console.log("");
  }

  // Cloudinary
  const cloudinaryName = envVars.CLOUDINARY_NAME || envVars.CLOUDINARY_CLOUD_NAME;
  if (cloudinaryName) {
    console.log("☁️  CLOUDINARY_CLOUD_NAME:");
    console.log(`   ${cloudinaryName}`);
    console.log("");
  } else {
    console.log("❌ CLOUDINARY_NAME/CLOUDINARY_CLOUD_NAME not found in .env");
    console.log("");
  }

  if (envVars.CLOUDINARY_API_KEY) {
    console.log("🔑 CLOUDINARY_API_KEY:");
    console.log(`   ${envVars.CLOUDINARY_API_KEY}`);
    console.log("");
  } else {
    console.log("❌ CLOUDINARY_API_KEY not found in .env");
    console.log("");
  }

  if (envVars.CLOUDINARY_SECRET_KEY) {
    console.log("🔐 CLOUDINARY_API_SECRET:");
    console.log(`   ${envVars.CLOUDINARY_SECRET_KEY}`);
    console.log("");
  } else {
    console.log("❌ CLOUDINARY_SECRET_KEY not found in .env");
    console.log("");
  }

  // JWT
  if (envVars.JWT_SECRET) {
    console.log("🔒 JWT_SECRET:");
    console.log(`   ${envVars.JWT_SECRET}`);
    console.log("");
  } else {
    console.log("⚠️  JWT_SECRET not found in .env");
    console.log("   You'll need to generate one for deployment");
    console.log("");
  }

  console.log("🎯 Next Steps:");
  console.log("1. Copy these values (they're exactly what you need for Render)");
  console.log("2. Create Render account: https://render.com/");
  console.log("3. Create Vercel account: https://vercel.com/");
  console.log("4. Follow the deployment guide");
  console.log("");

} catch (error) {
  console.log("❌ Error reading .env file:", error.message);
  console.log("");
} 