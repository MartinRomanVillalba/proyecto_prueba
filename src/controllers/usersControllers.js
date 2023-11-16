const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const { get } = require('http');
const path = require('path');


const User = require('../models/User');
// const usersDataFilePath = path.join(__dirname, '../data/users.json')
// function getUsers(){
//     return JSON.parse(fs.readFileSync(usersDataFilePath, 'utf-8'))
// }

const controller = {
    // index(req, res){
    //     if(req.session.user){
    //         return res.redirect('users/profile')
    //     }
    //     return res.render('index')
    // },
    register(req, res){
        res.render('users/register')
    },
    processRegister(req, res){
        // const users = getUsers();
        // const user = {
        //     id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
        //     ...req.body,
        //     password: bcrypt.hashSync(req.body.password, 10)
        // }
        // users.push(user)
        // fs.writeFileSync(usersDataFilePath, JSON.stringify(users, null, 4))
        // return res.redirect('/')
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDb = User.findByField('email', req.body.email);

        if(userInDb){
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate)

        return res.redirect('users/login')
    },
    login(req, res){
        return res.render('users/login')
        // const users = getUsers()
        // const user = users.find((element) => element.email === req.body.email)
        // const errors = {
        //     unauthorized: {
        //         msg: 'Usuario y/o contraseña inválidos'
        //     }
        // }
        // if(!user){
        //     return res.render('index', {errors})
        // }
        // if(!bcrypt.compareSync(req.body.password, user.password)){
        //     return res.render('index', {errors})
        // }
        // req.session.user = {
        //     timestamp: Date.now(),
        //     id: user.id,
        //     fillName: user.fullName,
        //     email: user.email,
        //     avatar: user.avatar
        // }
        // res.cookie('fullName', req.body.fullName)
    },
    loginProcess(req, res){
        let userToLogin = User.findByField('email', req.body.email);
        
        if(userToLogin){
            let isOkThePassWord = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(isOkThePassWord){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
                }

                return res.redirect('/profile')
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }

        return res.render('users/login',{
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    profile(req, res){
        return res.render('users/profile', {
            user: req.session.userLogged  
        });
    },
    logout(req, res){
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = controller;