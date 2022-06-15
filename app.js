const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require("path");

const cors = require('cors')




app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use(express.static('public'));
app.use("/public", express.static(__dirname + "/public"));
var dir = path.join(__dirname, "/public");


require('dotenv').config();

// Template Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');




var fs = require("fs");


var mime = {
    html: "text/html",
    txt: "text/plain",
    css: "text/css",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    js: "application/javascript",
};









// port
const port = process.env.PORT || 3100

mysql = require("./dbcon");
app.set("mysql", mysql);


// // // === === === === === === === === === INDEX === === === === === === === === === === === === === === === === === =

// setup Routes
const routesIndex = require("./server/routes/index");
app.use("/", routesIndex);



// // // === === === === === === === === === CUSTOMERS === === === === === === === === === === === === === === === === === =
// // //     Connect to the Controller
const customerController = require("./server/controllers/customerController");


// This comes from userController.js
app.get("/customers", customerController.view); // View the form of all customers
app.post("/customers", customerController.find); // result of a search query

app.get("/addCustomer", customerController.form); // View form to add a customer
app.post("/addCustomer", customerController.create); // Posting an added customer

app.get("/editCustomer/:customer_id", customerController.edit); // Edit form to add a customer
app.post("/editCustomer/:customer_id", customerController.update); // Update form to add a customer

app.get("/deleteCustomer/:customer_id", customerController.delete); // This will delete a row based on id
app.get("/viewCustomer/:customer_id", customerController.view_all);


// // === === === === === === === === === PRODUCTS === === === === === === === === === === === === === === === === === =

// // Connect to the Controller
const productController = require("./server/controllers/productController");

// // This routes from orderController.js
app.get("/products/", productController.view_products); // View the form of all products
app.post("/products/", productController.find_products); // result of a search query

app.get("/addProduct", productController.product_form); // View form to add a products
app.post("/addProduct", productController.create_form); // Posting an added products

app.get("/editProduct/:product_id", productController.edit_product); // Edit form to add a products
app.post("/editProduct/:product_id", productController.update_product); // Update form to add a products

app.get("/deleteProduct/:product_id", productController.delete_product); // This will delete a row based on id
app.get("/viewProduct/:product_id", productController.view_all_product);


// // === === === === === === === === === ORDERS === === === === === === === === === === === === === === === === === =
// //     Connect to the Controller
const orderController = require("./server/controllers/orderController");

// This routes from orderController.js
app.get("/orders", orderController.view_order); // View the form of all order
app.post("/orders", orderController.find_orders); // result of a search query

app.get("/addOrder", orderController.order_form); // View form to add a order
app.post("/addOrder", orderController.create_order_form); // Posting an added order

app.get("/editOrder/:order_id", orderController.edit_order); // Edit form to add a order
app.post("/editOrder/:order_id", orderController.update_order); // Update form to add an order

app.get("/deleteOrder/:order_id", orderController.delete_order); // This will delete a row based on id
app.get("/viewOrder/:order_id", orderController.view_all_orders);



// // === === === === === === === === === PURCHASES === === === === === === === === === === === === === === === === === =

// Connect to the Controller
const purchaseController = require("./server/controllers/purchaseController");

// This routes from orderController.js
app.get("/purchases/", purchaseController.view_purchases); // View the form of all purchases
app.post("/purchases/", purchaseController.find_purchases); // result of a search query
//***foreign key constraint fails */
app.get("/addPurchase", purchaseController.purchase_form); // View form to add a purchases
app.post("/addPurchase", purchaseController.create_form); // Posting an added purchases
//***foreign key constraint fails */
app.get("/editPurchase/:purchase_id", purchaseController.edit_purchase); // Edit form to add a purchases
app.post("/editPurchase/:purchase_id", purchaseController.update_purchase); // Update form to add a purchases

app.get("/deletePurchase/:purchase_id", purchaseController.delete_purchase); // This will delete a row based on id
app.get("/viewPurchase/:purchase_id", purchaseController.view_all_purchases);


// // === === === === === === === === === ORDER DETAILS === === === === === === === === === === === === === === === === === =

// Connect to the Controller
const orderDetailController = require("./server/controllers/orderDetailController");

// // This routes from orderDetailController.js
app.get("/order_details/", orderDetailController.view_order_detail); // View the form of all order_detail
app.post("/order_details/", orderDetailController.find_order_detail); // result of a search query
// // //***foreign key constraint fails */
app.get("/addOrderDetail", orderDetailController.order_detail_form); // View form to add a order_detail
app.post("/addOrderDetail", orderDetailController.create_order_detail_form); // Posting an added order_detail

// //***foreign key constraint fails */
app.get(
    "/editOrderDetail/:product_id",
    orderDetailController.edit_order_detail
); // Edit form to add a products
app.post("/editOrderDetail/:product_id", orderDetailController.update_order_detail); // Update form to add a products

app.get("/deleteOrderDetail/:product_id", orderDetailController.delete_order_detail); // This will delete a row based on id
app.get(
    "/viewOrderDetail/:product_id",
    orderDetailController.view_all_order_detail
);

// // === === === === === === === === ===  === === === === === === === === === === === === === === === === === =
app.get("*", function(req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, "/home.hbs"));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end("Forbidden");
    }
    var type = mime[path.extname(file).slice(1)] || "text/plain";
    var s = fs.createReadStream(file);
    s.on("open", function() {
        res.set("Content-Type", type);
        s.pipe(res);
    });
    s.on("error", function() {
        res.set("Content-Type", "text/plain");
        res.status(404).end("Not found");
    });
});

app.use(function(req, res) {
    res.status(404);
    res.render("404");
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render("500");
});


app.listen(port, () => console.log(`Listening on port ${port}`));