import { Schema, model, Document, Types } from "mongoose";
import type{ ICategory } from "./category.js";

export interface IProduct extends Document {
  name: string;
  category: Types.ObjectId | ICategory;
  brand?: string;
  cpu?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  screen?: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: String },
    cpu: { type: String },
    ram: { type: String },
    storage: { type: String },
    gpu: { type: String },
    screen: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);

export default Product; 
