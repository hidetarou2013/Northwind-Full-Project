-- Initial data for Northwind database
INSERT INTO customer (id, company_name, contact_name, contact_title, city, country) VALUES
('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Berlin', 'Germany'),
('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'México D.F.', 'Mexico'),
('ANTON', 'Antonio Moreno Taquería', 'Antonio Moreno', 'Owner', 'México D.F.', 'Mexico'),
('BERGS', 'Berglunds snabbköp', 'Christina Berglund', 'Order Administrator', 'Luleå', 'Sweden'),
('BLAUS', 'Blauer See Delikatessen', 'Hanna Moos', 'Sales Representative', 'Mannheim', 'Germany');

INSERT INTO product (id, name, supplier, category, unit_price, units_in_stock) VALUES
(1, 'Chai', 'Exotic Liquids', 'Beverages', 18.00, 39),
(2, 'Chang', 'Exotic Liquids', 'Beverages', 19.00, 17),
(3, 'Aniseed Syrup', 'Exotic Liquids', 'Condiments', 10.00, 13),
(4, 'Chef Anton''s Cajun Seasoning', 'New Orleans Cajun Delights', 'Condiments', 22.00, 53),
(5, 'Chef Anton''s Gumbo Mix', 'New Orleans Cajun Delights', 'Condiments', 21.35, 0);

INSERT INTO orders (id, customer_id, order_date, required_date, shipped_date, ship_via, freight, ship_city, ship_country) VALUES
(10248, 'ALFKI', '2024-07-04', '2024-08-01', '2024-07-16', 'Federal Shipping', 32.38, 'Berlin', 'Germany'),
(10249, 'ANATR', '2024-07-05', '2024-08-16', '2024-07-10', 'Speedy Express', 11.61, 'Mexico D.F.', 'Mexico'),
(10250, 'ANTON', '2024-07-08', '2024-08-05', '2024-07-12', 'United Package', 65.83, 'Mexico D.F.', 'Mexico'),
(10251, 'BERGS', '2024-07-08', '2024-08-05', '2024-07-15', 'Speedy Express', 41.34, 'Lulea', 'Sweden'),
(10252, 'BLAUS', '2024-07-09', '2024-08-06', '2024-07-11', 'United Package', 51.30, 'Mannheim', 'Germany');
