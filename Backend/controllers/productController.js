const Product = require('../models/productModel');

// Create Product API (already present)
exports.createProduct = async (req, res) => {
    try {
        const { name, price, category, discountPercentage, stock, description } = req.body;
        const image = req.file.path;
        const product = await Product.create({ name, price, category, discountPercentage, stock, image, description });

        if (product) {
            res.status(200).json({ message: 'success', product });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get Product API (already present)
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find().populate('category');
        if (product) {
            res.status(200).json({ product });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Delete Product API (newly added)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Update Product API (newly added)
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, category, discountPercentage, stock, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, discountPercentage, stock, description, image: req.file?.path },
            { new: true }
        );
        
        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
