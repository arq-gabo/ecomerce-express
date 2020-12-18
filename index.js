const express = require('express');
const path = require("path");
const boom = require("boom");
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require("./routes/api/auth");
const { logErrors,
        wrapErrors,
        clientErrorHandler,
        errorHandler} = require('./utils/middlewares/errorsHandlers');

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

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
app.use("/api/auth", authApiRouter);

// Redirect
app.get('/', function(req, res){
    res.redirect('/products')
});

app.use(function(req, res, next) {
    if(isRequestAjaxOrApi(req)){
        const {
            output: { statusCode, payload }
        } = boom.notFound()

        res.status(statusCode).json(payload)
    }

    res.status(404).render("404");
});

// Error handlers
app.use(wrapErrors)
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Serve
const server = app.listen(8000, function() {
    console.log(`Escuchando en el puerto ${server.address().port}`)
});