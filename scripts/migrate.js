require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // (nëse do me bo insert ose kontrolle, i shton këtu)

    await mongoose.disconnect();
    console.log("✅ Migration complete");
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }
}

migrate();
