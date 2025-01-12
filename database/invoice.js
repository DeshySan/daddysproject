import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: Number,
      required: true,
    },
    saleTotal: {
      type: Number,
      required: true,
    },
    member: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
