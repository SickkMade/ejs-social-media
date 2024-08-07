const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override");
const flash = require('express-flash')
const logger = require("morgan");
const connectDB = require('./config/database')

require("dotenv").config({path: "./config/.env"})

app.set('view engine', 'ejs')
app.use(app.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB();

app.use(logger("dev"))

app.use(methodOverride('_method'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection })
}))

//passport config
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.listen(process.env.PORT, () => {
    console.log("server is :runningemoji:")
})