import { NextApiRequest, NextApiResponse } from "next";
import * as formidable from "formidable";
import { connectMongo } from "lib/mongodb";
import BookModel from "api/models/Book";

// ⛔ Vercel nuk lejon body parser për file upload me formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      // nuk përdorim uploadDir sepse s’ruajmë file në Vercel
    });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Upload failed" });

      // Fallback image
      const coverImagePath = "/uploads/book-spotlight.jpg";

      try {
        const title = (fields.title as string[] || [])[0];
        const author = (fields.author as string[] || [])[0];
        const price = parseFloat((fields.price as string[] || ["0"])[0]);
        const stock = parseInt((fields.stock as string[] || ["0"])[0]);
        const description = (fields.description as string[] || [])[0];

        // Validim fushash
        if (!title || !author || isNaN(price) || isNaN(stock)) {
          return res.status(400).json({ error: "Invalid or missing fields" });
        }

        const newBook = await BookModel.create({
          title,
          author,
          price,
          stock,
          description,
          coverImage: coverImagePath,
        });

        res.status(201).json(newBook);
      } catch (error) {
        console.error("❌ Create book error:", error);
        res.status(500).json({ error: "Database error" });
      }
    });
  }

  else if (req.method === "GET") {
    try {
      const books = await BookModel.find().sort({ createdAt: -1 });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  }

  else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await BookModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  }

  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
