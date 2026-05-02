# 🚀 Notification & Scheduling System

A backend system that demonstrates **algorithmic optimization, scalable system design, and structured API development**.

This project implements:

* A vehicle maintenance scheduler using optimization techniques
* A priority-based notification system
* Logging and monitoring mechanisms
* Scalable backend architecture principles

---

## 📦 Features

### 🔧 Vehicle Maintenance Scheduler

* Fetches depot and vehicle data from external APIs
* Uses **0/1 Knapsack (Dynamic Programming)** to maximize impact under time constraints
* Ensures optimal task selection per depot

---

### 🔔 Notification System (Priority Inbox)

* Retrieves notifications via API
* Assigns priority based on:

  * Notification type (Placement, Result, Event)
  * Recency (timestamp decay)
* Uses a **Min Heap** to efficiently extract top N notifications

---

### 📊 Logging System

* Centralized logging with:

  * stack, level, package, message
* Console + API-based logging
* Graceful handling of logging failures

---

## 🧠 Tech Stack

* **Node.js (Express)**
* **JavaScript (ES6)**
* **Axios** (API communication)
* **Dynamic Programming**
* **Heap Data Structure**

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash id="y68sjt"
npm install
```

---

### 2. Configure environment variables

Create a `.env` file:

```env id="x6gh38"
AUTH_TOKEN=your_api_token_here
```

---

### 3. Run the server

```bash id="48vcik"
node app.js
```

---

## 🔌 API Endpoints

### 🔹 Health Check

```http id="mdd12f"
GET /
```

---

### 🔹 Run Scheduler

```http id="u41y2l"
GET /scheduler
```

Returns optimized task allocation per depot.

---

### 🔹 Top Notifications

```http id="7sljpf"
GET /notifications/top
```

Returns top 10 notifications based on priority and recency.

---

## 🧠 Key Concepts Used

* **0/1 Knapsack Algorithm** for optimization
* **Min Heap** for efficient top-N selection
* **Scoring Function** combining priority + time decay
* **REST API Design Principles**
* **Error Handling & Resilience**

---

## ⚡ Performance Considerations

* Avoids full sorting using heap (O(n log k))
* Uses pagination and filtering strategies
* Handles API failures gracefully
* Designed for scalability and modularity

---

## 🔒 Notes

* External APIs require valid authentication tokens
* Logging failures do not affect core functionality
* System is designed to work with dynamic input data

---

## ✅ Summary

This project demonstrates:

* Strong problem-solving using algorithms
* Clean and modular backend architecture
* Efficient data processing techniques
* Scalable system design principles

---
