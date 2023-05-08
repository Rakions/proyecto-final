create table Employees (
  employee_id number NOT NULL PRIMARY KEY ,
  salary number,
  hire_date date,
  position varchar2(30),
  user_id number
);

create table Cafe_users(
  user_id number not null PRIMARY KEY,
  user_name varchar2(30),
  surname varchar2(50),
  email varchar2(50),
  password varchar2(50),
  username varchar2(30),
  phone number,
  last_connection date
);

create table Orders(
  orders_id number not null PRIMARY KEY,
  user_id number,
  order_date date,
  address varchar2(100),
  total_price int
);

create table Order_details(
  orders_id number,
  product_id number,
  quantity number
);


create table Products(
  products_id number not null PRIMARY KEY,
  product_name varchar2(20),
  product_description varchar2(200),
  stock number,
  valorations number,
  category_id number,
  prize number
);

create table Categories(
  category_id number not null PRIMARY KEY,
  category_name varchar2(30)
);

alter table EMPLOYEES
add foreign key (user_id) references cafe_users(user_id);

alter table ORDERS
add FOREIGN key (user_id) REFERENCES cafe_users(user_id);

alter table ORDER_DETAILS
add FOREIGN KEY (ORDERS_ID) REFERENCES ORDERS(ORDERS_ID);

alter table ORDER_DETAILS
add FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCTS_ID);

alter table PRODUCTS
add FOREIGN key (CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID);