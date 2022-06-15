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

// View Products (view)
exports.view_products = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        //  Product connection
        connection.query(
            'SELECT * FROM products',
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("products", { rows });
                } else {
                    console.log(err);
                }

                console.log("The data from product table: \n", rows);
            }
        );
    });
};

// Find Product by Search (form)
exports.find_products = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;
        // Product connection
        connection.query(
            "SELECT * FROM products WHERE item_name LIKE ? OR stock_status LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("products", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from products table: \n", rows);
            }
        );
    });
};

// Rendered the add product form
exports.product_form = (req, res) => {
    res.render("addProduct");
};

// Add new Product
exports.create_form = (req, res) => {
    const { item_name, description, price, stock_status } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        let searchTerm = req.body.search;

        // Product connection
        connection.query(
            "INSERT INTO products SET item_name = ?, description = ?,  price = ?, stock_status = ?", [item_name, description, price, stock_status],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("addProduct", {
                        alert: "Product added successfully.",
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from product table: \n", rows);
            }
        );
    });
};

// Edit Product
exports.edit_product = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Product connection
        connection.query(
            "SELECT * FROM products WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.render("editProduct", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from product table: \n", rows);
            }
        );
    });
};

// Update Product
exports.update_product = (req, res) => {
    const { item_name, description, price, stock_status } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID item_name = ? ${connection.threadId}`);

        // Product connection
        connection.query(
            "UPDATE products SET item_name = ?, description = ?,  price = ?, stock_status = ? WHERE product_id = ?", [item_name, description, price, stock_status, req.params.product_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; //not connected
                        console.log(`Connected as ID ${connection.threadId}`);

                        // This will return the edited form
                        connection.query(
                            "SELECT * FROM products WHERE product_id = ?", [req.params.product_id],
                            (err, rows) => {
                                // When done with connection , release it
                                connection.release();
                                if (!err) {
                                    res.render("editProduct", {
                                        rows,
                                        alert: `${description} has been updated`,
                                    });
                                } else {
                                    console.log(err);
                                }
                                console.log("The data from product table: \n", rows);
                            }
                        );
                    });
                } else {
                    console.log(err);
                }
                console.log("The data from product table: \n", rows);
            }
        );
    });
};

// delete Product
exports.delete_product = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Product connection
        connection.query(
            "DELETE FROM products WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with connection , release it
                connection.release();
                if (!err) {
                    res.redirect("/products");
                } else {
                    console.log(err);
                }
                console.log("The data from product table: \n", rows);
            }
        );
    });
};

// View Product
exports.view_all_product = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log("Connected as ID " + connection.threadId);
        // Product the connection
        connection.query(
            "SELECT * FROM products WHERE product_id = ?", [req.params.product_id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    res.render("viewProduct", { rows });
                } else {
                    console.log(err);
                }
                console.log("The data from product table: \n", rows);
            }
        );
    });
};