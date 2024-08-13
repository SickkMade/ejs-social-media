const validator = require("validator");

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
        if(validator.isEmpty(req.body.password)){
            validationErrors.push({ msg: "password cannot be empty"})
        }
        if(validationErrors.length){
            req.flash("errors", validationErrors);
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        })
    }
}