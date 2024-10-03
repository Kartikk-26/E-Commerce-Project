const express = require('express');
const router = express.Router();

const productController = require('./../controllers/productController');
const upload = require('./../middleware/upload');

const product = require('./../middleware/protect')
const admin = require('./../middleware/admin')

router.post('/addProduct', upload.single('image'), productController.createProduct);
router.get('/getproducts', productController.getProduct);

// New routes added for delete and update functionalities
router.delete('/deleteProduct/:id', productController.deleteProduct);  // Delete product by ID
router.put('/updateProduct/:id', upload.single('image'), productController.updateProduct);  // Update product by ID

module.exports = router;
