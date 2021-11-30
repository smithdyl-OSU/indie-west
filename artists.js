module.exports = function() {
    const express = require('express');
    const router = express.Router();

    // function that gets artist information from the database
    function getArtists(res, mysql, context, complete) {
        mysql.pool.query("SELECT artistID, name FROM artists", function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artists = results;
            complete();
        });
    }

    // displays artists page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = [];
        let mysql = req.app.get('mysql');
        getArtists(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('artists', context);
            }
        }
    });



    return router;
}();