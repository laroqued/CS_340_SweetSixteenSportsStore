These are some Database Manipulation queries for our Sweet Sixteen Sports Store website

-- get all line items to populate the line_item  drop down
SELECT line_item FROM Order_details

-- get a single customer's information from the Customers page
SELECT * FROM Customers WHERE customer_id = :customer_id_input_from_Customers_page

-- get order details information from the Order_details page
SELECT * FROM Order_details WHERE order_id = :order_id_input_from_Order_details_page

-- get orders information from the Orders page
SELECT * FROM Orders WHERE order_id = :order_id_input_from_Orders_page

-- get products information from the Products page
SELECT * FROM Products WHERE product_id = :product_id_input_from_Products_page

-- get purchases information from the purchases page
SELECT * FROM Purchases WHERE purchase_id = :purchase_id_input_from_Purchases_page

-- add a new customer
INSERT INTO Customers (first_name, last_name, street_address, city, state, zip, email, phone) 
VALUES (:first_nameInput, :last_nameInput, :street_addressInput, :cityInput, :stateInput, :zipInput, :emailInput, :phoneInput)

-- add a new Order detail item
INSERT INTO Order_details (quantity, price, line_item_number) 
VALUES (:quantityInput, :priceInput, :line_item_numberInput)

-- add a new Order
INSERT INTO Orders (order_date, update_date, card_numb, amount, order_status, order_filled) 
VALUES (:order_dateInput, :update_dateInput, :card_numbInput, :amountInput, :order_statusInput, :order_filledInput)

-- add a new product
INSERT INTO Products (item_name, description, price, stock_status) 
VALUES (:item_nameInput, :descriptionInput, :priceInput, :stock_statusInput)

-- add a new purchase
INSERT INTO Purchases (purchase_date, cost, payment_date, items_received) 
VALUES (:purchase_dateInput, :costInput, :payment_dateInput, :items_receivedInput)

-- update a customer's data based on submission of the Update customer form 
UPDATE Customers SET first_name = :first_nameInput, last_name= :last_nameInput, street_address = :street_addressInput, city= :cityInput, state= :stateInput,zip= :zipInput, email= :emailInput, phone= :phoneInput
WHERE id= :customer_id_from_the_update_form

-- update an order detail based on submission of the Update Order_detail form 
UPDATE Order_details SET quantity = :quantityInput, price= :priceInput, line_item_number= :line_item_numberInput
WHERE order_id= :order_id_from_the_update_form

-- update an order based on submission of the Update Order form 
UPDATE Orders SET order_date = :order_dateInput, update_date= :update_dateInput, card_numb= :card_numbInput, amount= : amountInput, order_status= :order_statusInput, order_filled= :order_filledInput
WHERE order_id= :order_id_from_the_update_form

-- update a Product based on submission of the Update Product form 
UPDATE Products SET item_name = :item_nameInput, description= :descriptionInput, price= :priceInput, stock_status= :stock_statusInput
WHERE product_id= :product_id_from_the_update_form

-- update a Purchase based on submission of the Update Purchase form 
UPDATE Purchases SET purchase_date = :purchase_dateInput, cost= :costInput, payment_date= :payment_dateInput, items_received= :items_receivedInput
WHERE purchase_id= :purchase_id_from_the_update_form

-- delete a customer
DELETE FROM Customers WHERE id = :customer_id_selected_from_Customers_page

-- delete an order detail
DELETE FROM Order_details WHERE order_id = :order_id_selected_from_Order_details_page

-- delete an order
DELETE FROM Orders WHERE order_id = :order_id_selected_from_Orders_page

-- delete a product
DELETE FROM Products WHERE product_id = :product_id_selected_from_Products_page

-- delete a purchase
DELETE FROM Purchases WHERE purchase_id = :purchase_id_selected_from_Purchases_page