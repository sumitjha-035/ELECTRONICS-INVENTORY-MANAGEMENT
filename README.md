# Electronic Inventory Management

> **Author:** Sumit Jha

A full-stack **Electronic Inventory Management** system built with:

- **Backend:** Node.js + Express + MongoDB
- **Frontend:** React (Vite) + Tailwind CSS

This project is designed to help you track electronics inventory, view purchase history, and filter products using a clean UI.

---

## 🌟 Introduction

Electronic Inventory Management (EIM) is a lightweight inventory system that lets you:

- Store product details (ID, name, brand, type, stock, price, purchase date, and color)
- Track stock levels and calculate inventory value
- Filter and report on purchases by year or brand
- Perform full CRUD operations via API (Create, Read, Update, Delete)

This repo is structured as a standalone backend API and a frontend UI that consumes it.

---

## ✅ Features

- View a list of inventory items
- Filter inventory by brand
- View purchase report by year
- Calculate stock value (`selling_price * stock_in`)
- Full CRUD API for managing products
- Responsive UI with dark/light styling (Tailwind)

---

## 🖥️ User Interface (Pages)

### 🏠 Home Page

Displays all products and offers navigation to key views.

### 🧩 Inventory Page (FunctionPage)

- Filter by brand
- See per-item stock, price, and total value

### 📊 Purchase Report (PurchasedPage)

- Filter by year
- View purchase date, stock count, and total entries

### 🧾 Product Detail (ProductDetailPage)

- View detailed info on a specific product (if enabled)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Vite, Tailwind CSS
- **API:** RESTful endpoints (JSON)

---

## 🗂️ Project Structure

```
backend/
  ├─ .env                    # Environment variables (MONGO_URI, PORT)
  ├─ package.json
  ├─ package-lock.json
  └─ src/
      ├─ server.js
      ├─ config/
      │   └─ db.js
      ├─ controllers/
      │   └─ electronicController.js
      ├─ models/
      │   └─ electronicModels.js
      └─ routes/
          └─ electronicRoutes.js

frontend/
  ├─ package.json
  ├─ package-lock.json
  ├─ index.html
  ├─ vite.config.js
  ├─ tailwind.config.js
  ├─ postcss.config.js
  ├─ eslint.config.js
  ├─ public/                # Static assets served by Vite
  ├─ README.md              # Frontend-specific docs (optional)
  └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ index.css
      ├─ lib/
      │   ├─ axios.js
      │   └─ utils.js
      ├─ components/
      │   ├─ Navbar.jsx
      │   ├─ ProductCard.jsx
      │   └─ ProductNotFound.jsx
      └─ pages/
          ├─ HomePage.jsx
          ├─ FunctionPage.jsx
          ├─ PurchasedPage.jsx
          ├─ ProductDetailPage.jsx
          └─ CreatePage.jsx
```

---

## ⚙️ Setup & Run

### 1) Prerequisites

- Node.js (v16+)
- npm (bundled with Node.js)
- MongoDB (local or remote) — set `MONGO_URI` in `backend/.env`

### 2) Configure Environment

Create a `.env` file in `backend/` with:

```env
MONGO_URI=your_mongo_connection_string
PORT=3001
```

### 3) Run Backend

```bash
cd backend
npm install
npm start
```

The API will run by default at `http://localhost:3001`.

### 4) Run Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run by default at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Path               | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/electronics`     | Get all products           |
| GET    | `/electronics/:id` | Get a product by ID        |
| POST   | `/electronics`     | Create a new product       |
| PUT    | `/electronics/:id` | Update an existing product |
| DELETE | `/electronics/:id` | Delete a product           |

> API logic lives in `backend/src/controllers/electronicController.js` and routes in `backend/src/routes/electronicRoutes.js`.

---

## 🧩 Extending the Project

Some natural improvements:

- Add authentication (login, roles)
- Add UI forms to create/update products
- Add search and pagination
- Add export (CSV/Excel) for reports
- Improve error handling and loading states

---

## 🙋 Author

**Sumit Jha**
