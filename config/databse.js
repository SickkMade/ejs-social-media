const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_STRING)

        console.log("Mongoose Connected... HONK!")
    } catch (e){
        console.error(e);
        process.exit(1)
    }
}

module.exports = connectDB;