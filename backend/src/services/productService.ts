import Product from '../models/product.js';
import type { IProduct } from '../models/product.js';
import Category from '../models/category.js';
import type { ICategory } from '../models/category.js';
import { Types } from "mongoose";

export const createProduct = async (data: Partial<IProduct>) => {
  const product = new Product(data);
  return await product.save();
};

export const getProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find().skip(skip).limit(limit).populate("category", "name"),
    Product.countDocuments(),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductsByCategory = async (
  categoryId: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find({ category: new Types.ObjectId(categoryId) })
      .skip(skip)
      .limit(limit)
      .populate("category", "name"),
    Product.countDocuments({ category: new Types.ObjectId(categoryId) }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total, // hỗ trợ lazy load
  };
};

export const getProductById = async (id: string) => {
  return await Product.findById(id).populate("category", "name");
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};