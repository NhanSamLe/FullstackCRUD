import type { Request, Response } from 'express';
import * as productService from '../services/productService.js';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Lấy tất cả sản phẩm có phân trang
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await productService.getProducts(page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Lấy sản phẩm theo danh mục
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
     if (!categoryId) {
      return res.status(400).json({ message: "CategoryId is required" });
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await productService.getProductsByCategory(
      categoryId,
      page,
      limit
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

// Lấy chi tiết 1 sản phẩm
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
export const getFilters = async (req : Request , res : Response) => {
  try {
    const filters = await productService.getProductFilters();
    return res.json(filters);
  } catch (err) {
    return res.status(500).json({  error: String(err) });
  }
};

export const FuzzySearch = async (req: Request, res:Response )=> {
   try {
       const {
      keyword = "",
      page = "1",
      limit = "10",
      brand,
      category,
      minPrice,
      maxPrice,
      cpu,
      ram,
      storage,
    } = req.query;
      const filters: {
      brand?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      cpu?: string;
      ram?: string;
      storage?: string;
    } = {};

    if (brand) filters.brand = String(brand);
    if (category) filters.category = String(category);
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (cpu) filters.cpu = String(cpu);
    if (ram) filters.ram = String(ram);
    if (storage) filters.storage = String(storage);

      const result = await productService.fuzzySearchProduct(String(keyword),parseInt(page as string, 10 ), parseInt(limit as string,10),filters);
      res.status(200).json({
        success: true,...result,
      })
   } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while searching products",
      error: String(error) // tạm thời in ra để biết
    });  
   }
} 