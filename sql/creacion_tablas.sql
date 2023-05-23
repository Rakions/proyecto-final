create table employees (
  employee_id number not null PRIMARY key ,
  employee_name varchar2(30),
  employee_surname varchar2(100),
  email varchar2(100),
  password varchar2(100),
  phone VARCHAR2(20),
  salary number,
  position varchar2(100),
  hire_date date
);

create table cafe_users(
  user_id number not null PRIMARY KEY,
  user_name varchar2(30),
  user_surname varchar2(50),
  email varchar2(50),
  password varchar2(50),
  username varchar2(30),
  phone varchar2(20),
  last_connection date
);

create table orders(
  orders_id number not null PRIMARY KEY,
  user_id number,
  shop_id number,
  order_date date,
  address varchar2(100),
  total_price int,
  state VARCHAR(30)
);

create table orders_employees(
  employee_id number,
  orders_id number
);

create table shops(
  shop_id number not null PRIMARY KEY,
  shop_name varchar2(100),
  location varchar2(50),
  address varchar2(100),
  phone varchar2(20),
  email varchar2(100)
);

create table shop_products(
  shop_id number,
  product_id NUMBER
);

create table order_details(
  orders_id number,
  product_id number,
  quantity number
);

create table products(
  products_id number not null PRIMARY KEY,
  product_name varchar2(20),
  product_description varchar2(200),
  stock number,
  reviews number,
  category_id number,
  price number,
  image_url varchar2(300)
);

create table categories(
  category_id number not null PRIMARY KEY,
  category_name varchar2(30)
);

create table sessions(
  user_id number,
  token varchar2(100)
);


alter table orders add CONSTRAINT fk_orders_shopId
FOREIGN key (shop_id) REFERENCES shops(shop_id);

alter table orders add CONSTRAINT fk_orders_userId
FOREIGN key (user_id) REFERENCES cafe_users(user_id);

alter table orders_employees add CONSTRAINT fk_orders_employees_employeeId
FOREIGN key (employee_id) REFERENCES employees(employee_id);

alter table orders_employees add CONSTRAINT fk_order_employees_orderId
FOREIGN key (orders_id) REFERENCES orders(orders_id);

alter table order_details add CONSTRAINT fk_order_details_orderId
FOREIGN key (orders_id) REFERENCES orders(orders_id);

alter table products add CONSTRAINT fk_products_categoryId
FOREIGN key (category_id) REFERENCES categories(category_id);

alter table shop_products add CONSTRAINT fk_shop_products_shopId
FOREIGN key (shop_id) REFERENCES shops(shop_id);

alter table shop_products add CONSTRAINT fk_shop_products_productId
FOREIGN KEY (product_id) REFERENCES products(products_id);

alter table sessions add CONSTRAINT fk_sessions_userId
FOREIGN KEY (user_id) REFERENCES cafe_users(user_id);