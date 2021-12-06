/*
Initial setup of the application 
*/


const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

const PORT = process.env.PORT || 3004;
const bodyParser = require('body-parser');


app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));
app.use(express.json());

// Variable Database
let mysql = require('./dbcon.js');

app.set('mysql', mysql);

// Routes including helper functions
app.use('/artists', require('./artists.js'));
app.use('/albums', require('./albums.js'));
app.use('/songs', require('./songs.js'));
app.use('/orders', require('./orders.js'));
app.use('/users', require('./users.js'));
app.use('/album_owners', require('./album_owners.js'));
app.use('/order_contents', require('./order_contents.js'));
app.use('/', require('./home.js'));

// Renders a 404 status code if the page is not found
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// Renders a 500 status code if there is an error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// App starts listening on giben port
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT} ; press Ctrl-C to terminate.`);
});
