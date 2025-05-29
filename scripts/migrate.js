require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
    await mongoose.disconnect();
    console.log("✅ Migration complete");
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }
}

migrate();
