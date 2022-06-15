var mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
module.exports.pool = pool;

// // MySQL local
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "sweet_sixteen", // create new database for different database name
// });
// module.exports.pool = pool;