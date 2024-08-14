const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true },
    email: { type:String, unique: true},
    password: String
});

// HASH THESE PASSWORDS

userSchema.pre("save", next => {
    const user = this;

    //all middleware needs to call next() or call upon a res
    if(!user.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})




module.exports = mongoose.model("User", userSchema);