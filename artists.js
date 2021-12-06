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
        var sql = "INSERT INTO artists (name) VALUES (?)";
        var values = [req.body.artistName];
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

    // function to parse delete requests
    function deleteArtist(id) {
        $.ajax({
            url: '/artists/' + id,
            type: 'DELETE',
            success: function (result) {
                window.location.reload(true);
            }
        })
    };

    // delete artist from database
    router.delete('/artists/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM artists WHERE artistID=?";
        var values = [req.params.id];
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