-- Project Name : postgres-northwind4-nonFK
-- Date/Time    : 2020/06/05 6:27:08
-- Author       : hide
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
*/

-- login_role
--* BackupToTempTable
drop table if exists login_role cascade;

--* RestoreFromTempTable
create table login_role (
  login_role_id bigint not null
  , description character varying(50) not null
  , name character varying(20) not null
  , version bigint
  , constraint login_role_PKC primary key (login_role_id)
) ;

alter table login_role add constraint uk_fbm2l52abvrgpu4sujd1nnv5w
  unique (name) ;

-- nw_categories
--* BackupToTempTable
drop table if exists nw_categories cascade;

--* RestoreFromTempTable
create table nw_categories (
  category_id bigint not null
  , created_by character varying(255)
  , created_date timestamp(6) without time zone
  , description character varying(255)
  , modified_by character varying(255)
  , modified_date timestamp(6) without time zone
  , name character varying(255)
  , version bigint
  , constraint nw_categories_PKC primary key (category_id)
) ;

-- nw_cities
--* BackupToTempTable
drop table if exists nw_cities cascade;

--* RestoreFromTempTable
create table nw_cities (
  city_id bigint not null
  , description character varying(255)
  , version bigint
  , region bigint
  , constraint nw_cities_PKC primary key (city_id)
) ;

-- nw_countries
--* BackupToTempTable
drop table if exists nw_countries cascade;

--* RestoreFromTempTable
create table nw_countries (
  country_id bigint not null
  , description character varying(255)
  , version bigint
  , constraint nw_countries_PKC primary key (country_id)
) ;

-- nw_customer_orders
--* BackupToTempTable
drop table if exists nw_customer_orders cascade;

--* RestoreFromTempTable
create table nw_customer_orders (
  customer_order_id bigint not null
  , close_date timestamp(6) without time zone
  , freight numeric(19, 2)
  , invoice_date timestamp(6) without time zone
  , order_date timestamp(6) without time zone
  , required_date timestamp(6) without time zone
  , ship_address character varying(255)
  , ship_name character varying(255)
  , ship_phone character varying(255)
  , ship_postal_code character varying(255)
  , shipped_date timestamp(6) without time zone
  , status character varying(255)
  , version bigint
  , city bigint
  , country bigint
  , customer bigint
  , employee bigint
  , region bigint
  , shipper bigint
  , constraint nw_customer_orders_PKC primary key (customer_order_id)
) ;

-- nw_customers
--* BackupToTempTable
drop table if exists nw_customers cascade;

--* RestoreFromTempTable
create table nw_customers (
  company_name character varying(255)
  , contact_name character varying(255)
  , contact_title character varying(255)
  , email character varying(255)
  , fax character varying(255)
  , party_id bigint not null
  , constraint nw_customers_PKC primary key (party_id)
) ;

-- nw_employees
--* BackupToTempTable
drop table if exists nw_employees cascade;

--* RestoreFromTempTable
create table nw_employees (
  birth_date timestamp(6) without time zone
  , extension character varying(255)
  , first_name character varying(255)
  , hire_date timestamp(6) without time zone
  , last_name character varying(255)
  , notes character varying(255)
  , photo character varying(255)
  , title character varying(255)
  , party_id bigint not null
  , constraint nw_employees_PKC primary key (party_id)
) ;

-- nw_order_details
--* BackupToTempTable
drop table if exists nw_order_details cascade;

--* RestoreFromTempTable
create table nw_order_details (
  order_detail_id bigint not null
  , discount numeric(19, 2)
  , quantity integer
  , unit_price numeric(19, 2)
  , version bigint
  , customer_order bigint
  , product bigint
  , constraint nw_order_details_PKC primary key (order_detail_id)
) ;

-- nw_parties
--* BackupToTempTable
drop table if exists nw_parties cascade;

--* RestoreFromTempTable
create table nw_parties (
  party_id bigint not null
  , address character varying(255)
  , phone character varying(255)
  , postal_code character varying(255)
  , version bigint
  , city bigint
  , country bigint
  , region bigint
  , constraint nw_parties_PKC primary key (party_id)
) ;

-- nw_products
--* BackupToTempTable
drop table if exists nw_products cascade;

--* RestoreFromTempTable
create table nw_products (
  product_id bigint not null
  , code character varying(255)
  , discontinued boolean
  , name character varying(255)
  , quantity_per_unit character varying(255)
  , reorder_level integer
  , unit_cost numeric(19, 2)
  , unit_price numeric(19, 2)
  , units_in_stock integer
  , version bigint
  , category bigint
  , supplier bigint
  , constraint nw_products_PKC primary key (product_id)
) ;

-- nw_purchase_orders
--* BackupToTempTable
drop table if exists nw_purchase_orders cascade;

--* RestoreFromTempTable
create table nw_purchase_orders (
  purchase_order_id bigint not null
  , order_date timestamp(6) without time zone
  , quantity integer
  , unit_cost numeric(19, 2)
  , version bigint
  , employee bigint
  , product bigint
  , constraint nw_purchase_orders_PKC primary key (purchase_order_id)
) ;

-- nw_regions
--* BackupToTempTable
drop table if exists nw_regions cascade;

--* RestoreFromTempTable
create table nw_regions (
  region_id bigint not null
  , description character varying(255)
  , version bigint
  , country bigint
  , constraint nw_regions_PKC primary key (region_id)
) ;

-- nw_reports
--* BackupToTempTable
drop table if exists nw_reports cascade;

--* RestoreFromTempTable
create table nw_reports (
  report_id bigint not null
  , type character varying(255)
  , version bigint
  , constraint nw_reports_PKC primary key (report_id)
) ;

-- nw_shippers
--* BackupToTempTable
drop table if exists nw_shippers cascade;

--* RestoreFromTempTable
create table nw_shippers (
  shipper_id bigint not null
  , company_name character varying(255)
  , phone character varying(255)
  , version bigint
  , constraint nw_shippers_PKC primary key (shipper_id)
) ;

-- nw_sold_product_view
--* BackupToTempTable
drop table if exists nw_sold_product_view cascade;

--* RestoreFromTempTable
create table nw_sold_product_view (
  id bigint not null
  , version bigint
  , constraint nw_sold_product_view_PKC primary key (id)
) ;

-- nw_stores
--* BackupToTempTable
drop table if exists nw_stores cascade;

--* RestoreFromTempTable
create table nw_stores (
  store_id bigint not null
  , address character varying(255)
  , name character varying(255)
  , phone character varying(255)
  , postal_code character varying(255)
  , version bigint
  , city bigint
  , country bigint
  , region bigint
  , constraint nw_stores_PKC primary key (store_id)
) ;

-- nw_suppliers
--* BackupToTempTable
drop table if exists nw_suppliers cascade;

--* RestoreFromTempTable
create table nw_suppliers (
  supplier_id bigint not null
  , address character varying(255)
  , company_name character varying(255)
  , contact_name character varying(255)
  , contact_title character varying(255)
  , fax character varying(255)
  , phone character varying(255)
  , postal_code character varying(255)
  , version bigint
  , web character varying(255)
  , city bigint
  , country bigint
  , region bigint
  , constraint nw_suppliers_PKC primary key (supplier_id)
) ;

-- user_login
--* BackupToTempTable
drop table if exists user_login cascade;

--* RestoreFromTempTable
create table user_login (
  user_login_id bigint not null
  , from_date timestamp(6) without time zone not null
  , locked boolean
  , need_change_password boolean
  , password character varying(255) not null
  , thru_date timestamp(6) without time zone
  , username character varying(30) not null
  , version bigint
  , constraint user_login_PKC primary key (user_login_id)
) ;

alter table user_login add constraint uk_i7tt0xma046ma8ohj9utt63gw
  unique (username) ;

-- user_login_role
--* BackupToTempTable
drop table if exists user_login_role cascade;

--* RestoreFromTempTable
create table user_login_role (
  user_login_role_id bigint not null
  , version bigint
  , login_role bigint not null
  , user_login bigint not null
  , constraint user_login_role_PKC primary key (user_login_role_id)
) ;

comment on table login_role is 'login_role';
comment on column login_role.login_role_id is 'login_role_id';
comment on column login_role.description is 'description';
comment on column login_role.name is 'name';
comment on column login_role.version is 'version';

comment on table nw_categories is 'nw_categories';
comment on column nw_categories.category_id is 'category_id';
comment on column nw_categories.created_by is 'created_by';
comment on column nw_categories.created_date is 'created_date';
comment on column nw_categories.description is 'description';
comment on column nw_categories.modified_by is 'modified_by';
comment on column nw_categories.modified_date is 'modified_date';
comment on column nw_categories.name is 'name';
comment on column nw_categories.version is 'version';

comment on table nw_cities is 'nw_cities';
comment on column nw_cities.city_id is 'city_id';
comment on column nw_cities.description is 'description';
comment on column nw_cities.version is 'version';
comment on column nw_cities.region is 'region';

comment on table nw_countries is 'nw_countries';
comment on column nw_countries.country_id is 'country_id';
comment on column nw_countries.description is 'description';
comment on column nw_countries.version is 'version';

comment on table nw_customer_orders is 'nw_customer_orders';
comment on column nw_customer_orders.customer_order_id is 'customer_order_id';
comment on column nw_customer_orders.close_date is 'close_date';
comment on column nw_customer_orders.freight is 'freight';
comment on column nw_customer_orders.invoice_date is 'invoice_date';
comment on column nw_customer_orders.order_date is 'order_date';
comment on column nw_customer_orders.required_date is 'required_date';
comment on column nw_customer_orders.ship_address is 'ship_address';
comment on column nw_customer_orders.ship_name is 'ship_name';
comment on column nw_customer_orders.ship_phone is 'ship_phone';
comment on column nw_customer_orders.ship_postal_code is 'ship_postal_code';
comment on column nw_customer_orders.shipped_date is 'shipped_date';
comment on column nw_customer_orders.status is 'status';
comment on column nw_customer_orders.version is 'version';
comment on column nw_customer_orders.city is 'city';
comment on column nw_customer_orders.country is 'country';
comment on column nw_customer_orders.customer is 'customer';
comment on column nw_customer_orders.employee is 'employee';
comment on column nw_customer_orders.region is 'region';
comment on column nw_customer_orders.shipper is 'shipper';

comment on table nw_customers is 'nw_customers';
comment on column nw_customers.company_name is 'company_name';
comment on column nw_customers.contact_name is 'contact_name';
comment on column nw_customers.contact_title is 'contact_title';
comment on column nw_customers.email is 'email';
comment on column nw_customers.fax is 'fax';
comment on column nw_customers.party_id is 'party_id';

comment on table nw_employees is 'nw_employees';
comment on column nw_employees.birth_date is 'birth_date';
comment on column nw_employees.extension is 'extension';
comment on column nw_employees.first_name is 'first_name';
comment on column nw_employees.hire_date is 'hire_date';
comment on column nw_employees.last_name is 'last_name';
comment on column nw_employees.notes is 'notes';
comment on column nw_employees.photo is 'photo';
comment on column nw_employees.title is 'title';
comment on column nw_employees.party_id is 'party_id';

comment on table nw_order_details is 'nw_order_details';
comment on column nw_order_details.order_detail_id is 'order_detail_id';
comment on column nw_order_details.discount is 'discount';
comment on column nw_order_details.quantity is 'quantity';
comment on column nw_order_details.unit_price is 'unit_price';
comment on column nw_order_details.version is 'version';
comment on column nw_order_details.customer_order is 'customer_order';
comment on column nw_order_details.product is 'product';

comment on table nw_parties is 'nw_parties';
comment on column nw_parties.party_id is 'party_id';
comment on column nw_parties.address is 'address';
comment on column nw_parties.phone is 'phone';
comment on column nw_parties.postal_code is 'postal_code';
comment on column nw_parties.version is 'version';
comment on column nw_parties.city is 'city';
comment on column nw_parties.country is 'country';
comment on column nw_parties.region is 'region';

comment on table nw_products is 'nw_products';
comment on column nw_products.product_id is 'product_id';
comment on column nw_products.code is 'code';
comment on column nw_products.discontinued is 'discontinued';
comment on column nw_products.name is 'name';
comment on column nw_products.quantity_per_unit is 'quantity_per_unit';
comment on column nw_products.reorder_level is 'reorder_level';
comment on column nw_products.unit_cost is 'unit_cost';
comment on column nw_products.unit_price is 'unit_price';
comment on column nw_products.units_in_stock is 'units_in_stock';
comment on column nw_products.version is 'version';
comment on column nw_products.category is 'category';
comment on column nw_products.supplier is 'supplier';

comment on table nw_purchase_orders is 'nw_purchase_orders';
comment on column nw_purchase_orders.purchase_order_id is 'purchase_order_id';
comment on column nw_purchase_orders.order_date is 'order_date';
comment on column nw_purchase_orders.quantity is 'quantity';
comment on column nw_purchase_orders.unit_cost is 'unit_cost';
comment on column nw_purchase_orders.version is 'version';
comment on column nw_purchase_orders.employee is 'employee';
comment on column nw_purchase_orders.product is 'product';

comment on table nw_regions is 'nw_regions';
comment on column nw_regions.region_id is 'region_id';
comment on column nw_regions.description is 'description';
comment on column nw_regions.version is 'version';
comment on column nw_regions.country is 'country';

comment on table nw_reports is 'nw_reports';
comment on column nw_reports.report_id is 'report_id';
comment on column nw_reports.type is 'type';
comment on column nw_reports.version is 'version';

comment on table nw_shippers is 'nw_shippers';
comment on column nw_shippers.shipper_id is 'shipper_id';
comment on column nw_shippers.company_name is 'company_name';
comment on column nw_shippers.phone is 'phone';
comment on column nw_shippers.version is 'version';

comment on table nw_sold_product_view is 'nw_sold_product_view';
comment on column nw_sold_product_view.id is 'id';
comment on column nw_sold_product_view.version is 'version';

comment on table nw_stores is 'nw_stores';
comment on column nw_stores.store_id is 'store_id';
comment on column nw_stores.address is 'address';
comment on column nw_stores.name is 'name';
comment on column nw_stores.phone is 'phone';
comment on column nw_stores.postal_code is 'postal_code';
comment on column nw_stores.version is 'version';
comment on column nw_stores.city is 'city';
comment on column nw_stores.country is 'country';
comment on column nw_stores.region is 'region';

comment on table nw_suppliers is 'nw_suppliers';
comment on column nw_suppliers.supplier_id is 'supplier_id';
comment on column nw_suppliers.address is 'address';
comment on column nw_suppliers.company_name is 'company_name';
comment on column nw_suppliers.contact_name is 'contact_name';
comment on column nw_suppliers.contact_title is 'contact_title';
comment on column nw_suppliers.fax is 'fax';
comment on column nw_suppliers.phone is 'phone';
comment on column nw_suppliers.postal_code is 'postal_code';
comment on column nw_suppliers.version is 'version';
comment on column nw_suppliers.web is 'web';
comment on column nw_suppliers.city is 'city';
comment on column nw_suppliers.country is 'country';
comment on column nw_suppliers.region is 'region';

comment on table user_login is 'user_login';
comment on column user_login.user_login_id is 'user_login_id';
comment on column user_login.from_date is 'from_date';
comment on column user_login.locked is 'locked';
comment on column user_login.need_change_password is 'need_change_password';
comment on column user_login.password is 'password';
comment on column user_login.thru_date is 'thru_date';
comment on column user_login.username is 'username';
comment on column user_login.version is 'version';

comment on table user_login_role is 'user_login_role';
comment on column user_login_role.user_login_role_id is 'user_login_role_id';
comment on column user_login_role.version is 'version';
comment on column user_login_role.login_role is 'login_role';
comment on column user_login_role.user_login is 'user_login';

