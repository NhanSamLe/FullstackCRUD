import Category from '../models/category.js';
import type { ICategory } from '../models/category.js';
import { Types } from "mongoose";


export const createCategory = async (data: Pick<ICategory, "name" | "description">) => {
  const existed = await Category.findOne({ name: data.name });
  if (existed) throw new Error("Category already exists");
  return await new Category(data).save();
};

// Lấy tất cả Category (không phân trang)
export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

// Lấy Category theo ID
export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

// Cập nhật Category
export const updateCategory = async (id: string, data: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

// Xoá Category
export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};