import express from 'express';

import {
  createProduct,
  getProductById,
  getProducts,
  updateProductById,
  deleteProductById,
  createProductReview,
  deleteReview,
  getProductReviews,
} from '../controllers/productController';

import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post(
  '/admin/product/new',
  isAuthenticatedUser,
  authorizeRoles('admin', 'user'),
  createProduct
);
router.put(
  '/admin/product/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'user'),
  updateProductById
);
router.delete(
  '/admin/product/:id',
  isAuthenticatedUser,
  authorizeRoles('admin', 'user'),
  deleteProductById
);
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/reviews', getProductReviews);
router.delete('/reviews', isAuthenticatedUser, deleteReview);

module.exports = router;
