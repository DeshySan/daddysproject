import AdyenApiLibrary from "@adyen/api-library";

// Initialize required components from the Adyen library
const { CheckoutAPI, Client } = AdyenApiLibrary;

const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST",
});

// Initialize the Checkout API
const checkoutApi = new CheckoutAPI(client);

export const makePayment = async (req, res) => {
  const { amount, currency, paymentMethod, reference, returnUrl } = req.body;
  const paymentRequest = {
    amount: { value: amount, currency },
    reference,
    paymentMethod,
    returnUrl,
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    shopperInteraction: "Ecommerce",
  };

  try {
    const paymentResponse = await checkoutApi.PaymentsApi.payments(
      paymentRequest
    );
    res.status(200).json(paymentResponse);
  } catch (error) {
    console.error("Payment Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
