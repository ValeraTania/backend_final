import { Router } from "express";
import productController from "../controller/productController.js";

const router = Router();

router.get("/products", (req, res) => {
  res.json(productController.getAllProduct);
});

router.get("/products/:id", productController.getOneProduct);
router.delete("/products/:id", productController.delete);
router.post("/products", productController.update);
router.put("/products", productController.create);

export default router;
