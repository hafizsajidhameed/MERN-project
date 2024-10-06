import express from "express";

import { deleteProduct, createProduct, updateProduct, getProductById, getProductByName } from "../controller/product.controller.js";

const router = express.Router();

// router.get('/',getProduct)

//get product by id

router.get('/:id', getProductById)

 //create New Product
 router.post('/', createProduct);

// update single product
router.put('/:id', updateProduct);

// delete product
router.delete('/:id', deleteProduct)

//get product by name
router.get('/', getProductByName)

        export default router; 