import mongoose from "mongoose";

const memberCounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

export default mongoose.model("MemberCounter", memberCounterSchema);
