
-- Delete old tables
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `order_details`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `purchases`;
DROP TABLE IF EXISTS `products`;


SET FOREIGN_KEY_CHECKS=1;




-- --------------------------------------------------------
--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
 `customer_id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 `street_address` varchar(255) NOT NULL,
 `city` varchar(255) NOT NULL,
 `state` varchar(255) NOT NULL,
 `zip` char(5) NOT NULL,
 `email` varchar(50) NOT NULL,
 `phone` varchar(14) NOT NULL,
 `status` varchar(10) NOT NULL DEFAULT 'active',
 PRIMARY KEY (`customer_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `customers` (first_name, last_name, street_address, city, state,zip,email,phone,status) VALUES 
('John','Smith','123 Main St','Troy','NY','12345','JohnS@email.com','(123) 555-7893','active'),
('Shirley','Temple','1225 Sober St','Denver','CO','85245','Shirtemp@email.com','(654) 555-7893','active'), 
('Chuck','Diesel','987 Tuff St','Washinton','DC','98165','tuffguy@email.com','(916) 555-7453','active'),

('Jamal','Johnson','123 Third St','Troy','NY','12345','Johnson@email.com','(123) 555-7893','active'),
('Sandy','Jackson','1225 Pard St','Denver','CO','85245','Jackson@email.com','(654) 555-7893','active'), 
('Amy','Miller','987 Elm St','Washinton','DC','98165','Miller@email.com','(916) 555-7453','active'),

('Lessie','Garcia','123 Oak St','Troy','NY','12345','Garcia@email.com','(123) 555-7893','active'),
('George','Brown','1225 Washinton St','Denver','CO','85245','Brown@email.com','(654) 555-7893','active'), 
('Aisha','Davis','987 Pine St','Washinton','DC','98165','Davis@email.com','(916) 555-7453','active'),

('Patty','Perez','123 Ninth St','Troy','NY','12345','Perez@email.com','(123) 555-7893','active'),
('Felicia','Taylor','1225 Hill St','Denver','CO','85245','Taylor@email.com','(654) 555-7893','active'), 
('Scarlett','Harrix','987 Lake St','Washinton','DC','98165','Harrix@email.com','(916) 555-7453','active'),

('Anderson','Cooper','123 View St','Troy','NY','12345','Cooper@email.com','(123) 555-7893','active'),
('Lester','Holt','1225 Cedar St','Denver','CO','85245','Holt@email.com','(654) 555-7893','active'), 
('Lebron','Young','987 Second St','Washinton','DC','98165','Young@email.com','(916) 555-7453','active'),

('Chester','Ramirez','123 Bus St','Troy','NY','12345','Ramirez@email.com','(123) 555-7893','active'),
('Peter','Lee','1225 Heritage St','Denver','CO','85245','Lee@email.com','(654) 555-7893','active'), 
('Anna','Robinson','987 Maple St','Washinton','DC','98165','Robinson@email.com','(916) 555-7453','active');
-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
 `order_id` int(11) NOT NULL AUTO_INCREMENT,
 `customer_id` int(11) NOT NULL,
 `order_date` date NOT NULL,
 `update_date` date NOT NULL,
 `card_numb` int(20) NOT NULL,
 `amount` decimal(50,0) NOT NULL,
 `order_status` varchar(50) NOT NULL DEFAULT 'Processing',
 `order_filled` tinyint(1) NOT NULL DEFAULT 1,
	PRIMARY KEY(`order_id`),
	FOREIGN KEY(`customer_id`) REFERENCES `products`(`customer_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`; 
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `customers`(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `orders` (customer_id, order_date, update_date, card_numb,amount,order_status,order_filled) VALUES 
(1, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(3, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(2, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 ),

(4, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(6, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(5, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 ),

(7, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(9, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(8, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 ),

(10, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(12, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(11, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 ),

(13, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(15, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(14, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 ),

(16, '2021-11-17','2020-12-17',1234156478944561,20.00,'Processing',1 ),
(18, '2021-05-05','2019-05-04',1234156478944561,30.00,'Delivered',0 ),
(17, '2021-03-22','2018-06-26',1234156478944561,40.00, 'Delayed',1 );






-- --------------------------------------------------------

--
-- Table structure for table `products`
--
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(50,0) NOT NULL,
  `stock_status` varchar(50) NOT NULL,
  	PRIMARY KEY(`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (item_name, description,price,stock_status) VALUES 
('Basketball', 'Greatest Basketball Ever',5.00,'Shipped' ),
('Golf Club', 'Greatest Golf Club Ever',200.00,'Delivered' ),
('Shorts', 'Greatest Shorts Ever',25.99,'Delayed' ),

('Fishing Pole', 'Greatest Fishing Pole Ever',49.00,'Shipped' ),
('Cooler', 'Greatest Coooler Club Ever',20.00,'Delivered' ),
('Tennis Racket', 'Greatest Tennis Racket Ever',85.99,'Delayed' ),

('Treadmill', 'Greatest Treadmill Ever',1000.00,'Shipped' ),
('Ice Skates', 'Greatest Ice Skates Club Ever',99.00,'Delivered' ),
('Stair Master', 'Greatest Stair Master Ever',3000.99,'Delayed' ),

('Exercise Bike', 'Greatest Exercise Bike Ever',499.00,'Shipped' ),
('Workout Mirror', 'Greatest Workout Mirror Club Ever',2000.00,'Delivered' ),
('Stepper', 'Greatest Stepper Ever',15.99,'Delayed' ),

('Cleats', 'Greatest Cleats Ever',89.00,'Shipped' ),
('Socks', 'Greatest Socks Club Ever',14.00,'Delivered' ),
('Sneakers', 'Greatest Sneakers Ever',109.99,'Delayed' ),

('Baseball Mitt', 'Greatest Baseball Mitt Ever',79.00,'Shipped' ),
('Swim Suit', 'Greatest Swim Suit Club Ever',39.00,'Delivered' ),
('Tent', 'Greatest Tent Ever',149.99,'Delayed' );
-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `quantity` int(50) NOT NULL,
  `price` decimal(50,0) NOT NULL,
  `line_item` varchar(255) NOT NULL,
  
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_1`; 
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE; 
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_2`; 
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO `order_details` (order_id, product_id, quantity,price,line_item) VALUES 
(1,1, 89, 86.54, 'asset' ),
(2,2, 25, 789.99, 'liability' ),
(3,3, 101, 852.99, 'asset' ),

(4,4, 89, 77.54, 'asset' ),
(5,5, 25, 89.99, 'liability' ),
(6,6, 101, 20.99, 'asset' ),

(7,7, 89, 39.54, 'asset' ),
(8,8, 25, 79.99, 'liability' ),
(9,9, 101, 30.99, 'asset' ),

(10,10, 89, 90.54, 'asset' ),
(11,11, 25, 119.99, 'liability' ),
(12,12, 101, 2.99, 'asset' ),

(13,13, 89, 45.54, 'asset' ),
(14,14, 25, 55.99, 'liability' ),
(15,15, 101, 65.99, 'asset' ),

(16,16, 89, 68.54, 'asset' ),
(17,17, 25, 23.99, 'liability' ),
(18,18, 101, 11.99, 'asset' );

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--
SET FOREIGN_KEY_CHECKS=1;
DROP TABLE IF EXISTS `purchases`;
CREATE TABLE `purchases` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `cost` decimal(50,0) NOT NULL,
  `payment_date` date NOT NULL,
  `item_received` tinyint(1) NOT NULL,
	PRIMARY KEY(`purchase_id`),
	FOREIGN KEY(`product_id`) REFERENCES `products`(`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;



INSERT INTO `purchases` (product_id, purchase_date, cost, payment_date,item_received) VALUES 
(3, '2015-10-11',9.99,'2020-12-17',1),
(2, '2024-08-09',19.99,'2019-05-04',0 ),
(1, '2020-03-29',190.99,'2018-06-26',1),

(6, '2015-10-11',29.99,'2021-12-17',1),
(5, '2019-08-09',39.99,'2021-05-04',0 ),
(4, '2020-03-29',49.99,'2021-06-26',1),

(9, '2019-10-11',9.99,'2021-12-17',1),
(8, '2018-08-09',19.99,'2021-05-04',0 ),
(7, '2020-03-29',190.99,'2021-06-26',1),

(10, '2015-10-11',20.99,'2021-12-17',1),
(11, '2020-08-09',119.99,'2021-05-04',0 ),
(12, '2020-03-29',190.99,'2021-04-26',1),

(13, '2015-10-11',99.99,'2021-12-17',1),
(14, '2020-08-09',19.99,'2021-06-23',0 ),
(15, '2020-03-29',89.99,'2021-07-25',1),

(16, '2015-10-11',9.99,'2021-11-15',1),
(17, '2018-08-09',19.99,'2021-11-06',0 ),
(18, '2018-02-22',109.99,'2021-06-26',1);



