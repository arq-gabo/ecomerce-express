const express = require('express');
const path = require("path");
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

// App
const app = express();

// Global Middlewares
app.use(express.json())

// Static Files
app.use("/static", express.static(path.join(__dirname, "public")))

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter)

// Redirect
app.get('/', function(req, res){
    res.redirect('/products')
});

// Serve
const server = app.listen(8000, function() {
    console.log(`Escuchando en el puerto ${server.address().port}`)
});