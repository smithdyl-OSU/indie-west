module.exports = function() {
    const express = require('express');
    let router = express.Router();

    // function that gets album information from the database
    function getAlbums(res, mysql, context, complete) {
        mysql.pool.query("SELECT albumID, title, artist, albumArt, genre, releaseDate FROM albums", function(error, results, fields) {
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

    return router;
}();
