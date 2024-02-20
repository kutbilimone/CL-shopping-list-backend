import { Router } from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.post("/sort", productController.createSortedList);
router.post("/", productController.testPost);

export default router;
