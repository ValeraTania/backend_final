import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  ean?: string;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true, default: 0 },
  image: { type: String, require: false, default: "no-image.png" },
  ean: { type: String },
});

export default mongoose.model<IProduct>('Product', ProductSchema);