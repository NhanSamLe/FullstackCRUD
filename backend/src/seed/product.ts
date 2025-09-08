import mongoose from "mongoose";
import Category from '../models/category.js';
import Product from "../models/product.js";

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/fullstack");

    console.log("✅ Connected to MongoDB");

    // Xóa dữ liệu cũ
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️ Cleared old data");

    // Tạo category
    const laptop = await Category.create({ name: "Laptop", description: "Các dòng laptop" });
    const smartphone = await Category.create({ name: "Smartphone", description: "Điện thoại thông minh" });
    const tablet = await Category.create({ name: "Tablet", description: "Máy tính bảng" });

    console.log("📂 Inserted categories");

    // Thêm products
    await Product.insertMany([
      // ----- Laptops -----
      { name: "MacBook Air M2", category: laptop._id, brand: "Apple", cpu: "Apple M2", ram: "8GB", storage: "256GB SSD", gpu: "Integrated", screen: "13.6 inch Retina", price: 1200, quantity: 50, description: "Laptop mỏng nhẹ của Apple", imageUrl: "https://example.com/macbook-air.jpg" },
      { name: "Dell XPS 13", category: laptop._id, brand: "Dell", cpu: "Intel i7", ram: "16GB", storage: "512GB SSD", gpu: "Intel Iris Xe", screen: "13.4 inch FHD", price: 1500, quantity: 30, description: "Laptop cao cấp dòng XPS", imageUrl: "https://example.com/dell-xps13.jpg" },
      { name: "HP Spectre x360", category: laptop._id, brand: "HP", cpu: "Intel i7 13th Gen", ram: "16GB", storage: "1TB SSD", gpu: "Intel Iris Xe", screen: "13.5 inch OLED", price: 1600, quantity: 25, description: "Laptop xoay gập cao cấp của HP", imageUrl: "https://example.com/hp-spectre.jpg" },
      { name: "Asus ROG Strix G15", category: laptop._id, brand: "Asus", cpu: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", gpu: "NVIDIA RTX 3060", screen: "15.6 inch 144Hz", price: 1400, quantity: 40, description: "Laptop gaming hiệu năng cao", imageUrl: "https://example.com/asus-rog.jpg" },
      { name: "Lenovo ThinkPad X1 Carbon", category: laptop._id, brand: "Lenovo", cpu: "Intel i7", ram: "16GB", storage: "1TB SSD", gpu: "Integrated", screen: "14 inch UHD", price: 1700, quantity: 20, description: "Laptop doanh nhân bền bỉ", imageUrl: "https://example.com/thinkpad-x1.jpg" },

      // ----- Smartphones -----
      { name: "iPhone 15 Pro", category: smartphone._id, brand: "Apple", cpu: "A17 Pro", ram: "8GB", storage: "256GB", price: 1200, quantity: 100, description: "Điện thoại flagship của Apple", imageUrl: "https://example.com/iphone15pro.jpg" },
      { name: "Samsung Galaxy S23 Ultra", category: smartphone._id, brand: "Samsung", cpu: "Snapdragon 8 Gen 2", ram: "12GB", storage: "512GB", price: 1300, quantity: 80, description: "Smartphone cao cấp bút S-Pen", imageUrl: "https://example.com/s23-ultra.jpg" },
      { name: "Google Pixel 8 Pro", category: smartphone._id, brand: "Google", cpu: "Tensor G3", ram: "12GB", storage: "256GB", price: 1100, quantity: 60, description: "Smartphone Android gốc, camera AI", imageUrl: "https://example.com/pixel8pro.jpg" },
      { name: "Xiaomi 13 Pro", category: smartphone._id, brand: "Xiaomi", cpu: "Snapdragon 8 Gen 2", ram: "12GB", storage: "256GB", price: 900, quantity: 70, description: "Flagship giá rẻ với camera Leica", imageUrl: "https://example.com/xiaomi13pro.jpg" },
      { name: "OnePlus 11", category: smartphone._id, brand: "OnePlus", cpu: "Snapdragon 8 Gen 2", ram: "16GB", storage: "256GB", price: 850, quantity: 75, description: "Điện thoại hiệu năng cao giá hợp lý", imageUrl: "https://example.com/oneplus11.jpg" },

      // ----- Tablets -----
      { name: "iPad Pro 12.9", category: tablet._id, brand: "Apple", cpu: "Apple M2", ram: "8GB", storage: "256GB", price: 1300, quantity: 40, description: "Máy tính bảng cao cấp của Apple", imageUrl: "https://example.com/ipadpro.jpg" },
      { name: "Samsung Galaxy Tab S9 Ultra", category: tablet._id, brand: "Samsung", cpu: "Snapdragon 8 Gen 2", ram: "12GB", storage: "512GB", price: 1200, quantity: 35, description: "Tablet Android màn hình lớn", imageUrl: "https://example.com/tab-s9.jpg" },
      { name: "Xiaomi Pad 6 Pro", category: tablet._id, brand: "Xiaomi", cpu: "Snapdragon 8+ Gen 1", ram: "8GB", storage: "128GB", price: 500, quantity: 60, description: "Tablet giá rẻ cấu hình mạnh", imageUrl: "https://example.com/pad6pro.jpg" },
      { name: "Lenovo Tab P12 Pro", category: tablet._id, brand: "Lenovo", cpu: "Snapdragon 870", ram: "6GB", storage: "128GB", price: 650, quantity: 45, description: "Tablet đa năng giải trí", imageUrl: "https://example.com/lenovo-tab.jpg" },
      { name: "Huawei MatePad Pro", category: tablet._id, brand: "Huawei", cpu: "Kirin 9000E", ram: "8GB", storage: "256GB", price: 800, quantity: 30, description: "Tablet Huawei thiết kế mỏng nhẹ", imageUrl: "https://example.com/matepadpro.jpg" }
    ]);

    console.log("✅ Seeded 15 products successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
