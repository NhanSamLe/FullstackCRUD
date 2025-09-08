import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { authMiddleware  } from '../middleware/auth.js';
import { delay  } from '../middleware/delay.js';
const caterouter = Router();

caterouter.post("/",authMiddleware,delay, categoryController.createCategory);
caterouter.get("/", categoryController.getCategories); // không phân trang
caterouter.get("/:id", categoryController.getCategoryById);
caterouter.put("/:id", categoryController.updateCategory);
caterouter.delete("/:id", categoryController.deleteCategory);

export default caterouter;
