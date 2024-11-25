import mongoose, { mongo } from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    mobile: {
      type: Number,
    },
    memberId: {
      type: Number,
      required: true,
      unique: true,
    },
    classification: {
      type: String,
      required: true,
      default: "Online",
    },
    memberVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
