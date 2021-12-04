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
    router.post('/', [
        // validations from express-validator
        body(['name']).trim()
            .isAscii().withMessage('must be at least one character (ASCII characters only)'),
    ], (req, res) => {
        const errors = validationResult(req);

        const data = {
            page_title: 'Add Artist',
        };

        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                req.flash('danger', `${error.param} error: ${error.msg}`);
            });

            res.render('artists/new', data);
        } else {
            // parameters for insert query
            const newArtist = {
                name: req.body.name
            };

            Artist.create(newArtist, (err, artist) => {
                if (err) {
                    req.flash('danger', err['msg'] || err['sqlMessage']);
                }
                else {
                    req.flash('success', `Artist created: ${artist.name}!`);
                }

                res.redirect('/artists/');
            });
        }
    });

    return router;
}();