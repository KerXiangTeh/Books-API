const express = require('express');
const app = express();

const books = [
    {
        id: 1,
        title: 'Book One',
        author: 'Author One'
    },
    {
        id: 2,
        title: 'Book Two',
        author: 'Author Two'
    }
];

let nextId = 3;
app.use(express.json());

/*
    Endpoint: GET /books
    Description: Returns all the books in DB
    Req Parameters: None
    Res Body: array of books 
*/

app.get('/books', (req, res) => {
    res.json(books);
});

/* 
    Endpoint: POST /books
    Description: Insert new book
    Req Body: Title, Author
    Res Body: Book
*/
app.post('/books', (req, res) => {
    const book = {
        id: nextId++,
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    res.json(book);
})

/*
    Endpoint: PUT /books/:id
    Description: Update the title and author of a book given the ID
    Req Param: ID
    Req Body: Title, Author
    Rep Body: Book
*/
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (!book) {
        res.status(404);
    } else {
        book.title = req.body.title;
        book.author = req.body.author;
        res.status(book);
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})