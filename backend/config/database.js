import mongoose from "mongoose";

export const connectDatabase = () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database: ", err));
