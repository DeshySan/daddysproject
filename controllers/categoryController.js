import express from "express";
import categoryModel from "../database/categoryModel.js";
const sluggy = (name) => {
  return name.replace(/\s/g, "-");
};
export const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({});
    res.status(200).send({
      success: true,
      message: "Successfully retrieiving categories",
      category,
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
