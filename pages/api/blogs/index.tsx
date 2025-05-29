import { createBlog, getBlogs } from "api/services/Blog";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs); // ✅ shto return
    } catch (error) {
      return res.status(500).json(error); // ✅
    }
  }

  if (req.method === "POST") {
    try {
      const blog = await createBlog(req.body);
      return res.status(201).json(blog); // ✅
    } catch (error) {
      return res.status(500).json(error); // ✅
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" }); // ✅
}

