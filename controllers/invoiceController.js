export const postInvoice = async (req, res) => {
  try {
    const { invoiceId, saleTotal, member, status } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
};
