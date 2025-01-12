import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: number,
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
      type: boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
