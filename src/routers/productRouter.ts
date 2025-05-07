import { Router } from "express";
import productController from "../controller/productController.js";
import { check } from "express-validator";

const router = Router();

router.get("/products", productController.getAllProduct);

router.get("/products/:id", productController.getOneProduct);
router.delete("/products/:id", productController.delete);
router.put("/products", productController.update);

const validateProduct = [
  check("name").notEmpty().withMessage("Product name is required"),
  check("description").notEmpty().withMessage("Description required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("quantity")
    .isInt({ min: 0 })
    .withMessage("Qty must be a non-negative integer"),
  check("ean")
    .optional()
    .isLength({ min: 13, max: 13 })
    .withMessage("EAN must be 13 chars long"),
];
router.post("/products", validateProduct, productController.create);

export default router;
