module.exports = function () {
    let express = require('express');
    let router = express.Router();

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

    // function that gets one artist for updating
    function getArtistToUpdate(res, mysql, context, artistID, complete) {
        let sql = "SELECT artistID as artistID, name FROM artists WHERE artistID = ?";
        let inserts = [artistID];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artists = results[0];
            complete();
        });
    }


    // displays artists page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = ['deleteArtist.js', 'searchArtist.js']; // array of javascript files to include in the page
        let mysql = req.app.get('mysql');
        getArtists(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('artists', context);
            }
        }
    });
    // gets the updateArtists page using the artistID
    router.get('/:id', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = ['updateArtist.js']; // array of javascript files to include in the page
        let mysql = req.app.get('mysql');
        getArtistToUpdate(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('updateArtists', context);
            }
        }
    });



    // insert new artist to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO artists (name) VALUES (?)";
        let values = [req.body.artistName];
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

    // updates artist information in database
    router.put('/:id', function (req, res) {
        let mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.artistID)
        let sql = "UPDATE artists SET name=? WHERE artistID=?";
        let values = [req.body.name, req.params.artistID];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });


    // delete artist from database
    router.delete('/:id', function (req, res) {
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM artists WHERE artistID=?";
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
