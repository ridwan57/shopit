import express from 'express';

import {
  createProduct,
  getProductById,
  getProducts,
  updateProductById,
  deleteProductById,
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

module.exports = router;
