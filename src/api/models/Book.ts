import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  coverImage?: string;
  createdAt?: Date;
}

const BookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BookModel = mongoose.models.Book || mongoose.model<Book>("Book", BookSchema);

export default BookModel;
