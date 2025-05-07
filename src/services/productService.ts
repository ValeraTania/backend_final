import productModel, { IProduct } from "../models/productModel.js";

class productService {
  getAllProducts = async () => {
    try {
      return await productModel.find();
    } catch (error) {
      console.log(error);
    }
  };

  create = async (newProduct: IProduct) => {
    try {
      const createdProduct = await productModel.create(newProduct);
      return createdProduct;
    } catch (error: unknown) {
      console.error(`Error creating product ${error}`);
      throw new Error("Failed creating product");
    }
  };

  getById = async (id: string) => {
    try {
      return await productModel.findById(id);
    } catch (error: unknown) {
      console.error(`Error retrieving product ${error}`);
    }
  };
}

export default new productService();
