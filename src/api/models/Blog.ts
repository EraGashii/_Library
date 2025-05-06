import mongoose, { Schema, Document } from "mongoose";

export interface Blog extends Document {
  _id: string;   
  title: string;
  body: string;
  createdAt?: Date;
}

const BlogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogModel = mongoose.models.Blog || mongoose.model<Blog>("Blog", BlogSchema);

export default BlogModel;
