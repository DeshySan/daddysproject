import JWT from "jsonwebtoken";
import memberModel from "../database/memberModel";

export const memberSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token", success: false });
  }
};
