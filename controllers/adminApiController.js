import express from "express";
import axios from "axios";
import apiModel from "../database/apiModel.js";
import categoryModel from "../database/categoryModel.js";
import productModel from "../database/productModel.js";

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
      const familyId = req.body;
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
