//displays the home page in views folder

module.exports = function() {
    const express = require('express');
    const router = express.Router();

    // displays home page
    router.get('/', (req, res) => {
        res.render('home');
    });

    return router;
}();


