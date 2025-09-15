import express from 'express'; 
import * as productController  from '../controllers/productController.js';
import { authMiddleware  } from '../middleware/auth.js';
import { delay  } from '../middleware/delay.js';

const router = express.Router();

// router.use(authMiddleware);
// router.use(delay);

router.get("/filters", productController.getFilters);
router.get("/search", productController.FuzzySearch);
router.post("/", productController.createProduct);

// Lấy tất cả sản phẩm (có phân trang)
// GET /api/products?page=1&limit=10
router.get("/", productController.getProducts);

// Lấy sản phẩm theo danh mục (có phân trang/lazy loading)
// GET /api/products/category/:categoryId?page=1&limit=10
router.get("/category/:categoryId", productController.getProductsByCategory);

// Lấy chi tiết 1 sản phẩm
// GET /api/products/:id
router.get("/:id", productController.getProductById);

// Cập nhật sản phẩm
// PUT /api/products/:id
router.put("/:id", productController.updateProduct);

// Xóa sản phẩm
// DELETE /api/products/:id
router.delete("/:id", productController.deleteProduct);



export default router;