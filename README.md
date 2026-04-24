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
- Register / Login via phone OTP or Google Login (Firebase)
- Enter pickup and drop-off addresses with Google Maps Places Autocomplete
- Select vehicle type (Mini Tempo, Pickup Truck, E-Cart) and cargo category (Boxes, Furniture, Electronics, Other)
- View upfront fare estimate with full breakdown before confirming
- Track assigned driver in real time on a live Google Map
- Pay digitally via UPI / PhonePe / GPay through Razorpay and download a PDF receipt
- Rate the driver using a star rating + tag chip system post-delivery
- View full trip history with status filters (All / Completed / Cancelled)

### 🚛 Driver
- Register with vehicle details and Aadhar document upload via a 3-step multi-step form
- Toggle Online / Offline status — state persisted in localStorage
- Receive incoming booking alerts with a live 60-second countdown to Accept or Decline
- Navigate to pickup location using the integrated Google Map
- Upload a delivery photo to confirm cargo handover before completing the trip
- View today's earnings, total distance, duty hours, rating, and recent trip history on a dedicated dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js (Vite) |
| **UI Libraries** | Tailwind CSS + MUI (Material UI) |
| **State Management** | Redux Toolkit |
| **Routing** | React Router v6 |
| **Forms & Validation** | Formik + Yup |
| **HTTP Client** | Axios (with request/response interceptors) |
| **Notifications** | React Hot Toast |
| **SEO** | React Helmet Async |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | Firebase (Phone OTP + Google Login) |
| **Payments** | Razorpay |
| **Maps & Autocomplete** | Google Maps API + Google Places API |
| **Analytics** | Google Analytics (gtag.js) |
| **Design** | [Figma Prototype](https://www.figma.com/proto/wDNO99XbxdTpCqD2XUk1JJ/Untitled?node-id=323-2018&p=f&viewport=18123%2C66%2C0.6&t=ZFzdPOK6sLKTwtSm-1&scaling=contain&content-scaling=fixed&starting-point-node-id=323%3A2018&page-id=0%3A1) |
| **Deployment — Frontend** | Vercel |
| **Deployment — Backend** | Render |

---

## 📁 Project Structure

```
cargobee/
├── frontend/                            # React.js (Vite) Frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js               # Custom color palette + darkMode: 'class'
│   ├── postcss.config.js
│   ├── .env
│   └── src/
│       ├── main.jsx                     # Entry point — Redux Provider, MUI ThemeProvider,
│       │                                # HelmetProvider, Toaster, ErrorBoundary
│       ├── App.jsx                      # Root router with all lazy-loaded routes
│       ├── assets/                      # Logos, images, bee SVG icon
│       │
│       ├── components/                  # Reusable UI components
│       │   ├── ui/
│       │   │   ├── Button.jsx           # Primary / outline / ghost / icon variants
│       │   │   ├── Input.jsx            # With label, error message, icon prefix support
│       │   │   ├── Modal.jsx            # Accessible overlay modal with focus trap
│       │   │   ├── Badge.jsx            # Status badges (Completed, Cancelled, Active)
│       │   │   ├── Spinner.jsx          # Loading spinner used as Suspense fallback
│       │   │   ├── Avatar.jsx           # User/driver avatar with fallback initials
│       │   │   ├── Card.jsx             # Base card with shadow + rounded corners
│       │   │   └── Toast.jsx            # React Hot Toast config wrapper
│       │   ├── layout/
│       │   │   ├── Navbar.jsx           # Consumer top navbar — tabs + theme toggle
│       │   │   ├── Sidebar.jsx          # Driver dashboard left sidebar (dark)
│       │   │   ├── BottomNav.jsx        # Consumer mobile bottom navigation bar
│       │   │   └── PageWrapper.jsx      # SEO helmet + consistent page padding
│       │   ├── map/
│       │   │   ├── MapView.jsx          # Google Maps embed component
│       │   │   └── AddressInput.jsx     # Google Places Autocomplete input field
│       │   ├── booking/
│       │   │   ├── VehicleCard.jsx      # Selectable vehicle type card with price
│       │   │   ├── CargoTypeSelector.jsx # Multi-select cargo category chip row
│       │   │   └── FareBreakdown.jsx    # Itemised fare estimate display
│       │   ├── driver/
│       │   │   ├── DriverCard.jsx       # Driver info (photo, name, rating, vehicle)
│       │   │   └── TripRequestAlert.jsx # Incoming booking modal with 60s countdown
│       │   ├── upload/
│       │   │   └── FileUpload.jsx       # Drag & drop upload with preview + validation
│       │   └── ErrorBoundary.jsx        # Global error boundary class component
│       │
│       ├── pages/
│       │   ├── SplashScreen.jsx         # Auto-transitions to Onboarding after 2.5s
│       │   ├── Onboarding.jsx           # 3-slide carousel with swipe gesture support
│       │   ├── NotFound.jsx             # 404 page with home link
│       │   ├── auth/
│       │   │   ├── Login.jsx            # Phone OTP + Google login, consumer/driver toggle
│       │   │   └── Register.jsx         # 3-step form with sessionStorage progress saving
│       │   ├── consumer/
│       │   │   ├── Home.jsx             # Booking screen — map + vehicle + fare + Book Now
│       │   │   ├── AddressSearch.jsx    # Places autocomplete overlay with recent searches
│       │   │   ├── DriverMatching.jsx   # Animated search screen, 3s auto-transition
│       │   │   ├── DriverConfirmed.jsx  # Driver details + call/message + Track Live
│       │   │   ├── LiveTracking.jsx     # Live map with driver ETA and route line
│       │   │   ├── TripCompletion.jsx   # Fare receipt + payment method + Pay via UPI
│       │   │   ├── RateExperience.jsx   # Stars + tag chips + comment + Submit Rating
│       │   │   └── TripHistory.jsx      # Filterable trip list with detail modal
│       │   └── driver/
│       │       ├── DriverDashboard.jsx  # Earnings stats + new request card + trip table
│       │       └── DriverActiveTrip.jsx # Live map + delivery photo upload + Complete Trip
│       │
│       ├── features/                    # Redux Toolkit slices (feature-based architecture)
│       │   ├── auth/
│       │   │   └── authSlice.js         # { user, token, isAuthenticated, loading, error }
│       │   ├── booking/
│       │   │   └── bookingSlice.js      # { pickup, drop, vehicle, cargoTypes, fare, status }
│       │   ├── driver/
│       │   │   └── driverSlice.js       # { isOnline, currentTrip, earnings, pendingRequest }
│       │   ├── trip/
│       │   │   └── tripSlice.js         # { trips[], currentTrip, loading, error }
│       │   └── ui/
│       │       └── uiSlice.js           # { theme, globalLoading, toast }
│       │
│       ├── hooks/                       # Custom reusable React hooks
│       │   ├── useAuth.js               # user, isAuthenticated, role, login, logout
│       │   ├── useDebounce.js           # Debounce a value by delay (300ms for Places API)
│       │   ├── useTheme.js              # theme, toggleTheme — synced with localStorage
│       │   ├── useFetch.js              # { data, loading, error, execute } wrapper
│       │   └── useLocalStorage.js       # [value, setValue] with JSON parse/stringify
│       │
│       ├── services/                    # Axios API abstraction layer
│       │   ├── api.js                   # Axios instance + request/response interceptors
│       │   ├── authService.js           # loginWithPhone, verifyOTP, loginWithGoogle, logout
│       │   ├── bookingService.js        # createBooking, cancelBooking, getFareEstimate
│       │   ├── driverService.js         # toggleStatus, acceptRequest, declineRequest, getDashboard
│       │   ├── tripService.js           # getTrips, getTripById, startTrip, completeTrip, rateTrip
│       │   └── paymentService.js        # createOrder, verifyPayment, getReceipt
│       │
│       ├── store/
│       │   └── store.js                 # Redux store — all slices registered here
│       │
│       └── utils/
│           ├── storage.js               # localStorage + sessionStorage helper functions
│           ├── fareCalculator.js        # Base fare + distance charge + surcharge + GST
│           ├── formatters.js            # Currency (₹), date, distance formatters
│           └── validators.js            # Shared Yup schemas and Indian phone regex
│
├── backend/                             # Node.js + Express Backend
│   ├── server.js                        # App setup, middleware, route mounting, error handler
│   ├── .env
│   ├── package.json
│   ├── config/
│   │   ├── db.js                        # Mongoose MongoDB connection
│   │   └── firebase.js                  # Firebase Admin SDK initialisation
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── driverController.js
│   │   ├── tripController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js            # Firebase JWT verification on protected routes
│   │   └── errorHandler.js             # Global Express error handler
│   ├── models/
│   │   ├── User.js                      # name, phone, email, role, firebaseUid, isVerified
│   │   ├── Driver.js                    # vehicleType, vehicleNumber, isOnline, rating, earnings
│   │   ├── Booking.js                   # pickup, drop, vehicle, fareBreakdown, status
│   │   └── Trip.js                      # startTime, endTime, distance, rating, paymentStatus
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── tripRoutes.js
│   │   └── paymentRoutes.js
│   └── utils/
│       └── fareCalculator.js            # Shared fare logic used by bookingController
│
├── .gitignore
└── README.md
```

---

## 🔌 API Routes

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login with Firebase ID token | ❌ |
| `POST` | `/api/auth/register` | Register new user — consumer or driver | ❌ |
| `GET` | `/api/auth/me` | Get current logged-in user profile | ✅ |

### Booking Routes — `/api/bookings`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/bookings/create` | Create a new booking request | ✅ |
| `GET` | `/api/bookings/fare-estimate` | Get fare estimate by pickup, drop, vehicle type | ✅ |
| `GET` | `/api/bookings/:id` | Get booking details by ID | ✅ |
| `PUT` | `/api/bookings/:id/cancel` | Cancel an existing booking | ✅ |

### Driver Routes — `/api/drivers`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/drivers/nearby` | Get list of nearby available online drivers | ✅ |
| `GET` | `/api/drivers/dashboard` | Get driver dashboard stats and earnings summary | ✅ |
| `PUT` | `/api/drivers/status` | Toggle driver online / offline status | ✅ |
| `POST` | `/api/drivers/accept/:bookingId` | Driver accepts an incoming booking request | ✅ |
| `POST` | `/api/drivers/decline/:bookingId` | Driver declines an incoming booking request | ✅ |

### Trip Routes — `/api/trips`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/trips` | Get all trips for the logged-in user | ✅ |
| `GET` | `/api/trips/:id` | Get single trip detail by ID | ✅ |
| `PUT` | `/api/trips/:id/start` | Driver starts the trip | ✅ |
| `PUT` | `/api/trips/:id/complete` | Driver marks trip complete with delivery photo | ✅ |
| `POST` | `/api/trips/:id/rate` | Consumer submits star rating, tags, and comment | ✅ |

### Payment Routes — `/api/payments`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/payments/create-order` | Create a Razorpay payment order | ✅ |
| `POST` | `/api/payments/verify` | Verify Razorpay HMAC signature and mark trip paid | ✅ |
| `GET` | `/api/payments/receipt/:tripId` | Download PDF receipt for a completed trip | ✅ |

---

## 🚀 Steps to Run the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) — local instance or Atlas URI
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

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the backend server:

```bash
npm run dev
```

> Server runs at `http://localhost:5000`

---

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Start the frontend development server:

```bash
npm run dev
```

> App runs at `http://localhost:5173`

---

### 4. Open in Browser

Visit `http://localhost:5173` — you will land on the CargoBee Splash Screen. 🎉

The app runs in **demo / simulation mode** by default:
- Driver matching simulates a 3-second search and then auto-assigns a mock driver
- Live tracking simulates movement and auto-completes after 3 seconds
- The payment flow shows a success animation without a real Razorpay charge unless API keys are fully configured

---

## 📄 License

This project is built as an academic class project. All UI designs are original and created in Figma.
