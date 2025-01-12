import invoice from "../database/invoice.js";

export const postInvoice = async (req, res) => {
  try {
    const { invoiceId, saleTotal, member, status } = req.body;

    const invoiceIdCheck = await invoice.find({}).sort({ invoiceId: -1 });
    if (invoiceIdCheck !== 0) {
      const invoic = new invoice({
        invoiceId,
        saleTotal,
        member,
        status,
      });
      await invoic.save();
      res.status(201).send({
        message: "Invoice has been succesffuly posted",
        success: true,
        invoic,
      });
    } else {
      const invoic = new invoice({
        invoiceId: 1,
        saleTotal,
        member,
        status,
      });
      await invoic.save();
      res.status(201).send({
        message: "Invoice has been succesffuly posted",
        success: true,
        invoic,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
};
