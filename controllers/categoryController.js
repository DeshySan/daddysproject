import express from "express";
import categoryModel from "../database/categoryModel.js";
import mongoose from "mongoose";
const sluggy = (name) => {
  return name.replace(/\s/g, "-").toLowerCase();
};
export const getCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = await categoryModel.find({}).skip(skip).limit(limit);
    const total = await categoryModel.countDocuments();
    res.status(200).send({
      success: true,
      message: "Successfully retrieiving categories",
      category,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server Error",
      error,
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID format",
      });
    }

    // Find the category by the provided ID
    const getCategory = await categoryModel.findById(id);

    if (!getCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Category has been retrieved successfully",
        getCategory,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

// export const getSingleCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const getCategory = await categoryModel.findById(id);
//     if (!getCategory) {
//       res.status(404).send({
//         success: false,
//         message: "Category not found",
//       });
//     } else {
//       res.status(200).send({
//         success: true,
//         message: `Category  has been retrieved successfully`,
//         getCategory,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Internal server error",
//     });
//   }
// };

export const slugCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const getCategory = await categoryModel.findOne({ slug });
    if (!getCategory) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: `Category  has been retrieved successfully`,
        getCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};
export const postCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    //validations
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(404).send({
        success: false,
        message: "Category Name must be unique",
      });
    } else {
      const category = new categoryModel({
        name,
        slug: sluggy(name),
      });
      await category.save();
      res.status(201).send({
        success: true,
        message: "Category has been successfully created",
        category,
      });
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

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    //validations;
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(404).send({
        success: false,
        message: "Category name already exists",
      });
    } else {
      const category = await categoryModel.findByIdAndUpdate(
        id,
        {
          name,
          slug: sluggy(name),
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Category is updated successfully",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messgae: "Internal server error",
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryExist = await categoryModel.findById(id);
    if (!categoryExist) {
      res.status(400).send({
        success: false,
        message: `Category  doesnt exist`,
      });
    } else {
      const category = await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: `Category ${category.name} has been deleted successfully`,
      });
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
