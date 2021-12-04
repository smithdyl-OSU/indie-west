module.exports = function () {
    const express = require('express');
    const router = express.Router();

    // function that gets artist information from the database
    function getArtists(res, mysql, context, complete) {
        mysql.pool.query("SELECT artistID, name FROM artists", function (error, results, fields) {
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

    // insert new artist to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Artists (name) VALUES (?)";
        var values = [req.body.inputName];
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