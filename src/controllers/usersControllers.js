const controller = {
    registerGet(req, res){
        res.render('users/register')
    },
    loginGet(req, res){
        res.render('users/login')
    }
}

module.exports = controller;