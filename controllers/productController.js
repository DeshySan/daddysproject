import categoryModel from "../database/categoryModel.js";
import productModel from "../database/productModel.js";
import fs from "fs";

const slugs = (name) => {
  return name.replace(/\s+/g, "-").toLowerCase();
};
export const postProduct = async (req, res) => {
  try {
    const { name, description, price, category, slug, plu } = req.body;
    console.log(`Name being passed` + name);
    // Handle image file
    let imageUrl = null;
    if (req.file) {
      // Store the image path (use the filename)
      imageUrl = `uploads/${req.file.filename}`;
    }

    const categoryId = await categoryModel.findById(category);
    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category doesnt exist",
      });
    } else {
      //validation
      const existingProduct = await productModel.findOne({ name });
      if (existingProduct) {
        res.status(400).send({
          success: false,
          message: "Product Already Exists",
        });
        console.log(slugs(name));
      } else {
        const product = new productModel({
          name,
          description,
          price,
          category: categoryId,
          image: imageUrl,
          plu,
          slug: slugs(name),
        });
        await product.save();
        res.status(201).send({
          success: true,
          message:
            "Congratulations successfull people has uploaded successfull product ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const getProducts = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "Retrieving all products succesfully",
      getProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    //validation
    const chosenProduct = await productModel.findById(id);
    if (!chosenProduct) {
      res.status(200).send({
        success: false,
        message: "The Product doesnt seem to existing on our database",
      });
    } else {
      //This is a magical part which deletes the image from the folder /uploads
      if (chosenProduct.image) {
        const imagePath = chosenProduct.image;
        fs.unlink(imagePath, (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: "SOmething went wrong while deleting the image",
            });
          }
        });
      }
      const deleteProduct = await productModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Product has been deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    //validation
    const productValidate = await productModel.findById(id);
    if (!productValidate) {
      res.status(400).send({
        success: false,
        message: "Validation Wrong",
      });
    }
    console.log(name, description, price, category);
    console.log(req.body);
    //replace display image
    let updatedImagePath = productValidate.image;
    if (req.file) {
      const oldImagePath = productValidate.image;
      if (oldImagePath) {
        fs.unlinkSync(oldImagePath);
      }
      updatedImagePath = req.file.path;
    }
    //Update

    await productModel.findByIdAndUpdate(id, {
      name,
      description,
      category,
      price,
      image: updatedImagePath,
    });
    res.status(200).send({
      success: false,
      message: "Product has been successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getProducts = await productModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Retirved successfully",
      getProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await productModel
      .find({
        name: { $regex: query, $options: "i" },
      })
      .sort({ name: 1 });
    res.status(200).send({
      success: true,
      message: "Retrieving Products successfully",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};
