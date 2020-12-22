const express = require("express");
const passport = require("passport");
const ProductsService = require("../../services/products");

const cacheResponse = require("../../utils/cacheResponse");
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require("../../utils/time");

// JWT Strategie
require("../../utils/auth/strategies/jwt");

const validation = require("../../utils/middlewares/validationHandler");

const { productIdSchema, 
        productTagSchema, 
        createProductSchema, 
        updateProductSchema } = require('../../utils/schemas/products')

function productsApi(app){
    const router = express.Router()

    app.use("/api/products", router)
    
    const productService = new ProductsService();
    
    router.get('/', async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS)

        const { tags } = req.query;
    
        try {
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
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

        const { productId } = req.params
    
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
    
    router.post('/', validation(createProductSchema), async function(req, res, next) {
        const { body: product } = req;
        
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
    
    router.put('/:productId',
        passport.authenticate("jwt", { session: false }),
        validation(productIdSchema, "params"),
        validation(updateProductSchema), 
        async function(req, res, next) {
            const { productId } = req.params
            const { body: product } = req
            try{
                const updateProduct = await productService.updateProduct({ productId, product })
        
                res.status(200).json({
                data: updateProduct,
                message: 'product updated'
            })
        } catch(err) {
            next(err)
        }
    })
    
    router.delete('/:productId',
        passport.authenticate("jwt", { session: false }),
        async function(req, res, next) {
        const { productId } = req.params;
            
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
}

module.exports = productsApi;