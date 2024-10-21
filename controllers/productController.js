import categoryModel from "../database/categoryModel.js";
import productModel from "../database/productModel.js";
import path from "path";

export const postProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    // Handle image file
    let imageUrl = null;
    if (req.file) {
      // Store the image path (use the filename)
      imageUrl = `uploads/${req.file.filename}`;
    }
    // console.log("File " + req.file);
    // const categoryId = await categoryModel.findById(category);
    // if (!category) {
    //   res.status(404).send({
    //     success: false,
    //     message: "Category doesnt exist",
    //   });
    // } else {
    const product = new productModel({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });
    await product.save();
    res.status(201).send({
      success: true,
      message:
        "Congratulations successfull people has uploaded successfull product ",
    });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getProduct = async (req, res) => {};
