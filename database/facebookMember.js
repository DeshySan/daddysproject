import mongoose from "mongoose";

const facebookMemberSchema = new mongoose.Schema({
  facebookId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  avatar: { type: String },
});
export default mongoose.model("FacebookMember", facebookMemberSchema);
