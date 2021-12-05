module.exports = function () {
    const express = require('express');
    const router = express.Router();

    // function that gets order information from the database
    function getOrders(res, mysql, context, complete) {
        mysql.pool.query("SELECT orderID, userID FROM orders", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }

    // displays orders page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = []; // array of javascript files to include in the view
        let mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('orders', context);
            }
        }
    });

    // insert new order to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO orders (userID) VALUES (?)";
        var values = [req.body.userID];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/orders');
            }
        });
    });

    return router;
}();
