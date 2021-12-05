module.exports = function () {
    const express = require('express');
    const router = express.Router();

    // function that gets users information from the database
    function getUsers(res, mysql, context, complete) {
        mysql.pool.query("SELECT customerID, firstName, lastName, birthDate, email, zip FROM users", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    // displays users page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {}; // context object to pass to the callback function
        context.jsscripts = []; // array of javascript files to include in the view
        let mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('users', context);
            }
        }
    });



}
