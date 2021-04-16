const express = require('express')
const router = express.Router()

const Book = require('./../models/book.model')
const Author = require('./../models/author.model')



// Endpoints
router.get('/', (req, res) => res.render('pages/index'))


// Books list
router.get('/libros', (req, res) => {

    Book
        .find()
        .then(allBooks => res.render('pages/books-list', { allBooks, msg: req.query.msg }))
        .catch(err => console.log('Error!', err))
})


// Book details
router.get('/libros/detalles/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findById(book_id)
        .populate('author')         // Nombre del campo
        .then(theBook => res.render('pages/book-detail', theBook))
        .catch(err => console.log('Error!', err))
})



// Book form (get)
router.get('/libros/crear', (req, res) => res.render('pages/new-book-form'))

// Book form (post)
router.post('/libros/crear', (req, res) => {

    const { title, description, author, rating } = req.body

    Book
        .create({ title, description, author, rating })
        .then(() => res.redirect('/libros?msg=Libro creado correctamente'))
        .catch(err => console.log('Error!', err))
})




// Book edit (get)
router.get('/libros/editar', (req, res) => {

    const { book_id } = req.query

    Book
        .findById(book_id)
        .then(book => res.render('pages/edit-book-form', book))
        .catch(err => console.log('Error!', err))
})


// Book edit (post)
router.post('/libros/editar', (req, res) => {

    const { book_id } = req.query
    const { title, description, author, rating } = req.body

    Book
        .findByIdAndUpdate(book_id, { title, description, author, rating })
        .then(editedBook => res.redirect(`/libros/detalles/${editedBook._id}`))
        .catch(err => console.log('Error!', err))
})



module.exports = router