const express = require('express');
const session = require('express-session');
const bp = require('body-parser');
const BookAdd = require('./models/bookAdd');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { engine } = require('express-handlebars');
const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.static('./public'));

app.set('view engine', 'handlebars');
app.set('views', './views');
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/userLogin', (req, res) => {
    res.render('userLogin');
});

app.get('/userRegister', (req,res) => {
    res.render('userRegister');
});

app.get('/addBook', (req, res) => {
    BookAdd.findAll()
    .then(books => {
        res.render('addBook', { books: books });
    })
    .catch(err => {
        console.error('Error listing added books: ', err);
        res.render('addBook', { error: 'Error listing added books: ' + err.message });
    });
});

app.post('/addBook', (req, res) => {
    BookAdd.create({
        name: req.body.bookName,
        author: req.body.bookAuthor,
        genre: req.body.bookGenre
    })
    .then(() => {
        res.redirect('/addBook');
    })
    .catch(err => {
        console.error('Error adding book: ', err);
        res.render('addBook', { error: 'Error adding book: ' + err.message });
    });
});

app.get('/editBook/:id', (req, res) => {
    BookAdd.findByPk(req.params.id)
    .then(books => {
        if (books) {
            res.render('editBook', { books: books });
        } else {
            res.send('Book not found');
        }
    })
    .catch(error => {
        console.error('Error finding book: ', error);
        res.send('Error finding book: ' + error.message);
    });
});

app.post('/editBook/:id', (req, res) => {
    const id = req.params.id

    BookAdd.update({
        name: req.body.newBookName,
        author: req.body.newBookAuthor,
        genre: req.body.newBookGenre
    }, { where: { id: id } })
    .then(() => {
        res.redirect('/addBook');
    })
    .catch(error => {
        console.error('Error editing book: ', error);
        console.log(error);
        res.send('Error editing book: ' + error.message);
    });
});

app.get('/addBook/:id', (req, res) => {
    BookAdd.destroy({ where: { id: req.params.id } })
    .then(() => {
        res.redirect('/addBook');
    })
    .catch(error => {
        console.error('Error deleting book: ', error);
        res.send('Error deleting book: ' + error.message);
    });
});

app.listen(4444, () => {
    console.log("Servidor rodando em: http://localhost:4444");
});

module.exports = app;