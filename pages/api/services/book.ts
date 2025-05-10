import { NextApiRequest, NextApiResponse } from "next";
import * as formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectMongo } from "lib/mongodb";
import BookModel from "api/models/Book";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "/public/uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Upload failed" });

      const coverImagePath = "/uploads/" + path.basename((files.coverImage as formidable.File[])[0].filepath);

      const newBook = await BookModel.create({
        title: (fields.title as string[])[0],
        author: (fields.author as string[])[0],
        price: (fields.price as string[])[0],
        stock: (fields.stock as string[])[0],
        description: (fields.description as string[])[0],
        coverImage: coverImagePath,
      });

      res.status(201).json(newBook);
    });
  } else if (req.method === "GET") {
    const books = await BookModel.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await BookModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  }
}
