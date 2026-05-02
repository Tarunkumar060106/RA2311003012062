# Stage 1 - Notification System API Design

## Overview
The RESTful notification service that allows users to fetch, manage and receive real-time notifications related to placements, events and results.

---

## Core Actions
The notification system supports the following operations:

* Fetch notifications
* Mark as read
* Mark all as read
* Create a notification(internal use)
* Receive real-time notifications

---

## API Endpoints
### 1. Get notifications
```http
GET /notifications
Authorization: Bearer <token>
```

#### Query Parameters

```json
{
  "page": 1,
  "limit": 20,
  "unreadOnly": false
}
```

#### Response
```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "Result",
      "message": "mid-sem results announced",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 120
  }
}
```

---

### 2. Mark as Read
```http
PATCH /notifications/:id/read
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true
}
```

---

### 3. Mark all as read
```http
PATCH /notifications/read-all
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true
}
```

---

### 4. Create notificatoin(internal use)
```http
POST /notifications
Authorization: Bearer <token>
```

#### Request Body

```json
{
  "studentId": 123,
  "type": "Placement",
  "message": "You are shortlisted for the next round"
}
```

#### Response

```json
{
  "success": true,
  "notificationId": "uuid"
}
```

---

## Design Principles Used:
* **Restful design**
* **Consistent naming conventions**
* **Stateless communication**
* **Pagination support & filtering support**

---

## Real-Time Notification Mechanism

### Approach => Websockets
Websockets provide real-time updates which is better than repeated polling

### Flow:
1. Client establishes a websocket connection after login
2. Server maintains a connection mapped to each user
3. When new notification is generated:
    * It is stored in db
    * It is pushed to client via websocket

## Benefits:
* Instant notification delivery
* Reduced server load
* Better user experience

## Summary
This design ensures:
* Real-time delivery using webscokets
* Clear seperation between internal and user-facing APIs
* Scalable and clean API structure using pagination for fetching


# Stage 2 — Database Design and Scaling

## Database Choice

I propose using **PostgreSQL** as the primary database.

### Reasons:

* Structured relational data => notifications tied to the user
* Strong support for indexing and querying
* ACID compliance ensures reliability
* Efficient handling of filtering and sorting queries

---

## Schema Design

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Indexing Strategy

To optimize frequent queries:

```sql
CREATE INDEX idx_notifications_user_read_created
ON notifications (student_id, is_read, created_at DESC);
```

### Benefits:

* Fast retrieval of unread notifications
* Efficient sorting by timestamp
* Avoids full table scans

---

## Queries

### 1. Fetch Notifications

```sql
SELECT id, message, type, is_read, created_at
FROM notifications
WHERE student_id = 1042
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

---

### 2. Fetch Unread Notifications

```sql
SELECT id, message, type, created_at
FROM notifications
WHERE student_id = 1042 AND is_read = false
ORDER BY created_at DESC
LIMIT 20;
```

---

### 3. Mark Notification as Read

```sql
UPDATE notifications
SET is_read = true
WHERE id = 'uuid';
```

---

### 4. Mark All as Read

```sql
UPDATE notifications
SET is_read = true
WHERE student_id = 1042 AND is_read = false;
```

---

## Challenges at Scale

As the system grows to millions of notifications:

* Increased query latency
* Large table scans
* High memory usage
* Slower sorting operations

---

## Solutions

### 1. Indexing

Improves query performance significantly.

---

### 2. Pagination

Limits result size and reduces load.

---

### 3. Table Partitioning

Partition data by:

* student_id (hash partitioning)
* or created_at (time-based partitioning)

---

### 4. Archiving

Move old notifications to a separate table to reduce load on the main table.

---

## Summary

This design ensures:

* Efficient query performance through indexing
* Scalability via partitioning and archiving
* Reliable storage using PostgreSQL
* Optimized read operations for large datasets

---


