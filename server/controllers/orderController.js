// Create the views here that come from the sql database

// Bring in mysql
// connection pool
var mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to DB

// View Users (view)
exports.view_order = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);
        connection.query(
            "SELECT * FROM orders "

, (err, rows) => {
            // When done with connection , release it
            connection.release();
            if (!err) {
                res.render("orders", { rows });
            } else {
                console.log(err);
            }

            console.log("The data from orders table: \n", rows);
        });
    });
};

// Find User by Search (form)
exports.find_orders = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // User the connection
        connection.query(
            "SELECT * FROM orders WHERE order_status LIKE ? OR order_filled LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("orders", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from orders table: \n", rows);
            }
        );
    });
};

// Rended the add order form
exports.order_form = (req, res) => {
    res.render("addOrder");
};

// Add new Order
exports.create_order_form = (req, res) => {
    const {
        order_id,
        customer_id,
        order_date,
        update_date,
        card_numb,
        amount,
        order_status,
        order_filled,
    } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID order_status = ? ${connection.threadId}`);

        // User the connection
        connection.query(
            "INSERT INTO orders SET customer_id = ?, order_date = ?,  update_date = ?, card_numb = ?, amount = ?, order_status = ?, order_filled = ?",
             [customer_id, order_date,update_date,card_numb, amount,order_status,order_filled],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("addOrder", {
                        alert: "Order added successfully.",
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from orders table: \n", rows);
            }
        );
    });
};

// Edit 
exports.edit_order = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "SELECT * FROM orders WHERE order_id = ?", [req.params.order_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("editOrder", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from orders table: \n", rows);
            }
        );
    });
};

// Update user
exports.update_order = (req, res) => {
    const {
        order_id,
        customer_id,
        order_date,
        update_date,
        card_numb,
        amount,
        order_status,
        order_filled,
    } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID order_status = ? ${connection.threadId}`);

        // User the connection
        connection.query(
            "UPDATE orders SET  customer_id = ?,  update_date = ?, card_numb = ?, amount = ?, order_status = ?, order_filled = ? WHERE order_id = ?", [
                customer_id,
                order_date,
                update_date,
                card_numb,
                amount,
                order_status,
                order_filled,
                req.params.order_id,
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
                            "SELECT * FROM orders WHERE order_id = ?", [req.params.order_id],
                            (err, rows) => {
                                // When done with connection , release it
                                connection.release();
                                if (!err) {
                                    res.render("editOrder", {
                                        rows,
                                        alert: `${order_status} has been updated`,
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
};

// delete Customer
exports.delete_order = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "DELETE FROM orders WHERE order_id = ?", [req.params.order_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.redirect("/orders");
                } else {
                    console.log(err);
                }
                console.log("The data from orders table: \n", rows);
            }
        );
    });
};

// View Users
exports.view_all_orders = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        // User the connection
        connection.query(
            "SELECT * FROM orders WHERE order_id = ?", [req.params.order_id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("viewOrder", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from orders table: \n", rows);
            }
        );
    });
};