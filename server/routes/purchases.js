const express = require("express");
const router = express.Router();


// This where all the routes will go through
// controller
// create, find, update, delete
const productController = require("../controllers/productController");

// This routes from orderController.js
router.get("/products/", productController.view_products); // View the form of all products
router.post("/products/", productController.find_products); // result of a search query
//***foreign key constraint fails */
router.get("/addProduct", productController.product_form); // View form to add a products
router.post("/addProduct", productController.create_form); // Posting an added products
//***foreign key constraint fails */
router.get("/editProduct/:product_id", productController.edit_product); // Edit form to add a products
router.post("/editProduct/:product_id", productController.update_product); // Update form to add a products
router.get("/:product_id", productController.delete_product); // This will delete a row based on id
router.get("/viewProduct/:product_id", productController.view_all_product);



// Router
router.get("/products/", (req, res) => {
    res.send("products");
});

module.exports = router;