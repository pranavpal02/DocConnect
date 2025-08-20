// Script to help get your current credentials for deployment
// Run this in your backend directory to see what you need

console.log("🔑 DocConnect Credentials Helper");
console.log("=================================");
console.log("");

console.log("📋 You need these credentials for deployment:");
console.log("");

console.log("1. MongoDB Atlas:");
console.log("   - Check your .env file for MONGODB_URI");
console.log("   - Format: mongodb+srv://username:password@cluster.mongodb.net/docconnect");
console.log("");

console.log("2. Cloudinary:");
console.log("   - Check your .env file for:");
console.log("     * CLOUDINARY_NAME (or CLOUDINARY_CLOUD_NAME)");
console.log("     * CLOUDINARY_API_KEY");
console.log("     * CLOUDINARY_SECRET_KEY");
console.log("");

console.log("3. JWT Secret:");
console.log("   - Check your .env file for JWT_SECRET");
console.log("   - If not set, generate a random string");
console.log("");

console.log("🎯 Next Steps:");
console.log("1. Copy these values from your .env file");
console.log("2. Create Render account: https://render.com/");
console.log("3. Create Vercel account: https://vercel.com/");
console.log("4. Follow the deployment guide");
console.log("");

console.log("💡 Tip: Your current .env file should have most of what you need!");
console.log("   Just copy the values to Render's environment variables section."); 