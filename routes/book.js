const express = require("express");
const BookModel = require("../models/book")
const bookValidation = require('../validators/book.validator')

const bookRoute = express.Router()


// Note CRUD will be happening here => CREATE, READ , UPDATE AND DELETE , this is the issues 
// when it matters it will be happening here as regards update , delete 
// this is beyound politics , i will speak to people who kn

//READ = GET
bookRoute.get("/", (req,res) => {
    BookModel.find()
    .then(books => {
        // Responding with a json object
        res.status(200).json({
            message: 'books fetched successfully', 
            user: req.user || null,
             books
            })
        // res.status(200).send(books)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: 'Error occur while fetchich books',
            details: err.message
        })
    })
})

// READ BY ID 

bookRoute.get("/:id", (req,res) => {
    const id = req.params.id
    console.log(id)
    BookModel.findById(id)
    .then((book) => {
        res.status(200).send(book)
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    })
})

//CREAT= POST 

bookRoute.post("/", bookValidation, (req, res) => {  // This helps when users needs to validate (That is when adding to databse that details is correct)
    const books = req.body
    console.log(books)

    BookModel.create(books)
.then((book) => {
    res.status(201).send({
        message: "Book Added Successully",
        data: book
    })
}).catch((err) => {
    res.status(400).send(err)
})

})


//UPDATE = PUT

bookRoute.put("/:id", (req, res) => {
    const id = req.params.id
    const book = req.body

    BookModel.findByIdAndUpdate(id,book, {new: true})
    .then((book) => {
        res.status(200).send(book)
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    })
})

//DELETE = DELETE

bookRoute.delete("/:id", (req, res) => {
    const id = req.params.id
    BookModel.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send({
            message: "Deletion successful",
            data: ""
        })
    }) .catch((err) => {
        console.log(err)
        res.status(400).send(err)
    })

})



module.exports = bookRoute