const express = require('express')
const router = express.Router()

// This where all the routes will go through
// controller
// create, find, update, delete
const customerController = require('../controllers/customerController')

// This comes from userController.js
router.get("/customers", customerController.view); // View the form of all customers
router.post("/customers", customerController.find); // result of a search query
router.get('/addCustomer', customerController.form) // View form to add a customer
router.post('/addCustomer', customerController.create) // Posting an added customer

router.get("/editCustomer/:customer_id", customerController.edit); // Edit form to add a customer
router.post("/editCustomer/:customer_id", customerController.update); // Update form to add a customer

router.get("/deleteCustomer/:customer_id", customerController.delete); // This will delete a row based on id
router.get("/viewCustomer/:customer_id", customerController.view_all);
//Create a partial view for edits

// Router
router.get("/customers", (req, res) => {
    res.render("customers");
});

module.exports = router;