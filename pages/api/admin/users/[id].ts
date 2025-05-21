import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// Defino modelin
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "ID e pavlefshme" });
  }

  if (req.method === "DELETE") {
    await User.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: "Përdoruesi u fshi me sukses." });
  }

  if (req.method === "PUT") {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Të dhënat janë të paplota." });
    }

    await User.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
          role,
        },
      }
    );

    return res.status(200).json({ message: "Përdoruesi u përditësua me sukses." });
  }

  return res.status(405).json({ message: "Metoda nuk lejohet." });
}
