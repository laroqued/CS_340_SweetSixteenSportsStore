// Create the views here that come from the sql database
// var mysql = require("../../dbcon");

// Bring in mysql
// connection pool
var mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB



// View Users (view)
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection (SELECT * FROM user WHERE status = "active")
        connection.query(
            'SELECT * FROM customers WHERE status = "active"',
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("customers", { rows });
                } else {
                    console.log(err);
                }

                console.log("The data from customer table: \n", rows);
            }
        );
    });

}


// Find User by Search (form)
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // User the connection
        connection.query(
            "SELECT * FROM customers WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("customers", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from customers table: \n", rows);
            }
        );
    });
}



// Rended the add user form
exports.form = (req, res) => {
    res.render("addCustomer");
}



// Add new Customer
exports.create = (req, res) => {
    const {
        first_name,
        last_name,
        street_address,
        city,
        state,
        zip,
        email,
        phone,
    } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;

        // User the connection
        connection.query(
            "INSERT INTO customers SET first_name = ?, last_name = ?,  street_address = ?, city = ?, state = ?, zip = ?, email = ?, phone = ?", [
                first_name,
                last_name,
                street_address,
                city,
                state,
                zip,
                email,
                phone,
            ],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("addCustomer", {
                        alert: "Customer added successfully.",
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from customers table: \n", rows);
            }
        );
    });
}

// Edit Customer
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "SELECT * FROM customers WHERE customer_id = ?", [req.params.customer_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("editCustomer", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from customer table: \n", rows);
            }
        );
    });
}

// Update user
exports.update = (req, res) => {
    const {
        first_name,
        last_name,
        street_address,
        city,
        state,
        zip,
        email,
        phone,
    } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID first_name = ? ${connection.threadId}`);

        // User the connection
        connection.query(
            "UPDATE customers SET first_name = ?, last_name = ?,  street_address = ?, city = ?, state = ?, zip = ?, email = ?, phone = ? WHERE customer_id = ?", [
                first_name,
                last_name,
                street_address,
                city,
                state,
                zip,
                email,
                phone,
                req.params.customer_id,
            ],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; //not connected
                        console.log(`Connected as ID ${connection.threadId}`);

                        // This will return the edited form
                        connection.query(
                            "SELECT * FROM customers WHERE customer_id = ?", [req.params.customer_id],
                            (err, rows) => {
                                // When done with connection , release it
                                connection.release();
                                if (!err) {
                                    res.render("editCustomer", {
                                        rows,
                                        alert: `${first_name} has been updated`,
                                    });
                                } else {
                                    console.log(err);
                                }
                                console.log("The data from customer table: \n", rows);
                            }
                        );
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from customer table: \n", rows);
            }
        );
    });
}

// delete Customer
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "DELETE FROM customers WHERE customer_id = ?", [req.params.customer_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.redirect("/customers");
                } else {
                    console.log(err);
                }
                console.log("The data from customer table: \n", rows);
            }
        );
    });
}


// View Users
exports.view_all = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        // User the connection
        connection.query(
            "SELECT * FROM customers WHERE customer_id = ?", [req.params.customer_id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("viewCustomer", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from customer table: \n", rows);
            }
        );
    });
}