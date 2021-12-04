module.exports = function () {
    const express = require('express');
    let router = express.Router();

    // function that gets album information from the database
    function getAlbums(res, mysql, context, complete) {
        mysql.pool.query("SELECT albumID, title, artist, genre, releaseDate, artist FROM albums", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.albums = results;
            complete();
        });
    }

    // displays albums page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = []; // array of javascript files to include in the view
        let mysql = req.app.get('mysql');
        getAlbums(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('albums', context);
            }
        }
    });

    // insert new album to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Albums (title, albumArt, genre, releaseDate, artist) VALUES (?,?,?,?,?)";
        var values = [req.body.albumTitle, req.body.albumArt, req.body.albumGenre, req.body.albumDate, req.body.albumArtist];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/artists');
            }
        });
    });

    return router;
}();
