const validator = require("validator");
const User = require("../models/User");

module.exports = {
    getIndex:(req, res) => {
        res.render('index.ejs')
    },
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getSignup: (req, res) => {
        res.render("signup.ejs")
    },
    postLogin: (req, res) => {
        
    },
    postSignup: (req, res) => {
        const validationErrors = [];
        if(!validator.isEmail(req.body.email)){
            validationErrors.push({msg: "Please enter a valid email address."})
        }
        if(validator.isLength(req.body.password, {min: 8})){
            validationErrors.push({ msg: "password cannot be empty"})
        }
        if(req.body.password !== req.body.confirmPassword){
            validationErrors.push({msg: "passwords must match"})
        }
        if(validationErrors.length){
            req.flash("errors", validationErrors);
            return res.redirect("../signup")
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        })

        const user = new User({
            userName: req.body.userName,
            email:req.body.email,
            password:req.body.password,
        })
    }
}