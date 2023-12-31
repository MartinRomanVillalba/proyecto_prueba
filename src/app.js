const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'Esto es un secreto'
}))

app.use(cookieParser())
app.use(userLoggedMiddleware)
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const mainRoutes = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');


app.use('/', mainRoutes)
app.use('/products', productsRouter);
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

module.exports = app