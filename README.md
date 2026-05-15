# 🚗 Car Rental Booking System

A full-stack car rental web application built with the MERN stack. Users can search for available vehicles by date range, make reservations, and manage their bookings. Admins can manage the fleet and monitor reservations.

> ⚠️ **Status:** Frontend in progress — backend API is complete and functional.

---


## ✨ Features

### Customer
- 🔍 Search available vehicles by date range, category, transmission, and price
- 📅 Date-range conflict detection — no double bookings possible
- 🔐 Register / Login with JWT authentication
- 📋 View reservation history with status tracking (pending / confirmed / cancelled)
- ❌ Cancel pending reservations

### Admin
- 🚙 Full CRUD for vehicle fleet management
- 📊 Dashboard with total revenue, active reservations, and top vehicles
- 🔒 Role-based access — admin routes are protected server-side

---

## 🛠️ Tech Stack

### Frontend *(in progress)*
| Technology | Usage |
|---|---|
| React.js | UI components and routing |
| Tailwind CSS | Styling and responsive design |
| React Context API | Global auth state |
| Axios | HTTP client with JWT interceptors |

### Backend
| Technology | Usage |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT | Stateless authentication |
| bcryptjs | Password hashing |

---

## 🏗️ API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create account | Public |
| POST | `/api/auth/login` | Login → JWT | Public |
| GET | `/api/auth/me` | Current user | 🔐 |

### Vehicles
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/vehicles` | List available vehicles (+ filters) | Public |
| GET | `/api/vehicles/:id` | Vehicle detail | Public |
| POST | `/api/vehicles` | Add vehicle | 🔐 Admin |
| PUT | `/api/vehicles/:id` | Update vehicle | 🔐 Admin |
| DELETE | `/api/vehicles/:id` | Delete vehicle | 🔐 Admin |

### Reservations
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/reservations` | My reservations | 🔐 |
| POST | `/api/reservations` | Create reservation | 🔐 |
| DELETE | `/api/reservations/:id` | Cancel reservation | 🔐 |
| GET | `/api/admin/reservations` | All reservations | 🔐 Admin |
| GET | `/api/admin/stats` | Dashboard stats | 🔐 Admin |

---

## 📁 Project Structure

```
├── frontend/               # React app (in progress)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── utils/
│
└── backend/
    ├── models/
    │   ├── User.js
    │   ├── Vehicle.js
    │   └── Reservation.js
    ├── routes/
    │   ├── auth.js
    │   ├── vehicles.js
    │   ├── reservations.js
    │   └── admin.js
    ├── middleware/
    │   └── auth.js           # JWT protect + adminOnly
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/kassab-ma/<repo-name>.git
cd <repo-name>
```

### 2. Setup the backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

```bash
npm start
```

### 3. Setup the frontend *(once complete)*
```bash
cd frontend
npm install
npm start
```

---

## 🔐 Key Technical Decisions

### Date conflict detection
The core challenge of any booking system is preventing double bookings.

Two date intervals **[A, B]** and **[C, D]** overlap when:
```
A < D  AND  B > C
```

In MongoDB query:
```javascript
const conflict = await Reservation.findOne({
  vehicleId,
  status: { $in: ['pending', 'confirmed'] },
  startDate: { $lt: requestedEndDate },
  endDate:   { $gt: requestedStartDate }
});

if (conflict) {
  return res.status(409).json({ message: 'Vehicle not available for these dates' });
}
```

This check runs **twice**:
1. In the availability search — to filter out unavailable vehicles
2. Before creating a reservation — as a final validation

### Server-side total price calculation
The total is never trusted from the client. It's always computed as:
```javascript
const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
const total = vehicle.pricePerDay * days;
```

### Role-based access
Two middleware functions:
- `protect` — verifies JWT token, attaches `req.user`
- `adminOnly` — checks `req.user.role === 'admin'`, returns 403 otherwise

---

## 📌 Roadmap
- [x] Backend API complete
- [x] JWT authentication
- [x] Date conflict detection
- [x] Admin stats endpoint
- [ ] Frontend — vehicle search page
- [ ] Frontend — reservation flow
- [ ] Frontend — user dashboard
- [ ] Frontend — admin panel
- [ ] Deployment (Vercel / Railway)
- [ ] Docker + CI/CD

---

## 👤 Author

**KASSAB Mohamed Amine**  
ESI — Computer Engineering Student (1CS)
📧 nm_kassab@esi.dz  
🔗 [LinkedIn](https://linkedin.com) · [GitHub](https://github.com/kassab-ma)
