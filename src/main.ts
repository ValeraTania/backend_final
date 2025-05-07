import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(express.json());
app.use(express.static("static"));
app.get("/", (req, res) => {
  res.json({ test: true });
});
app.use("/api", productRouter);

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Succesfully connected to MongoDB");

    app.listen(PORT, () => {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === "development") {
        console.log(`Server running in development mode on port ${PORT}`);
      } else {
        console.log(`Server running in production mode on port ${PORT}`);
      }
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

startApp();
