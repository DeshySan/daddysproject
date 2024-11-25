import express from "express";
import axios from "axios";
import apiModel from "../database/apiModel.js";

export const getAPIkeyController = async (req, res) => {
  try {
    const apidata = {
      ClerkId: process.env.clerkId,
      ClientId: process.env.clientId,
      CustomerId: process.env.customerId,
      Signature: process.env.signature,
      Identity: process.env.identity,
    };
    const url = process.env.adminAPiAuthorisation;

    const response = await axios.post(url, apidata, {
      headers: {
        "Content-type": "application/json", // Corrected content type
        accept: "application/json",
      },
    });
    const APIKEY = response.data.AuthorizationToken;

    const api_key = new apiModel({ apiKey: APIKEY });
    await api_key.save();
    res.status(200).send({
      message: "API key has been generated successfully",
      success: true,
      api_key,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// export const getProductsFromBO = async (req, res) => {
//   const current_date = new Date();
//   try {
//     //check API Validation first
//     const apiValidation = await apiModel.findOne().sort({ _id: -1 });
//     const timeStamp = new Date(apiValidation.createdAt);
//     const timeDifference = (current_date - timeStamp) / 3600000;
//     if (timeDifference > 10) {
//       await getAPIkeyController(req, res);
//     } else {
//       const apiCheck = await apiModel.findOne().sort({ _id: -1 });
//       const apiKey = apiCheck.apiKey;
//       //do a product check
//       const { familyId } = req.params;
//       const checkProducts = await axios.get(
//         `https://api.swiftpos.com.au/api/Product?familyId=${familyId}`,
//         {
//           headers: {
//             "Content-type": "application/json", // Corrected content type
//             accept: "application/json",
//             AuthorizationToken: apiKey,
//           },
//         }
//       );
//       console.log(checkProducts);
//       res.status(200).send({
//         success: true,
//         message: "Done",
//         checkProducts,
//       });
//     }
//     console.log(timeDifference / 3600000);
//   } catch (error) {
//     console.error("Detailed error message:", error.message); // Log error message
//     console.error("Stack trace:", error.stack);
//     res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

export const getProductsFromBO = async (req, res) => {
  const current_date = new Date();
  try {
    // Check API Validation first
    const apiValidation = await apiModel.findOne().sort({ _id: -1 });
    const timeStamp = new Date(apiValidation.createdAt);
    const timeDifference = (current_date - timeStamp) / 3600000;

    if (timeDifference > 10) {
      await getAPIkeyController(req, res);
    } else {
      const apiCheck = await apiModel.findOne().sort({ _id: -1 });
      const apiKey = apiCheck.apiKey;

      // Perform a product check
      // const { familyId } = req.params;
      const familyId = 1;
      const checkProducts = await axios.get(
        `https://api.swiftpos.com.au/api/Product?familyId=${familyId}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            AuthorizationToken: apiKey,
          },
        }
      );
      console.log(`Length` + checkProducts.data.length);
      res.status(200).send({
        success: true,
        message: "Done",
        products: checkProducts.data, // Only send necessary data
      });
    }
    console.log(timeDifference / 3600000);
  } catch (error) {
    console.error("Error in getProductsFromBO:", error.message); // Log only the message
    console.error("Stack trace:", error.stack); // Log stack trace

    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Send only error message
    });
  }
};
