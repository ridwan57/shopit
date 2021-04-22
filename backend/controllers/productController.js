import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { APIFeatures } from '../utils/apiFeatures';
import ErrorHandler from '../utils/errorHandler';

const Product = require('../models/Product');

export const createProduct = catchAsyncErrors(async (req, res) => {
  console.log('req:', req.body);
  req.body.user = req.user.id;
  try {
    const product = await new Product(req.body).save();
    console.log('product console:', product);
    res.status(201).send(product);
  } catch (error) {
    console.log('error:', error);
    // console.log(error);
  }
});

export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const allProducts = await apiFeature.query;
  // console.log('allProducts:', allProducts);
  res.send({ count: allProducts.length, products: allProducts });
});

export const getProductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.send(product);
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
    // res.send({ error: error.message });
  }
});

export const updateProductById = catchAsyncErrors(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    console.log('product:', product);

    if (product) {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).send(product);
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

export const deleteProductById = catchAsyncErrors(async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    console.log('deleted product:', product);

    res.status(200).send(product);
  } catch (error) {
    res.send({ error: error.message });
  }
});
