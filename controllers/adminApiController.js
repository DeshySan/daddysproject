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
