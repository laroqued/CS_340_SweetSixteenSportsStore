const express = require("express");
const router = express.Router();

// This where all the routes will go through
// controller
// create, find, update, delete
const orderDetailController = require("./server/controllers/orderDetailController");

// // This routes from orderDetailController.js
app.get("/order_details/", orderDetailController.view_order_detail); // View the form of all order_detail
app.post("/order_details/", orderDetailController.find_order_detail); // result of a search query
// //***foreign key constraint fails */
app.get("/addOrderDetail", orderDetailController.order_detail_form); // View form to add a order_detail
app.post("/addOrderDetail", orderDetailController.create_order_detail_form); // Posting an added order_detail

// //***foreign key constraint fails */
app.get(
    "/editOrderDetail/:product_id",
    orderDetailController.edit_order_detail
); // Edit form to add a products
app.post("/editProduct/:product_id", orderDetailController.update_order_detail); // Update form to add a products

app.get("/:product_id", orderDetailController.delete_order_detail); // This will delete a row based on id

app.get(
    "/viewOrderDetail/:product_id",
    orderDetailController.view_all_order_detail
);

// Router
app.get("/order_details/", (req, res) => {
    res.send("order_details");
});


module.exports = router;