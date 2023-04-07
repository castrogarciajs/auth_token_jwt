import { Schema, model } from "mongoose";

const Product = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    photo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", Product);