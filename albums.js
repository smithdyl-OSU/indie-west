module.exports = function () {
    const express = require('express');
    const router = express.Router();

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
        context.jsscripts = ['deleteAlbum.js', 'searchAlbum.js']; // array of javascript files to include in the view
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
        var sql = "INSERT INTO albums (title, albumArt, genre, releaseDate, artist) VALUES (?,?,?,?,?)";
        var values = [req.body.albumTitle, req.body.albumArt, req.body.albumGenre, req.body.albumDate, req.body.albumArtist];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/albums');
            }
        });
    });

    // delete album from database
    router.delete('/:id', function (req, res) {
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM albums WHERE albumID=?";
        let values = [req.params.id];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });

    return router;
}();
