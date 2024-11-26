import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
    },
    salesCount: {
      type: Number,
    },
    plu: {
      type: Number,
      unique: true,
    },
    batch: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
