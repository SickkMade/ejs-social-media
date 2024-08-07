const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Mongoose Connected... HONK!")
    } catch (e){
        console.error(e);
        process.exit(1)
    }
}

module.exports = connectDB;