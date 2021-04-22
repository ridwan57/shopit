import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/database";
import errorMiddleware from "./middlewares/errors";

require("dotenv").config();
process.on("uncaughtException", (err) => {
  // console.log("uncaughtException: ", err);
  console.log("errorStack: ", err.stack);
  console.log("Shutting down");
  process.exit(1);
});

const morgan = require("morgan");
connectDatabase();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const server = app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is running on port 8000`)
);
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
app.use(errorMiddleware);
