module.exports = {
    getIndex:(req, res) => {
        res.render('index.ejs')
    },
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getSignup: (req, res) => {
        res.render("signup.ejs")
    }
}