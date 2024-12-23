import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
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
