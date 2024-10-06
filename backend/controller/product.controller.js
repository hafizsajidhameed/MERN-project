import mongoose from "mongoose";
import Product from "../models/product.model.js";


// export const getProduct =  async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json({success: true, message: 'Products fetched', products})
//     } catch {
//         res.status(500).json({success: false, message: 'Server Error'})
//     }
// }//

export const getProductById = async ( req, res) => {
    const { id } = req.params;
    const productId = await Product.findById(id);
    try {
        res.json({ success: true, message: 'Product fetched', product: productId})
    
    } catch (error) {
        res.status(404).json({success: false, message: 'Invalid ID'})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send data
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'please provide all fields'})
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({success: true, message: 'product created', product: newProduct, data: newProduct})
    } catch {
        console.log("Error in create produc:", error.message)
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productUpdates = req.body; // Renamed variable for clarity

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }

    try {
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, { new: true });

        // If product not found, send 404
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Send the updated product as a response
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("Error in updating product:", error.message);

        // Send a server error response
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const deleteProduct =  async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted', product})
    } catch {
        res.status(404).json({success: false, message: 'Product not found'})

    }
}

//---/api/products--- will show all products
//---/api/products?name=product--- will show searched product

export const getProductByName = async (req, res) => {
    const { name } = req.query; // Get the product name from the query parameter

    try {
        let products;

        if (name) {
            // If name is provided, find product by name
            products = await Product.findOne({ name: new RegExp(name, 'i') }); // Case-insensitive search
        } else {
            // If no name is provided, return all products
            products = await Product.find();
        }

        // If the product is not found, return 404
        if (!products || (Array.isArray(products) && products.length === 0)) {
            return res.status(404).json({ success: false, message: 'Product(s) not found' });
        }

        // If products are found, return them
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching product(s):", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};