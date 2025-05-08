import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await User.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "User deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
