import type { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

// Định nghĩa type cho param có id
interface IdParam {
  id: string;
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || "Error creating category" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const getCategoryById = async (req: Request<IdParam>, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch {
    res.status(500).json({ message: "Error fetching category" });
  }
};

export const updateCategory = async (req: Request<IdParam>, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await categoryService.updateCategory(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "Error updating category" });
  }
};

export const deleteCategory = async (req: Request<IdParam>, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await categoryService.deleteCategory(id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting category" });
  }
};
