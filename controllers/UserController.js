const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

class UserController {

    // Registration Form
    static async registerForm(req, res) {
        try {
            let errorMessage = [];
            console.log(req.query.error)
            if(req.query.error) {
                errorMessage = req.query.error.split(',')
            }
            // console.log(errorMessage);
            // res.send(errorMessage);
            res.render('auth-pages/register-form', {errorMessage})
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    }

    // Processing user registration
    static async postRegister(req, res) {
        try {
            const {email, password, role} = req.body
            const newUser = await User.create({email, password, role}) 
            // res.send("test")
            if(newUser.role === "Admin") {
                res.redirect('/admin')
            } else {
                res.redirect('/createProfile');
            }
        } catch (error) {
            // res.send(error)
            // console.log(error)
            if(error.name === "SequelizeValidationError") {
                let errorMessage = [];
                error.errors.forEach(element => {
                    errorMessage.push(element.message);
                })
            res.redirect(`/register?error=${errorMessage}`)
            }
            
        }
    }

    // Login form
    static async loginForm(req, res) {
        try {
            const {error} = req.query;
            res.render('auth-pages/login-form',{error})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    // Login process (validating user email and password)
    static async postLogin(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({
                where: {email}
            })
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    if(user.role === "Admin") {
                        req.session.userId = user.id;
                        return res.redirect('/admin')
                    } else if(user.role === "User") {
                        req.session.userId = user.id;
                        // res.send("test")
                        return res.redirect('/')
                    }
                } else {
                    const error = "Invalid email or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async landingPage(req, res) {
        try {
            res.render('landing-page/landingPage')
        } catch(error) {
            res.send(error);
            console.log(error);
        }
    }

    static async logout(req, res) {
        try {

        } catch(error) {
            res.send(error);
            console.log(error);
        }
    }
}

module.exports = UserController