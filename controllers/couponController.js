import Coupon from "../database/coupon.js";
import express from "express";

export const postCoupon = async (req, res) => {
  try {
    const { name, code, value, startDate, endDate } = req.body;
    if (
      name.length === 0 &&
      code.length === 0 &&
      value === 0 &&
      !startDate &&
      !endDate
    ) {
      res.status(404).send({
        success: false,
        message: "Something went wrong int he provcided valeus",
      });
    }

    const newStartDate = new Date(startDate);
    newStartDate.setHours(0, 0, 0, 0);
    const newEndDate = new Date(endDate);
    newEndDate.setHours(0, 0, 0, 0);
    const coupon = await Coupon({
      name,
      code,
      value,
      startDate: newStartDate,
      endDate: newEndDate,
    });
    await coupon.save();
    res.status(201).send({
      success: true,
      message: "created successfully",
      coupon,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find({});
    res.status(200).send({
      success: true,
      message: "All Coupon retrieved",
      coupon,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { name, value, code, startDate, endDate, active } = req.body;
    const { _id } = req.params;
    const coupon = await Coupon.findByIdAndUpdate(
      _id,
      {
        name,
        value,
        code,
        startDate,
        endDate,
        active,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Coupon has been updated properly",
      coupon,
    });
  } catch (error) {
    console.log(error);
  }
};
