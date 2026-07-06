# 🌍 Wanderlust -- Full Stack Travel Listing Platform

Wanderlust is a full-stack Airbnb-inspired web application built using
the MVC (Model-View-Controller) architecture.\
Users can explore travel destinations, create listings, view maps, and
manage their accounts securely.

## 🚀 Project Overview

This project demonstrates:

- Backend development with Express & MongoDB
- Authentication & authorization
- RESTful routing
- Map integration using Leaflet
- Responsive UI using Bootstrap
- Clean project structuring using MVC pattern

---

## 🏗️ MVC Architecture Implementation

The project strictly follows the MVC framework:

### 🔹 Model

- Database schemas defined using Mongoose
- Handles MongoDB interactions
- Located inside `/models`

### 🔹 View

- Built using EJS templating engine
- Reusable layouts and partials (navbar, footer, flash)
- Located inside `/views`

### 🔹 Controller

- Route logic separated into route files
- Handles user requests and responses
- Located inside `/routes`

This separation improves: - Code readability - Maintainability -
Scalability

---

## ✨ Features

### 🏠 Listings

- View all travel listings
- Add new listings
- Edit listings
- Delete listings
- View individual listing details

### 🗺️ Map Integration

- Interactive maps using Leaflet.js
- Displays listing location

### 🔐 Authentication & Authorization

- User Signup
- User Login
- Logout functionality
- Session management
- Protected routes

### 💬 Flash Messages

- Success and error alerts using connect-flash

### 💰 Tax Toggle Feature

- Toggle button to display total price after 18% GST

### 📱 Responsive Design

- Fully responsive UI using Bootstrap 5

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- EJS
- JavaScript
- Leaflet.js
- Font Awesome

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- Passport.js
- Express-session
- Connect-flash

### Deployment

- Render
- MongoDB Atlas

---

## 📂 Project Structure

Wanderlust/ │ ├── models/ ├── routes/ ├── views/ │ ├── layouts/ │ ├──
includes/ │ ├── listings/ │ └── users/ ├── public/ │ ├── css/ │ ├── js/
├── utils/ ├── app.js ├── middleware.js ├── package.json └── README.md

---

## ⚙️ Installation

1.  Clone the repository

    git clone https://github.com/AbhishekThite387/Wanderlust.git

2.  Install dependencies

    npm install

3.  Create a `.env` file and add:

    ATLASDB_URL=your_mongodb_connection_string\
    SECRET=your_session_secret

4.  Run the app

    nodemon app.js

App runs on:

http://localhost:8080

---

## 👨‍💻 Author

Abhishek Thite\
GitHub: https://github.com/AbhishekThite387

---

## 📜 License

This project is licensed under the MIT License.
