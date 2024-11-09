import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";
import memberRoute from "./routes/memberRoute.js";
import connectDB from "./database/db.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();

//database
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Static Folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Need to pass the port in the environment.
//Sandyman will  do bit later
const PORT = 1234;

//let's run this project at the Port 1234 below to listen request at 1234
app.listen(PORT, () => {
  console.log(`Running on Port  ${PORT}`);
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome mate",
  });
});

//setting up session
app.use(
  session({
    secret: process.env.JWT_SECRET, // Replace with a secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true, // Don't allow JavaScript access to the cookie
    },
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/daddy" }), // Store sessions in MongoDB
  })
);

// Middleware to log the session status (for debugging)
app.use((req, res, next) => {
  console.log("Session:", req.session);
  next();
});

//Below routes only
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/member", memberRoute);
