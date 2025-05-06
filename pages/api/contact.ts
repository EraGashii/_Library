import type { NextApiRequest, NextApiResponse } from "next";
import Message from "api/models/message";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(200).json({ message: "Mesazhi u ruajt me sukses", data: newMessage });
  } catch (error) {
    console.error("Gabim në ruajtje:", error);
    res.status(500).json({ message: "Gabim gjatë ruajtjes në server." });
  }
}
