import mongoose from "mongoose";

const apiSchema = new mongoose.Schema(
  {
    apiKey: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("API", apiSchema);
