const express = require("express");
const router = express.Router();



// This where all the routes will go through
// controller
// create, find, update, delete
const purchaseController = require("../controllers/purchaseController");


// This routes from orderController.js
router.get("/purchases/", purchaseController.view_purchases); // View the form of all purchases
router.post("/purchases/", purchaseController.find_purchases); // result of a search query
//***foreign key constraint fails */
router.get("/addPurchase", purchaseController.purchase_form); // View form to add a purchases
router.post("/addPurchase", purchaseController.create_form); // Posting an added purchases
//***foreign key constraint fails */
router.get("/editPurchase/:purchase_id", purchaseController.edit_purchase); // Edit form to add a purchases
router.post("/editPurchase/:purchase_id", purchaseController.update_purchase); // Update form to add a purchases

router.get("deletePurchase/:purchase_id", purchaseController.delete_purchase); // This will delete a row based on id
router.get("/viewPurchase/:purchase_id", purchaseController.view_all_purchases);






// Router
router.get("/purchases/", (req, res) => {
    res.send("purchases");
});
module.exports = router;