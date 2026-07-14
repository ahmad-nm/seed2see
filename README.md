# 🌱 Seed2See

> A full-stack e-commerce platform collaboratively developed for an environmental organization to showcase and sell sustainable products including seeds, flower water, soaps, and silk cocoons.

The platform provides a modern shopping experience for customers while offering administrators a complete dashboard to manage users, products, categories, and website activity.

This project was developed as a team collaboration, combining frontend and backend development to deliver a complete e-commerce solution tailored to the client's business workflow.

---

## ✨ Features

### Customer

* Responsive landing page
* Browse products by category
* Product search and filtering
* Product details page
* Shopping cart
* Invoice generation before purchase
* WhatsApp order integration with pre-filled order details
* User registration and authentication
* Email verification
* Password reset
* User profile management
* About and Contact pages

### Administrator

* Dashboard with platform statistics
* Recent activity overview
* User management
* Product management (CRUD)
* Category management (CRUD)
* Secure authentication and authorization

---

## 🛒 Purchase Workflow

Instead of integrating a traditional online payment gateway, the platform generates an order summary (invoice) and redirects customers to WhatsApp with an automatically generated message containing their order details.

This workflow was specifically designed to match the client's business process, allowing orders to be confirmed directly through WhatsApp.

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS Modules
* Axios

### Backend

* Laravel
* Laravel Sanctum
* RESTful APIs
* PHP

### Database

* MySQL

### Development Tools

* Git & GitHub
* Composer
* npm
* Vite

---

## 📸 Screenshots

Screenshots are available in:

```text
![Home](./screenshots/seed2see.com_)
```

Included sections:

* Home
* Products
* Product Details
* Shopping Cart
* Invoice
* Login
* Admin Dashboard
* Product Management
* Category Management
* User Management

---

## 🔐 Authentication

The project uses Laravel Sanctum to provide:

* Login
* Registration
* Email verification
* Password reset
* Protected admin routes

---

## 📈 Admin Dashboard

The administration panel allows administrators to:

* Monitor platform statistics
* View recent activity
* Manage users
* Manage products
* Manage categories

---

## 📱 WhatsApp Ordering

After reviewing the generated invoice, customers can submit their order through WhatsApp using a pre-generated message containing the selected products and order information.

This solution simplifies the ordering process while matching the client's existing workflow.

---

## 💡 Future Improvements

* Online payment gateway integration
* Order history
* Wishlist
* Product reviews
* Inventory management
* Email order notifications
* Sales analytics

---

## 👨‍💻 Authors

Developed collaboratively by:

* Ahmad Naim
* Sanaa Chebbo
