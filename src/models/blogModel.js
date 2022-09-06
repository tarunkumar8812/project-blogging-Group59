const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
<<<<<<< HEAD
        required: true
=======
        required: true,
        trim: true
>>>>>>> cd6da7588d01179d4b0a6b2b75b9a9f4270246af
    },

    body: {
        type: String,
<<<<<<< HEAD
        required: true
=======
        required: true,
        trim: true
>>>>>>> cd6da7588d01179d4b0a6b2b75b9a9f4270246af
    },

    authorId: {
        type: ObjectId,
        ref: "Author",
        required: true
    },

    tags: [{
        type: String,
        trim: true
    }],

    category: {
<<<<<<< HEAD
        type: [String],
        required: true
=======
        type: String,
        required: true,
        trim: true
>>>>>>> cd6da7588d01179d4b0a6b2b75b9a9f4270246af
    },

    subcategory: [{
        type: String,
        trim: true
    }],

    deletedAt: {
        type: Date,
        default: null
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    publishedAt: {
        type: Date,
        default: null
    },

    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("Blog", blogSchema) //blogs