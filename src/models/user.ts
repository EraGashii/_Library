// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  provider: { type: String, default: "credentials" },
}, { timestamps: true }); // ← NEW



export default mongoose.models.User || mongoose.model("User", userSchema);
