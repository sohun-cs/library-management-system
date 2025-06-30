# 📚 Library Management System API

A RESTful API for managing a digital library system, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This system allows you to manage books, borrow books, track availability, and summarize borrowed data efficiently.

---

## 🚀 Features

- 📘 **Books CRUD**
  - Create, read, update, and delete books
  - Validations with meaningful error messages
  - Filter books by genre, sort by fields, and limit results

- 📦 **Borrow Books**
  - Borrow available books
  - Quantity enforcement & automatic availability control

- 📊 **Borrow Summary**
  - Aggregation pipeline to summarize total borrowed quantity per book

- 🛡️ **Robust Validation**
  - Schema-level and request-level validations
  - Error handling for validation, duplicates, and 404s

- ⚙️ **Mongoose Features**
  - Static and instance methods
  - Pre/post middleware

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Nodemon** for development

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/sohun-cs/library-management-system.git

```

### 2. Install the node

```
npm install
```

### 3. Configure environment variables
Create a .env file  and in the .env file write the following:

```
DB_PORT=3000
DB_URI=http://localhost:3000
```

### 4. Run the server (Dev)

```
npm run dev
```

---
