// Get an instance of mysql
const mysql = require('mysql')

// Create a connection using the following credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-04.cleardb.com',
    user            : 'bc4d0d06feb538',
    password        : '0cdf823c',
    database        : 'heroku_0863c25103b153e'
});

// Export it for use in the app
module.exports.pool = pool;
