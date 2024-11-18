import express from "express";

import Family from "../database/family.js";

const generateSlug = (name) => {
  return name.replace(/\s+/g, "-").toLowerCase(); // Basic slugify function
};
export const postFamily = async (req, res) => {
  try {
    const { name, productId } = req.body;
    const lastFamily = await Family.findOne().sort({ id: -1 });
    const newId = lastFamily ? lastFamily.id + 1 : 1;
    const slug = generateSlug(name);

    //for image
    let imageUrl = null;
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }
    const family = new Family({
      id: newId,
      name,
      productId,
      slug,
      image: imageUrl,
    });

    await family.save();
    res.status(201).send({
      success: true,
      message: "A new Family has been successfully created",
      family,
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

export const getFamily = async (req, res) => {
  try {
    const family = await Family.find({});
    res.status(200).send({
      success: true,
      message: "All Families have been retrieved",
      family,
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

//the bug in this code is, it will not update the slug and I have removed name as well
export const updateFamily = async (req, res) => {
  try {
    const { productId } = req.body;
    const { id } = req.params;

    // Ensure id is passed correctly and query by _id or the field you're using as an ID
    const family = await Family.findOneAndUpdate(
      { _id: id }, // Correct filter criteria
      { productId },
      { new: true }
    );

    if (!family) {
      return res.status(404).send({
        success: false,
        message: "Family not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Family has been updated successfully",
      family,
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

export const getFamilyProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const getProducts = await Family.findById(id);
    res.status(200).send({
      success: true,
      getProducts,
      message: "Products retrieved",
    });
  } catch (error) {
    console.log(error);
  }
};
