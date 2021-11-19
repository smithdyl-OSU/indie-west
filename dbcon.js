const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_deatheal',
    password        : '0274',
    database        : 'cs340_deatheal'
});

module.exports.pool = pool;