# 🐝 CargoBee — Your City. Your Cargo. On Demand.

---

## 📌 The Problem Statement

Booking cargo vehicles for everyday consumers remains a frustratingly broken experience compared to passenger transport:

- **No on-demand platform exists** for consumers needing to transport single items like furniture, appliances, or bulk purchases across the city using small cargo tempos or pickup trucks.
- **Price opacity and haggling** — consumers are forced to negotiate rates directly with unorganized tempo drivers at roadsides, with zero fare transparency or standardized pricing.
- **No digital convenience** — there is no app-based booking, live tracking, or digital payment option; everything happens over phone calls or in person.
- **Trust and safety gap** — drivers are completely unverified, leaving consumers with no background checks, ratings, or accountability mechanisms.
- **Inefficiency for drivers** — tempo and pickup truck operators lack a centralized platform to receive bookings, manage trips, and track earnings, resulting in idle time and lost income.

---

## ✅ Solution

CargoBee is a full-stack, on-demand cargo booking platform that bridges the gap between consumers and verified cargo vehicle drivers:

1. **Instant Booking** — Consumers can book a Mini Tempo, Pickup Truck, or E-Cart in under 2 minutes through a clean, app-like web interface.
2. **Transparent Fare Estimation** — Upfront fare breakdown shown before booking, including base fare, distance charge, surcharges, and GST — no surprises.
3. **Verified Driver Network** — Only verified, insured drivers are onboarded; each driver profile displays ratings, vehicle details, and delivery count.
4. **Live GPS Tracking** — Real-time tracking of the driver's location from pickup to drop-off, with ETA updates and share-trip functionality.
5. **Multiple Vehicle Types** — Choose from Mini Tempo (₹249), Pickup Truck (₹599), or E-Cart (₹249) depending on cargo size and type.
6. **Digital Payments** — Secure UPI, PhonePe, and GPay payment integration via Razorpay with auto-generated PDF receipts.
7. **Driver Dashboard** — Drivers get a dedicated dashboard to accept/decline rides, track daily earnings, and manage their active trips.
8. **Ratings & Feedback** — Post-trip rating system with tags (On Time, Careful Goods, Polite, Quick Route) to maintain quality and trust.

---

## 👥 User Roles

### 🛍️ Consumer
- Register/Login via phone OTP or Google
- Enter pickup and drop-off addresses with Google Maps autocomplete
- Select vehicle type and cargo category (Boxes, Furniture, Electronics, Other)
- View fare estimate and book instantly
- Track driver in real time on a live map
- Pay digitally and download PDF receipt
- Rate the driver and view trip history

### 🚛 Driver
- Register and go Online/Offline with a toggle
- Receive incoming booking alerts with a 60-second countdown to Accept or Decline
- Navigate to pickup using the integrated map
- Start and complete trips with photo upload confirmation
- View real-time earnings, trip history, and performance stats on a dedicated dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | Firebase / Google Login |
| **Payments** | Razorpay |
| **Maps** | Google Maps API |
| **Deployment — Frontend** | Vercel |
| **Deployment — Backend** | Render |

### 🎨 Design (Figma Prototype)
> View the full interactive prototype here:
> [CargoBee Figma Prototype](https://www.figma.com/proto/wDNO99XbxdTpCqD2XUk1JJ/Untitled?node-id=323-2018&p=f&viewport=18123%2C66%2C0.6&t=ZFzdPOK6sLKTwtSm-1&scaling=contain&content-scaling=fixed&starting-point-node-id=323%3A2018&page-id=0%3A1)

---

## 📁 Project Structure

```
cargobee/
├── frontend/                      # React.js Frontend
│   ├── public/
│   └── src/
│       ├── assets/                # Images, icons, logos
│       ├── components/            # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── VehicleCard.jsx
│       │   ├── MapView.jsx
│       │   ├── DriverCard.jsx
│       │   └── RatingWidget.jsx
│       ├── pages/
│       │   ├── SplashScreen.jsx
│       │   ├── Onboarding.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Home.jsx           # Booking screen
│       │   ├── AddressSearch.jsx
│       │   ├── DriverMatching.jsx
│       │   ├── DriverConfirmed.jsx
│       │   ├── LiveTracking.jsx
│       │   ├── TripCompletion.jsx
│       │   ├── RateExperience.jsx
│       │   ├── TripHistory.jsx
│       │   └── driver/
│       │       └── DriverDashboard.jsx
│       ├── context/               # Global state (Auth, Booking)
│       ├── hooks/                 # Custom React hooks
│       ├── services/              # API call functions
│       ├── App.jsx
│       └── main.jsx
│
├── backend/                       # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── firebase.js            # Firebase admin setup
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── driverController.js
│   │   ├── tripController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # Firebase token verification
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Driver.js
│   │   ├── Booking.js
│   │   └── Trip.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── tripRoutes.js
│   │   └── paymentRoutes.js
│   ├── utils/
│   │   └── fareCalculator.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Routes

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login with Firebase ID token |
| `POST` | `/api/auth/register` | Register new user (consumer or driver) |
| `GET` | `/api/auth/me` | Get current logged-in user profile |

### Booking Routes — `/api/bookings`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings/create` | Create a new booking request |
| `GET` | `/api/bookings/:id` | Get booking details by ID |
| `PUT` | `/api/bookings/:id/cancel` | Cancel a booking |
| `GET` | `/api/bookings/fare-estimate` | Get fare estimate (pickup, drop, vehicle type) |

### Driver Routes — `/api/drivers`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/drivers/nearby` | Get nearby available drivers |
| `PUT` | `/api/drivers/status` | Toggle driver online/offline status |
| `POST` | `/api/drivers/accept/:bookingId` | Driver accepts a booking request |
| `POST` | `/api/drivers/decline/:bookingId` | Driver declines a booking request |
| `GET` | `/api/drivers/dashboard` | Get driver's dashboard stats and earnings |

### Trip Routes — `/api/trips`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | Get all trips for the logged-in user |
| `GET` | `/api/trips/:id` | Get single trip detail |
| `PUT` | `/api/trips/:id/start` | Driver starts the trip |
| `PUT` | `/api/trips/:id/complete` | Driver marks the trip as complete |
| `POST` | `/api/trips/:id/rate` | Consumer submits a trip rating |

### Payment Routes — `/api/payments`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments/create-order` | Create Razorpay payment order |
| `POST` | `/api/payments/verify` | Verify Razorpay payment signature |
| `GET` | `/api/payments/receipt/:tripId` | Download PDF receipt for a completed trip |

---

## 🚀 Steps to Run the Project Locally

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas URI)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cargobee.git
cd cargobee
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the backend server:

```bash
npm run dev
```

> Server will run at `http://localhost:5000`

---

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend` with the following variables:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend development server:

```bash
npm run dev
```

> App will run at `http://localhost:5173`

---

### 4. Open in Browser

Visit `http://localhost:5173` and you should see the CargoBee Splash Screen. 🎉

---

## 📄 License

This project is built as an academic class project. All UI designs are original and created in Figma.
