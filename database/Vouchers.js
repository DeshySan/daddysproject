import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    voucherDescription: {
      type: String,
    },
    balance: {
      type: Number,
    },
    barcode: {
      type: String,
    },
    member: {
      type: Number,
    },
    displayPromotional: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vouchers", voucherSchema);
