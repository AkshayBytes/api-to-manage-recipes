const mongoose = require ("mongoose");


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    difficulty: [{
        type: String,
        enum:[
            "Easy",
            "Intermediate",
            "Difficult"
        ]
    }],
    prepTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    ingredients:[{
        type: String,
        required: true
    }],
    instructions: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    }


},{
    timestamps: true
})

const receipe2 = mongoose.model('receipe2', recipeSchema)

module.exports = receipe2

