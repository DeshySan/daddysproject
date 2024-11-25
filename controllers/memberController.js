import MemberCounter from "../database/memberCounter.js";
import memberModel from "../database/memberModel.js";
import mongoose, { mongo } from "mongoose";
import { hashPassword } from "./helpers/passwordHelper.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import session from "express-session";
import { sendConfirmationEmail } from "./helpers/sendEmail.js";
const getMemberNumber = async () => {
  try {
    const counter = await MemberCounter.findOneAndUpdate(
      {
        name: "member_number",
      },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return counter.value;
  } catch (error) {
    console.log(error);
  }
};

export const postMember = async (req, res) => {
  try {
    const { fullName, email, password, mobile, classification } = req.body;

    //I think I will make password non unique and classification not required in the future
    // // Drop the unique index on the mobile field
    // async function dropMobileIndex() {
    //   try {
    //     await mongoose.connection.db
    //       .collection("members")
    //       .dropIndex("mobile_1");
    //     console.log("Mobile unique index dropped successfully.");
    //   } catch (error) {
    //     console.error("Error dropping the mobile index:", error);
    //   }
    // }

    // // Call the function to drop the index
    // dropMobileIndex();
    //validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(404).send({
        message: "Please provide Valid email address",
        success: false,
        error,
      });
    }

    //validate full name
    // 1. Validate fullName
    if (!fullName || typeof fullName !== "string" || fullName.length < 3) {
      const namePattern = /^[A-Za-z]+ [A-Za-z]+$/;
      if (!namePattern.test(fullName)) {
        return res.status(404).send({
          message:
            "Unless you have Indonesian ID, please supply with first name and last name",
          success: false,
          error,
        });
      } else {
        return res.status(404).send({
          message:
            "Full Name should be Valid and must contain at least 3 letters",
          success: false,
          error,
        });
      }
    }
    const memberNumber = await getMemberNumber();
    const hashedPassword = await hashPassword(password);

    const member = new memberModel({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      memberId: memberNumber,
      classification,
    });

    await member.save();

    const confirmationToken = JWT.sign(
      { email: member.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await sendConfirmationEmail(member.email, confirmationToken);
    res.status(200).send({
      success: true,
      message: "Saved Member in the DB",
      member,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await memberModel.find({});
    res.status(200).send({
      success: true,
      message: "All members are coming",
      members,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await memberModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        messgae: "User cannot be found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message:
          "user is not authorised to access this resource with explicit deny",
      });
    }

    //Generating a JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (user && match) {
    }
    req.session.userId = user._id;
    req.session.isAuthenticated = true;

    return res.status(200).send({
      success: true,
      message: "Logging the member successfully",
      user,
      token,
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

export const destroySession = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(403)
          .send({ messgae: "Failed to Logout unfortunately" });
      } else {
        return res
          .status(200)
          .send({ message: "Session destroyed successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Internal server error",
    });
  }
};
