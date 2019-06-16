const { Router } = require('express');
const Product = require('../models/Product');

const router = Router();

/**
 * Get all products from database
 */
router.get('/', async (req, res) => {
    const products = await Product.find().sort('sorting');
    res.render('index', { products });
});

/**
 * Route to add product
 */
router.post('/add-product', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/');
});

/**
 * Route to receive the products ordered and save it in database
 */
router.post('/products/ordering', async (req, res) => {
    const ids = req.body['id[]'];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const product = await Product.findById(id);
        product.sorting = i;
        await product.save();
    }

    res.send('ordered');
});

module.exports = router;
