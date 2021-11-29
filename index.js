const express = require('express');
const app = express();
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variable Database
const db = require('./dbcon.js');


// Routes

// Renders the home page
app.get('/', (req, res) => {
    res.render('home')
    });

// 

// Artists //

// Get/Show all artists
// app.get('/artists', (req, res) => {
//     let query = 'SELECT * FROM artists';

//     db.pool.query(query, (err, rows) => {
//         res.render('artists', { data: rows });
//     });
// });

// // Filters artists by name
// app.get('/artists/:name', (req, res) => {
//     let query = 'SELECT * FROM artists WHERE name = ?';
//     let name = req.params.name;

//     db.pool.query(query, [name], (err, rows) => {
//         res.render('artists', { data: rows });
//     });
// });

// Renders a 404 status code if the page is not found
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// Renders a 500 status code if there is an error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// App starts listening on giben port
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}; press Ctrl-C to terminate.`);
});
