const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        required: true,
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        required: true,
        type: String,
    }

})

module.exports = mongoose.model("Comment", commentSchema)