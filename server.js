const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override");
const flash = require('express-flash')
const logger = require("morgan");
const connectDB = require('./config/databse.js')
let mainRoutes = require('./routers/mainRoutes')
let postRoutes = require('./routers/postRoutes.js')

require("dotenv").config({path: "./config/.env"})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB();

app.use(logger("dev"))

app.use(methodOverride('_method'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
}))

//passport config
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use("/", mainRoutes)
app.use("/post", postRoutes)

app.listen(process.env.PORT, () => {
    console.log("server is :runningemoji:")
})