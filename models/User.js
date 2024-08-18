const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true },
    email: { type:String, unique: true},
    password: String
});

// HASH THESE PASSWORDS

userSchema.pre("save", function(next){
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

userSchema.methods.comparePassword = function(canidatePassword, cb){
    bcrypt.compare(canidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}




module.exports = mongoose.model("User", userSchema);