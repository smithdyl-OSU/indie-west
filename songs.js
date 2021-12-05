module.exports = function () {
    const express = require('express');
    const router = express.Router();

    // function that gets songs information from the database
    function getSongs(res, mysql, context, complete) {
        mysql.pool.query("SELECT songID, title, songLength, artistID, albumID FROM songs", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.songs = results;
            complete();
        });
    }

    // displays songs page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = []; // array of javascript files to include in the view
        let mysql = req.app.get('mysql');
        getSongs(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('songs', context);
            }
        }
    });

    // insert new song to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO songs (title, songLength, artistID, albumID) VALUES (?,?,?,?)";
        var values = [req.body.songTitle, req.body.songLength, req.body.songArtist, req.body.songAlbum];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/songs');
            }
        });
    });

    return router;
}();
