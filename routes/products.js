const express = require("express");
const router = express.Router();

const products = [
    {
        name: "Red Shores",
        price: 75
    },
    {
        name: "Black Bike",
        price: 300
    }
]

router.get('/', function(req, res){
    res.render("products", { products })
});

module.exports = router;