module.exports = function () {
    const express = require('express');
    const router = express.Router();

    // function that gets user information from the database
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

    // displays users page
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        context.jsscripts = [];
        let mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('users', context);
            }
        }
    });

    // insert new user to database
    router.post('/', function (req, res) {
        console.log(req.body.bar)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Users (firstName, lastName, birthDate, email, zip) VALUES (?,?,?,?,?)";
        var values = [req.body.userFirstName, req.body.userLastName, req.body.userBirthDate, req.body.userEmail, req.body.userZip];
        sql = mysql.pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/users');
            }
        });
    });

}
