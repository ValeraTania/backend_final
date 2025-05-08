import { NextFunction, Router } from "express";
import productController from "../controller/productController.js";
import { check } from "express-validator";

const router = Router();

export default function authMiddleWare(roles:string[]){  //colocar en middleware
  return function (req:Request, res: Response, next:NextFunction){
    const token = req.headers.authorization;
  } 
}

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
  check("image").custom((value, { req }) => {
    if (!req.files || !req.files.image) {
      throw new Error("Image is required");
    }
    const image = req.files.image;
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(image.mimetype)) {
      throw new Error("Invalid image format. Only JPEG and PNG allowed");
    }

    if (image.size > 5 * 1024 * 1024) {
      throw new Error("Image size exceeds the max kimit of 5mg");
    }

    return true;
  }),
];
router.post("/products", validateProduct, productController.create);

export default router;
