import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    name: {
      type: String, // Correcting the type definition
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    productId: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Family", familySchema);
