// import { connectMongo } from "lib/mongodb";
// import BlogModel from "api/models/Blog";

import BlogModel from "api/models/Blog";

import { connectMongo } from "../../lib/mongodb";

export interface BlogInput {
  title: string;
  body: string;
  author?: string;
}


// CREATE
export async function createBlog(data: BlogInput) {
  await connectMongo();

  const blogToInsert = {
    ...data,
    createdAt: new Date(),
  };

  const result = await BlogModel.create(blogToInsert);
  return result;
}

// READ ALL
export async function getBlogs() {
  await connectMongo();
  const blogs = await BlogModel.find().sort({ createdAt: -1 });
  return blogs;
}

// READ ONE
export async function getBlog(id: string) {
  await connectMongo();
  const blog = await BlogModel.findById(id);
  return blog;
}

// UPDATE
export async function updateBlog(id: string, data: Partial<BlogInput>) {
  await connectMongo();
  const blog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
  return blog;
}

// DELETE
export async function deleteBlog(id: string) {
  await connectMongo();
  const blog = await BlogModel.findByIdAndDelete(id);
  if (!blog) throw new Error("Blog not found");
  return { message: "Deleted successfully" };
}
