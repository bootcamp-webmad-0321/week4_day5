const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    description: String,
    author: [{              // NO DEBE IR EN UN ARRAY POR DEFECTO
        type: Schema.Types.ObjectId,
        ref: 'Author'       // nombre del modelo referenciado
    }],
    rating: Number
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book