import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import categoryRoutes from "./routes/categoryRoutes.js";
import connectDB from "./database/db.js";
dotenv.config();
const app = express();

//database
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

app.use("/api/v1/category", categoryRoutes);
