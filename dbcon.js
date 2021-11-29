// get instance of mysql connection
const mysql = require('mysql')

// create a connection pool using the crednetials below
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-04.cleardb.com',
    user            : 'bc4d0d06feb538',
    password        : '0cdf823c',
    database        : 'heroku_0863c25103b153e'
});

// export the pool for our application to use
module.exports.pool = pool;