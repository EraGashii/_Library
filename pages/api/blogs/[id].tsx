import { getBlog, updateBlog, deleteBlog } from "../../../src/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const blog = await getBlog(id as string);
      return res.status(200).json(blog);
    } catch (error) {
      console.error("Delete error:", error); // ✅ logs to terminal
      return res.status(500).json({ message: "Internal server error", error });
    }
    
  }

  if (req.method === "PUT") {
    try {
      const result = await updateBlog(id as string, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const result = await deleteBlog(id as string);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
