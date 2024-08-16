const User = require("../models/User.js");
const validator = require("validator");
const passport = require('passport')

exports.getLogin = (req, res) => {
    res.render('login.ejs')
},
exports.getSignup = (req, res) => {
    res.render("signup.ejs")
},
exports.logOut = (req, res, next) => {
    req.logOut((err) => {
        if(err) return next(err)
        return res.redirect('/')
    })
}
exports.postLogin = (req, res, next) => {
    
    const validationErrors = [];
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({
            msg: "please enter a correct email address"
        })
    }
    if(validator.isEmpty(req.body.password)){
        validationErrors.push({
            msg: "please enter a password"
        })
    }
    if(validationErrors.length){
        req.flash("errors", validationErrors)
        res.redirect('../login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    })
    passport.authenticate('local', (error, user, info) => {
        if(error){
            return next(error)
        }
        if(!user){
            req.flash('errors', info)
            return res.redirect('../login')
        }
        req.logIn(user, (error) => {
            if(error){
                return next(error)
            }
            return res.redirect('/profile')
        })

    })(req, res, next)

},
exports.postSignup = async (req, res, next) => {

    //first i check if the username and name are unique
    //then i check password is > 8 and passwords match
    //if any of these fail i redirect and flash the errors
    const validationErrors = [];
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({msg: "Please enter a valid email address."})
    }
    if(!validator.isLength(req.body.password, {min: 8})){
        validationErrors.push({ msg: "password must be longer than 8 characters"})
    }
    if(req.body.password !== req.body.confirmPassword){
        validationErrors.push({msg: "passwords must match"})
    }
    if(validationErrors.length){
        req.flash("errors", validationErrors);
        return res.redirect("../signup")
    }

    //i then normalize the email so future checks will work correctly
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    })

    //i create a new user with the given signup info
    const user = new User({
        userName: req.body.userName,
        email:req.body.email,
        password:req.body.password,
    })

    //then i check if another account has the same email or username
    //if not then i save to the model, then redirect the user to their profile
    try{
        const existingUser = await User.findOne({$or:[{email: req.body.email}, {userName:req.body.userName}]})
        if(existingUser){
            req.flash('errors', { msg: "a user with that username or email alread exist"})
            return res.redirect("../signup")
        }
        else{
            await user.save()
            await req.logIn(user, () => {
            res.redirect('/profile')
        })
        }
    }
    catch(err){
        return next(err);
    }
}