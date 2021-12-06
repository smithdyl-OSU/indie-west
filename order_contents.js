module.exports = function () {
    let express = require('express');
    let router = express.Router();

    // function that gets artist information from the database
    function getOrderContents(res, mysql, context, complete) {
        mysql.pool.query("SELECT orderID, albumID FROM order_contents", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order_contents = results;
            complete();
        });
    }

    // displays order_contents page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = ['deleteArtist.js']; // array of javascript files to include in the page
        let mysql = req.app.get('mysql');
        getOrderContents(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('order_contents', context);
            }
        }
    });

    // insert new artist to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO order_contents (orderID, albumID) VALUES (?,?)";
        let values = [req.body.orderID, req.body.albumID];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/order_contents');
            }
        });
    });

    // delete artist from database
    router.delete('/:id', function (req, res) {
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM order_contents WHERE orderID=?";
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