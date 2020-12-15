const express = require("express")
const router = express.Router()
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get('/', async function(req, res, next) {
    const { tags } = req.query;
    console.log('req', req.query);

    try {
        throw new Error('This is an error from the API')
        const getproducts = await productService.getProducts({ tags })
    
        res.status(200).json({
            data: getproducts,
            message: 'products listed'
        })
    } catch(err){
        next(err);
    }

})

router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params
    console.log('req', req.params)

    try{
        const getproduct = await productService.getProduct({ productId })
    
        res.status(200).json({
            data: getproduct,
            message: 'products retrieved'
        })
    } catch(err){
        next(err)
    }
})

router.post('/', async function(req, res, next) {
    const { body: product } = req;
    console.log('req', req.body)

    try {
        const createproduct = await productService.createProduct({ product })
    
        res.status(201).json({
            data: createproduct,
            message: 'products created'
        })
    } catch(err){
        next(err)
    }
})

router.put('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
    console.log('req', req.params, req.body )

    try{
        const updateproduct = await productService.updateProduct({ productId, product })
    
        res.status(200).json({
            data: updateproduct,
            message: 'products Updated'
        })
    } catch(err){
        next(err)
    }
})

router.delete('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    console.log(req.params)

    try{
        const deleteproduct = await productService.deleteProduct({ productId })
    
        res.status(200).json({
            data: deleteproduct,
            message: 'products deleted'
        })
    } catch(err){
        next(err)
    }
})

module.exports = router;