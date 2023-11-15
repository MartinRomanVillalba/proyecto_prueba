const controller = {
    index(req, res){
        res.render('index')
    },
    cart(req,res){
        res.render('products/productCart')
    }
}

module.exports = controller;