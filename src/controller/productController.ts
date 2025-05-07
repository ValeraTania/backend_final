import { Request, Response } from "express";
import productService from "../services/productService.js";
import productModel from "../models/productModel.js";
import { validationResult } from "express-validator";

class productController {
  async getAllProduct(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve products", error });
    }
  }

  async getOneProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const foundProduct = await productModel.findById(id);
      res.json(foundProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve product", error });
    }
  }

  delete() {}

  update() {}

  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
      }
      const newProduct = await productService.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product", error });
    }
  }
}

export default new productController();
