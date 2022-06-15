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
exports.view_purchases = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);
        connection.query(
            `
            SELECT 
            purchases.purchase_id,
            products.product_id,
            purchases.purchase_date,
            purchases.cost,
            purchases.payment_date,
            purchases.item_received
            FROM 
                purchases 

            LEFT JOIN 
                products
            ON purchases.purchase_id = products.product_id
`,
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("purchases", { rows });
                } else {
                    console.log(err);
                }

                console.log("The data from purchases table: \n", rows);
            }
        );
    });
};

// Find User by Search (form)
exports.find_purchases = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // User the connection
        connection.query(
            "SELECT * FROM purchases WHERE purchase_id LIKE ? OR purchase_id LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("purchases", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from purchases table: \n", rows);
            }
        );
    });
};

// Render the add purchase form
exports.purchase_form = (req, res) => {
    res.render("addPurchase");
};

// Add new Purchase
exports.create_form = (req, res) => {
    const { purchase_id, product_id, purchase_date, cost, payment_date, item_received } =
    req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);

        // User the connection
        connection.query(
            "INSERT INTO purchases SET purchase_id = ?, product_id = ?, purchase_date = ?,  cost = ?, payment_date = ?, item_received = ? ", [purchase_id, product_id, purchase_date, cost, payment_date, item_received],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("addPurchase", {
                        alert: "Purchase added successfully.",
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from purchase table: \n", rows);
            }
        );
    });
};

// Edit purchase
exports.edit_purchase = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "SELECT * FROM purchases WHERE purchase_id = ?", [req.params.purchase_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("editPurchase", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from purchase table: \n", rows);
            }
        );
    });
};

// Update purchase
exports.update_purchase = (req, res) => {
    const { purchase_id, product_id, purchase_date, cost, payment_date, item_received } =
    req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID purchase_id = ? ${connection.threadId}`);

        // User the connection
        connection.query(
            "UPDATE purchases SET product_id = ?, purchase_date = ?,  cost = ?, payment_date = ?, item_received = ? WHERE purchase_id= ?", [
                product_id,
                purchase_date,
                cost,
                payment_date,
                item_received,
                req.params.purchase_id,
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
                            "SELECT * FROM purchases WHERE purchase_id = ?", [req.params.purchase_id],
                            (err, rows) => {
                                // When done with connection , release it
                                connection.release();
                                if (!err) {
                                    res.render("editPurchase", {
                                        rows,
                                        alert: `${purchase_id} has been updated`,
                                    });
                                } else {
                                    console.log(err);
                                }
                                console.log("The data from purchase table: \n", rows);
                            }
                        );
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from purchase table: \n", rows);
            }
        );
    });
};

//delete Customer
exports.delete_purchase = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // User the connection
        connection.query(
            "DELETE FROM purchases WHERE purchase_id = ?", [req.params.purchase_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.redirect("/purchases");
                } else {
                    console.log(err);
                }
                console.log("The data from purchase table: \n", rows);
            }
        );
    });
};

// View Users
exports.view_all_purchases = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        // User the connection
        connection.query(
            "SELECT * FROM purchases WHERE purchase_id = ?", [req.params.purchase_id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("viewPurchase", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from purchase table: \n", rows);
            }
        );
    });
};