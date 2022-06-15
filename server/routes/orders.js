const express = require("express");
const router = express.Router();



// This where all the routes will go through
// controller
// create, find, update, delete
const orderController = require("../controllers/orderController");

router.get("/orders", orderController.view_order); // View the form of all order
router.post("/orders", orderController.find_orders); // result of a search query
router.get("/addOrder", orderController.order_form); // View form to add a order
router.post("/addOrder", orderController.create_form); // Posting an added order
router.get("/editOrder/:order_id", orderController.edit_order); // Edit form to add a order
router.post("/editOrder/:order_id", orderController.update_order); // Update form to add an order
router.get("/:order_id", orderController.delete_order); // This will delete a row based on id
router.get("/viewOrder/:order_id", orderController.view_all_orders);


// Router
// router.get("/orders/", (req, res) => {
//     res.send("orders");
// });

module.exports = router;