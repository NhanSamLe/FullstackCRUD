import Product from '../models/product.js';
import type { IProduct } from '../models/product.js';
import Category from '../models/category.js';
import type { ICategory } from '../models/category.js';
import { Types } from "mongoose";
import  Fuse from 'fuse.js'
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
export const getProductFilters = async () => {
  try {
    // Lấy danh sách unique từ collection Product
    const brands = await Product.distinct("brand");
    const cpus = await Product.distinct("cpu");
    const rams = await Product.distinct("ram");
    const storages = await Product.distinct("storage");

    return {
      brands: brands.filter(Boolean),   // loại bỏ null/undefined
      cpus: cpus.filter(Boolean),
      rams: rams.filter(Boolean),
      storages: storages.filter(Boolean),
    };
  } catch (err) {
    throw new Error("Không thể lấy filters: " + err);
  }
};

export const fuzzySearchProduct = async (keyword:string, page =1 , limit = 10, filters?: { brand?: string; category?: string; minPrice?: number; maxPrice?: number ;  cpu?: string;
    ram?: string;
    storage?: string; })=> {
 const products = await (Product.find() as any).populate("category", "name");
 const fuse = new Fuse(products,{
  keys:["name","description","brand"],
  threshold: 0.3,
 } );
 // 3. Tìm theo keyword
  let result: IProduct[] = keyword.trim() 
  ? fuse.search(keyword).map(r => r.item as IProduct) 
  : (products as IProduct[]);

  // 4. Áp dụng filter
  if (filters) {
    if (filters.brand) {
      result = result.filter(
        (p) => p.brand?.toLowerCase() === filters.brand!.toLowerCase()
      );
    }

    if (filters.category) {
      result = result.filter(
        (p) => String(p.category?._id) === String(filters.category)
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.cpu) {
      result = result.filter(
        (p) => p.cpu?.toLowerCase() === filters.cpu!.toLowerCase()
      );
    }

    if (filters.ram) {
      result = result.filter(
        (p) => p.ram?.toLowerCase() === filters.ram!.toLowerCase()
      );
    }

    if (filters.storage) {
      result = result.filter(
        (p) => p.storage?.toLowerCase() === filters.storage!.toLowerCase()
      );
    }
  }

  // 5. Phân trang
  const total = result.length;
  const skip = (page - 1) * limit;
  const items = result.slice(skip, skip + limit);
 
 return{
  items,total,page,totalPages: Math.ceil(total/limit),
 }

}