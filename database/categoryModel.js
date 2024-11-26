import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  spId: {
    type: String,
  },
  batch: {
    type: String,
    unique: true,
  },
  showOnHomePage: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Category", categorySchema);
