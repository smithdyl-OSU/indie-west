module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getUsers(res, mysql, context, complete) {
        mysql.pool.query("SELECT userID, firstName, lastName, birthDate, email, zip FROM users", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js"];
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('users', context);
            }
        }
    });

}
