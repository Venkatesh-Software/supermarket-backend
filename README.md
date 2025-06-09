# 🛒 Supermarket Inventory & Billing Backend


## 🚀 Features

### 🗂 Inventory

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/inventory/add`         | Add a new inventory item |
| PATCH  | `/api/inventory/:itemId`     | Update an item by ID |
| GET    | `/api/inventory`             | Get all items (supports pagination & search) |
| GET    | `/api/inventory/:itemId`     | Get a single item by ID |
| DELETE | `/api/inventory/:itemId`     | Delete an item by ID |

### 🧾 Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/bills/create`          | Create a new bill |
| GET    | `/api/bills`                 | Get all bills (pagination supported) |
| GET    | `/api/bills/:billId`         | Get a single bill by ID |
| DELETE | `/api/bills/:billId`         | Delete a bill by ID |
| DELETE | `/api/bills`                 | Delete all bills |
| DELETE | `/api/bills/item/:itemId`    | Delete item by ID (same as inventory delete) |

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Auth (planned)
- Vercel for hosting
- GitHub for source control

---

## 🛡️ Security

- `dotenv` for managing secrets
- `.env` file stores `MONGO_URI`
- JWT authentication planned (ensure tokens are passed via headers)
- Never commit `.env` or credentials

---

## 🧪 Testing Locally

1. Install dependencies:

```bash
npm install
