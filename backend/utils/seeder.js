import Product from "../models/Product";
import products from "../data/products";

const { connectDatabase } = require("../config/database");
require("dotenv").config();
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
