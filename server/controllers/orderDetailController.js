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

// View Order Details (view)
exports.view_order_detail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        //  Order Details connection
        connection.query(
            "SELECT DISTINCT orders.order_id, products.product_id, order_details.quantity, order_details.price, order_details.line_item FROM order_details INNER JOIN orders INNER JOIN products ON orders.order_id = products.product_id"
            
            
            , (err, rows) => {
            // When done with connection , release it
            connection.release();
            if (!err) {
                res.render("order_details", { rows });
            } else {
                console.log(err);
            }

            console.log("The data from order_details table: \n", rows);
        });
    });
};

// Find Order Details by Search (form)
exports.find_order_detail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // Order Details connection
        connection.query(
            "SELECT * FROM order_details WHERE product_id LIKE ? OR line_item LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("order_details", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};





// Rendered the add order_details form
exports.order_detail_form = (req, res) => {
    res.render("addOrderDetail");
};

// Add new Order Details
exports.create_order_detail_form = (req, res) => {
    const { order_id, product_id, quantity, price, line_item } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;

        // Order Details connection
        connection.query(
            "INSERT INTO order_details SET order_id = ?, product_id = ?,  quantity = ?, price = ?, line_item=?", [order_id, product_id, quantity, price, line_item],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("addOrderDetail", {
                        alert: "Order Detail added successfully.",
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};

// Edit Order Details
exports.edit_order_detail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Order Details connection
        connection.query(
            "SELECT * FROM order_details WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("editOrderDetail", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};

// // Update Order Details
exports.update_order_detail = (req, res) => {
    const { order_id, product_id, quantity, price, line_item } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID item_name = ? ${connection.threadId}`);

        // Order Details connection
        connection.query(
            "UPDATE order_details SET order_id = ?, product_id = ?,  quantity = ?, price = ?, line_item=? WHERE product_id = ?", [order_id, product_id, quantity, price, line_item],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; //not connected
                        console.log(`Connected as ID ${connection.threadId}`);

                        // This will return the edited form
                        connection.query(
                            "SELECT * FROM order_details WHERE product_id = ?", [req.params.product_id],
                            (err, rows) => {
                                // When done with connection , release it
                                connection.release();
                                if (!err) {
                                    res.render("editOrderDetail", {
                                        rows,
                                        alert: `${description} has been updated`,
                                    });
                                } else {
                                    console.log(err);
                                }
                                console.log("The data from order_details table: \n", rows);
                            }
                        );
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};

// delete Order Details
exports.delete_order_detail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Order Details connection
        connection.query(
            "DELETE FROM order_details WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.redirect("/order_details");
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};

// View Order Details
exports.view_all_order_detail = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        // Order Details the connection
        connection.query(
            "SELECT * FROM order_details WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("viewOrderDetail", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from order_details table: \n", rows);
            }
        );
    });
};