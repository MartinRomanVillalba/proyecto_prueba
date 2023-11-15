const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const mainRoutes = require('./routes/main');
const productsRouter = require('./routes/products');


app.use('/', mainRoutes)
app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

module.exports = app