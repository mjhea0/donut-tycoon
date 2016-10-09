# Donut Tycoon

In this assessment, you'll build a RESTful, database-driven, HTTP server.

## Plot

Congratulations! Your name was found in the will of a deceased donut tycoon.  Apparently she had no next of kin, and your name was the first result on google when she searched 'booyah'. Naturally, she placed YOU as the heir to all of her donut shops before she passed. Now the fate of 'dozens' of donut shops lies in your capable coding hands. You must create an app that will allow you to manage your donut shops and keep track of employees. Donut let us down!

**Time:** One Day

**Success Criteria:**
 - Build CRUD apps in Express
 - Access data using an ORM / Knex
 - Design and implement schemas
 - Access data in datastores through joins
 - Design and implement a RESTful API

**Bonus:**
 - Write tests in a TDD style using Mocha Chai

## Getting Started

1. Create a new project directory
1. Set up Express
1. Bonus: set up tests

## Overview

Your app consists of three resources: shops, employees, and donuts.

### Business Rules

- Shops have many donuts, many donuts belong to many shops
- Shops have many employees, employee belongs to a shop
- Employee has one favorite donut

### Tables

|shop
|----------------
|id
|name (text)
|city (text)

|donut
|----------------
|id
|name (text)
|topping (text)
|price (int)

|shop_donut
|----------------
|id
|shop_id (fk)
|donut_id (fk)

|employee
|----------------
|id
|first_name (text)
|last_name (text)
|email (text)
|favorite_donut (fk)
|shop_id (fk)

## Shop Routes and Pages

### Shop Routes

| Route Name     | Request Method | Example Request URL |  Route                   
|----------------|----------------|---------------------|----------------------
| shop index     | `GET`          | `/shops`            |  `/shops`
| shop show page | `GET`          | `/shops/1/show`     |  `/shops/:shop_id`
| shop edit      | `GET`          | `/shops/1/edit`     |  `/shops/:shop_id/edit`
| shop update    | `PUT/PATCH`    | `/shops/1/`         |  `/shops/:shop_id`
| shop new page  | `GET`          | `/shops/new`        |  `/shops/new`
| shop create    | `POST`         | `/shops`            |  `/shops`
| shop destroy   | `DELETE`       | `/shops/1`          |  `/shops/:shop_id`

### Shop Pages

**Shop index page**
 - This is your home page
 - Lists all of the shops
 - Has a button to the new shop page
 - Each shop listing should be a clickable link to the **shop show page**
 - Has buttons to the **shop edit page** and the **shop delete route** for each shop

**Shop new page**
 - Has a form with form fields that match the columns in your shops table
 - Submit button goes to the **shop create** route which creates the new shop, and goes back to the index page

**Shop edit page**
 - Has a form that is populated with a single shop's information, based on the shop id in the route
 - Submit button that goes to the **shop update** route which updates the shop and goes back to the show page for that shop.

**Shop show page**
 - Shows all of the details of shop including the donuts they carry (comes from the donuts table), and employees (comes from employee table)
 - Has link to **shop employee index**
 - Has link to **shop employee show page**
 - Has link to **shop donut show page**

## Employee Routes and Pages

| Route Name     | Request Method | Example Request URL |  Route                   
|----------------|----------------|---------------------|----------------------
| employee index page | `GET`  | `/employees`            |  `/employees`
| employee show page | `GET`| `/employees/1/show`  |  `/employees/:employee_id`
| employee edit page | `GET`| `/employees/1/edit`  |  `/employees/:employee_id/edit`
| employee update | `PUT/PATCH`| `/employees/1`  |  `/employees/:employee_id`
| employee new page | `GET`| `/employees/new`  |  `/employees/new`
| employee create | `POST`| `/employees`  |  `/employees`
| employee destroy | `DELETE`| `/employees`  |  `/employees`

 **Shop employee index page**
  - Has listing of all of the employees for that shop
  - **The rest of the employee pages are pretty much the same as shop except with employees for that shop_id**


## Donut Routes and Pages

### Donut Routes

| Route Name     | Request Method | Example Request URL |  Route                   
|----------------|----------------|---------------------|----------------------
| donut index     | `GET`          | `/donuts`            |  `/donuts`
| donut show page | `GET`          | `/donuts/1/show`     |  `/donuts/:donut_id`
| donut edit      | `GET`          | `/donuts/1/edit`     |  `/donuts/:donut_id/edit`
| donut update    | `PUT/PATCH`    | `/donuts/1/`         |  `/donuts/:donut_id`
| donut new page  | `GET`          | `/donuts/new`        |  `/donuts/new`
| donut destroy   | `DELETE`       | `/donuts`            |  `/donuts`
| donut create    | `POST`         | `/donuts`            |  `/donuts`

### Donut Pages

**Donut index page**
- Lists all of the donuts.
- Has a button to the new donut page.
- Each donut listing should be a clickable link to the **donut show page**.
- Has buttons to the **donut edit page** and the **donut delete route** for each donut.

**Donut new page**
- Has a form with form fields that match the columns in your donuts table
- Submit button goes to the **donut create** route which creates the new donut, and goes back to the index page

**Donut edit page**
- Has a form that is populated with a single donut's information, based on the donut id in the route
- Submit button that goes to the **donut update** route which updates the donut and goes back to the show page for that donut.

**Donut show page**
- Shows all of the details of donut including which shops carry it (comes from the shops table)

![](http://i.giphy.com/BITvRdLetPEf6.gif)