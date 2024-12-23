import express from "express";
import axios from "axios";
import apiModel from "../database/apiModel.js";
import categoryModel from "../database/categoryModel.js";
import productModel from "../database/productModel.js";
import Vouchers from "../database/Vouchers.js";

//restructure and optimise better- to be done in the beta testing
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

export const getCategoryFromBO = async (req, res) => {
  const sluggy = (name) => {
    return name.replace(/\s/g, "-").toLowerCase();
  };
  const current_date = new Date();
  try {
    // Check if 'batch' exists in req.body
    if (!req.body.batch) {
      return res.status(400).send({
        success: false,
        message: "Batch field is required in the request body.",
      });
    }
    const batch = req.body.batch.replace(/\s/g, "-").toLowerCase();
    const apiValidation = await apiModel.findOne().sort({ _id: -1 });
    const timeStamp = new Date(apiValidation.createdAt);
    const timeDifference = (current_date - timeStamp) / 3600000;

    if (timeDifference > 10) {
      await getAPIkeyController(req, res);
    } else {
      const apiCheck = await apiModel.findOne().sort({ _id: -1 });
      const apiKey = apiCheck.apiKey;
      const response = await axios.get(
        `https://api.swiftpos.com.au/api/Category`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            AuthorizationToken: apiKey,
          },
        }
      );
      const senData = response.data;
      const filteredCategory = await senData?.map((item) => ({
        spId: item.Id,
        name: item.Name,
        slug: sluggy(item.Name),
        batch: batch,
      }));
      await categoryModel.insertMany(filteredCategory);
      res.status(200).send({
        success: true,
        filteredCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Internal Server Error" });
  }
};

export const deleteCategorybyBatch = async (req, res) => {
  try {
    const { batch } = req.body;
    const response = await categoryModel.deleteMany({ batch });
    res.status(200).send({
      success: true,
      message: `Successfully deleted the first pull batch data`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

export const deleteProductsbyBatch = async (req, res) => {
  try {
    const { batch } = req.body;
    if (!batch) {
      res.status(404).send({
        success: false,
        message: "Which Batch Products You want it deleted?",
      });
    } else {
      const response = await productModel.deleteMany({ batch });
      res.status(200).send({
        success: true,
        message: "Sucessfully deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get Products from BO
export const getProductsFromBO = async (req, res) => {
  const current_date = new Date();
  try {
    // Check if batch exists in req.body
    if (!req.body.batch) {
      return res.status(400).send({
        success: false,
        message: "Batch field is required in the request body.",
      });
    }
    const batch = req.body.batch.replace(/\s/g, "-").toLowerCase();

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
      const familyId = req.params.familyId;
      const checkProducts = await axios.get(
        `https://api.swiftpos.com.au/api/Product?includeImage=true&familyId=${familyId}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            AuthorizationToken: apiKey,
          },
        }
      );

      // This will hold all the valid products
      const validProducts = [];

      await Promise.all(
        checkProducts?.data.map(async (item) => {
          const categoryId = await categoryModel.findOne({
            name: item.Category.Name,
          });

          if (!categoryId) {
            console.log(`Category not found for ${item.Category.Name}`);
            return;
          }

          const productExistence = await productModel.findOne({ plu: item.Id });

          if (productExistence) {
            console.log(`Product already exists: ${item.Description.Short}`);
            return;
          }

          // Add valid products to the validProducts array
          validProducts.push({
            name: item.Description.Short,
            description: item.Description.Standard,
            price: item.Price,
            plu: item.Id,
            category: categoryId._id,
            batch: batch,
            image: item.Image,
          });
        })
      );

      // After all iterations, check if we have valid products to insert
      if (validProducts.length > 0) {
        await productModel.insertMany(validProducts);
        res.status(200).send({
          success: true,
          message: "Done",
          filteredProducts: validProducts,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "No new products to add.",
        });
      }
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

//Will not run this until Cloud Sync service is enabled and back to operation for this DB
// export const updateProducts = async (req, res) => {
//   const current_date = new Date();
//   try {
//     // Check if 'batch' exists in req.body
//     if (!req.body.batch) {
//       return res.status(400).send({
//         success: false,
//         message: "Batch field is required in the request body.",
//       });
//     }
//     const batch = req.body.batch.replace(/\s/g, "-").toLowerCase();

//     // Check API Validation first
//     const apiValidation = await apiModel.findOne().sort({ _id: -1 });
//     const timeStamp = new Date(apiValidation.createdAt);
//     const timeDifference = (current_date - timeStamp) / 3600000;

//     if (timeDifference > 10) {
//       await getAPIkeyController(req, res);
//     } else {
//       const apiCheck = await apiModel.findOne().sort({ _id: -1 });
//       const apiKey = apiCheck.apiKey;

//       // Get the product list you want to update
//       const familyId = req.body.familyId;
//       const checkProducts = await axios.get(
//         `https://api.swiftpos.com.au/api/Product?familyId=${familyId}`,
//         {
//           headers: {
//             "Content-type": "application/json",
//             accept: "application/json",
//             AuthorizationToken: apiKey,
//           },
//         }
//       );

//       // This will hold all the updates for the products
//       const updatedProducts = [];

//       await Promise.all(
//         checkProducts?.data.map(async (item) => {
//           const categoryId = await categoryModel.findOne({
//             name: item.Category.Name,
//           });

//           if (!categoryId) {
//             console.log(`Category not found for ${item.Category.Name}`);
//             return; // Skip this product if the category is not found
//           }

//           // Check if the product already exists in the database
//           const productExistence = await productModel.findOne({ plu: item.Id });

//           if (!productExistence) {
//             console.log(`Product with PLU ${item.Id} does not exist.`);
//             return; // Skip if product doesn't exist
//           }

//           // Now, update the product fields
//           const updatedProduct = {
//             name: item.Description.Short || productExistence.name,
//             description:
//               item.Description.Standard || productExistence.description,
//             price: item.Price || productExistence.price,
//             category: categoryId._id,
//             batch: batch,
//           };

//           // Add the updated product to the list
//           updatedProducts.push({
//             updateOne: {
//               filter: { plu: item.Id }, // filter by PLU
//               update: updatedProduct, // fields to update
//             },
//           });
//         })
//       );

//       // If there are any updates to be applied, perform the bulk update
//       if (updatedProducts.length > 0) {
//         await productModel.bulkWrite(updatedProducts);
//         res.status(200).send({
//           success: true,
//           message: "Products updated successfully",
//         });
//       } else {
//         res.status(404).send({
//           success: false,
//           message: "No products were updated.",
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error in updateProducts:", error.message);
//     console.error("Stack trace:", error.stack);

//     res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message, // Send only error message
//     });
//   }
// };

// export const postVoucher = async (req, res) => {
//   const apiKey;
//   try {
//     const current_date = new Date();
//     const { vId, member, barcode } = req.body;
//     const apiValidation = await apiModel.findOne().sort({ _id: -1 });
//     const timeStamp = new Date(apiValidation.createdAt);
//     const timeDifference = (current_date - timeStamp) / 3600000;

//     if (timeDifference > 10) {
//       await getAPIkeyController(req, res);
//     } else {
//       const apiCheck = await apiModel.findOne().sort({ _id: -1 });
//        apiKey = apiCheck.apiKey;
//     }

//     // const postToSwiftPOS = await axios.post(
//     //   `https://api.swiftpos.com.au/api/Voucher?voucherId=${vId}&Id=${member}&barcode=${barcode}`,
//     //   {
//     //     headers: {
//     //       "Content-type": "application/json",
//     //       accept: "application/json",
//     //       AuthorizationToken: apiKey,
//     //     },
//     //   }
//     // );
//     const postToSwiftPOS = await axios.post(
//       `https://api.swiftpos.com.au/api/Voucher/`,
//       null, // If no body is needed
//       {
//         params: {
//           voucherId: vId,
//           Id: member,
//           barcode: barcode,
//         },
//         headers: {
//           "Content-type": "application/json",
//           accept: "application/json",
//           AuthorizationToken: apiKey, // Assuming 'AuthorizationToken' is correct
//         },
//       }
//     );
//     console.log(postToSwiftPOS);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const postVoucher = async (req, res) => {
//   const current_date = new Date();
//   let apiKey; // Declare apiKey outside
//   try {
//     const apiValidation = await apiModel.findOne().sort({ _id: -1 });
//     const timeStamp = new Date(apiValidation.createdAt);
//     const timeDifference = (current_date - timeStamp) / 3600000;

//     if (timeDifference > 10) {
//       // If API key is expired, fetch a new one
//       await getAPIkeyController(req, res);
//       const newApiCheck = await apiModel.findOne().sort({ _id: -1 });
//       apiKey = newApiCheck.apiKey; // Ensure apiKey is assigned after fetching
//     } else {
//       // If the key is still valid, use it
//       const apiCheck = await apiModel.findOne().sort({ _id: -1 });
//       apiKey = apiCheck.apiKey;
//     } // Assign the valid API key
//     console.log(apiKey);
//     const vid = 2;
//     const mid = 10;
//     // Post to SwiftPOS
//     const postToSwiftPOS = await axios.post(
//       `https://api.swiftpos.com.au/api/Voucher/voucherId=${vid}&id=${mid}`,
//       {}, // No body, use params

//       // params: {
//       //   voucherId: vId,
//       //   Id: member,
//       //   barcode: barcode,
//       // },
//       {
//         headers: {
//           "Content-type": "application/json",
//           accept: "application/json",
//           AuthorizationToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjo3NDk4MTEzNSwiY2xpZW50SWQiOjY3MTc1MywiY2xlcmtJZCI6MCwic2lnbmF0dXJlIjoiTVNMIHN1cHBvcnQiLCJuYmYiOjE3MzQ1NjMyMzQsImV4cCI6MTczNDYwNjQzNCwiaWF0IjoxNzM0NTYzMjM0LCJpc3MiOiJTd2lmdFBPU0Nsb3VkIiwiYXVkIjoiU3dpZnRQT1NDbG91ZCJ9.5LNue4-XR7RuJY_WvXGcBVw5ZCO_Cjf-Xq8Y6WFWVo0`,
//         },
//       }
//     );

//     console.log(postToSwiftPOS.data); // Log the response data
//     res.status(200).json(postToSwiftPOS.data); // Respond with data from SwiftPOS
//   } catch (error) {
//     console.error(error); // Log the error
//     console.error("Error Response:", error.response?.data || error.message);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request." }); // Respond with an error message
//   }
// };

export const postVoucher = async (req, res) => {
  const current_date = new Date();
  try {
    const { vId, mId, barcode } = req.body;
    // const vId = 2;
    // const mId = 10;
    // const barcode = 234578934567834;
    const apiValidation = await apiModel.findOne().sort({ _id: -1 });
    const timeStamp = new Date(apiValidation.createdAt);
    const timeDifference = (current_date - timeStamp) / 3600000;

    if (timeDifference > 10) {
      await getAPIkeyController(req, res);
    } else {
      const apiCheck = await apiModel.findOne().sort({ _id: -1 });
      const apiKey = apiCheck.apiKey;
      const { data } = await axios.post(
        `https://api.swiftpos.com.au/api/Voucher?voucherId=${vId}&id=${mId}&barcode=${barcode}`,
        {}, // No data body needed for this request
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            AuthorizationToken: apiKey, // Token in Authorization header
          },
        }
      );

      res.status(201).send({
        message: `Voucher with Barcode: ${barcode} for member ${mId} succesffuly created`,
        data,
      });
      const saveVoucher = new Vouchers({
        id: vId,
        barcode: barcode,
        member: mId,
      });

      await saveVoucher.save();
      // res.status(201).send({
      //   success: true,
      //   message: "Voucher stored in Daddys ecomm",
      //   saveVoucher,
      // });
    }
  } catch (error) {
    console.error("Error occurred:", error.response?.data || error.message);
    res.status(500).send({
      message: "Error occurred",
      error: error.response?.data || error.message,
    });
  }
};

export const getVoucher = async (req, res) => {
  try {
    const voucher = await Vouchers.find().sort({ _id: -1 }).limit(1);
    res.status(200).send({
      success: true,
      message: "Voucher retrieved successfully",
      voucher,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVouchers = async (req, res) => {
  try {
    const voucher = await Vouchers.find().sort({ _id: -1 });
    res.status(200).send({
      success: true,
      message: "Voucher retrieved successfully",
      voucher,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVouchers = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVoucher = await Vouchers.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Voucher deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
