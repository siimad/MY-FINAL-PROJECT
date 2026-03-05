# 🎨 System Architecture & Data Flow Diagrams

## 1. Complete System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      USER (Web Browser)                      │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTP/HTTPS
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  HTML Pages: Dashboard, Sensors, Predictions,           │ │
│  │  Alerts, Stations, Login                                │ │
│  │                                                         │ │
│  │  CSS: Responsive design, Dark/Light themes             │ │
│  │                                                         │ │
│  │  JavaScript Managers:                                  │ │
│  │  • DashboardManager - Real-time stats & charts         │ │
│  │  • SensorManager - Live sensor monitoring              │ │
│  │  • PredictionsManager - ML prediction interface        │ │
│  │  • AlertsManager - Alert management                    │ │
│  │  • StationsManager - Station monitoring                │ │
│  │                                                         │ │
│  │  API Client (api.js):                                  │ │
│  │  • REST communication                                  │ │
│  │  • Token management                                    │ │
│  │  • Error handling                                      │ │
│  │  • Mock data fallback                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────┘
                             │ JSON/REST
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                   FLASK BACKEND (Python)                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Core Application (app.py)                              │ │
│  │  • CORS enabled                                         │ │
│  │  • Static file serving                                  │ │
│  │  • Error handling                                       │ │
│  │  • Request routing                                      │ │
│  │                                                         │ │
│  │  API Routes & Blueprints:                              │ │
│  │  ┌────────────────┐  ┌────────────────┐                │ │
│  │  │ /api/auth/*    │  │ /api/sensors/* │                │ │
│  │  │ • Login        │  │ • Upload       │                │ │
│  │  │ • Register     │  │ • Get readings │                │ │
│  │  │ • Logout       │  │ • Get latest   │                │ │
│  │  └────────────────┘  └────────────────┘                │ │
│  │  ┌────────────────┐  ┌────────────────┐                │ │
│  │  │ /api/predict/* │  │ /api/alerts/*  │                │ │
│  │  │ • Flood-risk   │  │ • Create       │                │ │
│  │  │ • Batch        │  │ • Get all      │                │ │
│  │  │ • Model-info   │  │ • Update       │                │ │
│  │  └────────────────┘  └────────────────┘                │ │
│  │                                                         │ │
│  │  Request Processing:                                   │ │
│  │  • Validation (Pydantic schemas)                       │ │
│  │  • Authentication (JWT)                                │ │
│  │  • Authorization (role-based)                          │ │
│  │  • Error catching & logging                            │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────┘
                             │ SQL/ORM
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Services:                                             │  │
│  │  • SensorService - Data processing & predictions      │  │
│  │  • ModelService - ML model inference                  │  │
│  │  • DBService - Database operations                    │  │
│  │  • SMSService - Alert notifications                   │  │
│  │  • SecurityService - JWT & encryption                │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  SQLAlchemy ORM - Database Models:                      ││
│  │                                                          ││
│  │  ┌─────────────────┐  ┌──────────────────┐             ││
│  │  │ SensorReading   │  │ Alert            │             ││
│  │  │ • ID            │  │ • ID             │             ││
│  │  │ • sensor_id     │  │ • phone_number   │             ││
│  │  │ • rainfall      │  │ • message        │             ││
│  │  │ • temperature   │  │ • status         │             ││
│  │  │ • humidity      │  │ • alert_type     │             ││
│  │  │ • location      │  │ • timestamp      │             ││
│  │  │ • timestamp     │  │                  │             ││
│  │  └─────────────────┘  └──────────────────┘             ││
│  │                                                          ││
│  │  ┌──────────────────┐                                  ││
│  │  │ User (added)     │                                  ││
│  │  │ • ID             │                                  ││
│  │  │ • username       │                                  ││
│  │  │ • email          │                                  ││
│  │  │ • password_hash  │                                  ││
│  │  │ • timestamp      │                                  ││
│  │  └──────────────────┘                                  ││
│  └──────────────────────────────────────────────────────────┘│
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    SQLITE DATABASE                           │
│                  (flood_system.db)                           │
│                                                              │
│  Tables:                                                    │
│  • sensor_reading (Read/Write sensor data)                  │
│  • alert (Read/Write alerts)                                │
│  • user (User management - optional)                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Sensor Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│            SENSOR HARDWARE                                  │
│  (Water Level, Rainfall, Temperature, etc.)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  API Endpoint: POST /api/sensors/upload                     │
│                                                              │
│  Request Body:                                              │
│  {                                                          │
│    "sensor_id": "sensor_001",                               │
│    "location": "Kampala",                                   │
│    "water_level": 2.5,                                      │
│    "rainfall": 45.3,                                        │
│    "temperature": 24.5,                                     │
│    "humidity": 75.0                                         │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Input Validation (SensorData Schema)                        │
│  ✓ Check all required fields present                         │
│  ✓ Validate data types                                      │
│  ✓ Check value ranges                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  SensorService.process_sensor_data()                        │
│  1. Save to database (SensorReading model)                  │
│  2. Calculate statistics                                    │
│  3. Trigger ML prediction                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────┴────────┐
                    │               │
                    ▼               ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  ML Prediction   │  │  Database Save   │
        │  • Risk Score    │  │  SensorReading   │
        │  • Confidence    │  │  table updated   │
        └────────┬─────────┘  └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ High Risk?       │
        │ (Score > 7)      │
        └────┬─────────────┘
             │
        ┌────┴─────┐
        │ YES       │ NO
        ▼           ▼
    ┌──────┐   ┌──────┐
    │Alert │   │ Log  │
    │SMS   │   │ Only │
    │Email │   └──────┘
    └──────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────┐
│  Frontend Receives Update                                   │
│  • Dashboard updates stats                                  │
│  • Sensor page shows new reading                            │
│  • Alert page displays if created                           │
│  • User notified if high risk                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Prediction Request Flow

```
┌──────────────────────────────────────────────────────────────┐
│  USER INTERACTION (Prediction Form)                          │
│  • Enter rainfall, water level, etc.                         │
│  • Select location/station                                  │
│  • Click "PREDICT"                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Frontend: predictions.js                                    │
│  • Collect form data                                        │
│  • Format as JSON                                           │
│  • Show loading indicator                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  API Call: POST /api/predict/flood-risk                     │
│  • Include user's JWT token                                 │
│  • Send formatted data                                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Backend: routes/predict.py                                 │
│  • Check JWT token (User authenticated?)                    │
│  • Validate data (PredictionRequest schema)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  ModelService.predict_flood_risk()                          │
│  • Load ML model from disk (flood_model.pkl)               │
│  • Process input features                                   │
│  • Run prediction algorithm                                 │
│  • Generate confidence score                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Risk Classification:                                        │
│  • Score 0-3:   "LOW RISK" (🟢)                             │
│  • Score 3-5:   "LOW-MEDIUM RISK" (🟠)                      │
│  • Score 5-7:   "MEDIUM RISK" (🟡)                          │
│  • Score 7-10:  "HIGH RISK" (🔴)                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Generate Response:                                          │
│  {                                                          │
│    "prediction": 8,                                         │
│    "confidence": 0.92,                                      │
│    "risk_level": "HIGH",                                    │
│    "message": "Immediate action required!",                 │
│    "recommendations": [...]                                 │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Frontend: predictions.js                                    │
│  • Hide loading indicator                                   │
│  • Display prediction results                               │
│  • Show risk level color-coded                              │
│  • Display action recommendations                           │
│  • Enable user actions (send alert, etc.)                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│  UNREGISTERED USER                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
        ┌────────────────┐  ┌───────────────┐
        │  Register     │  │  Login Page   │
        │  New Account  │  │                │
        └────────┬───────┘  └───────┬───────┘
                 │                  │
                 ▼                  ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ POST /auth/      │  │ POST /auth/login │
        │ register         │  │                  │
        │ username, email, │  │ username,        │
        │ password         │  │ password         │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ Validate input   │  │ Check credentials│
        │ Hash password    │  │ Find user        │
        │ Create user      │  │ Verify password  │
        │ Return success   │  │ Generate JWT     │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └──────────┬──────────┘
                            │
                            ▼
        ┌──────────────────────────────────┐
        │  Frontend stores JWT token       │
        │  localStorage.auth_token = token │
        └────────────────┬─────────────────┘
                         │
                         ▼
        ┌──────────────────────────────────┐
        │  Subsequent Requests include:    │
        │  Authorization: Bearer <token>   │
        └────────────────┬─────────────────┘
                         │
                  ┌──────┴──────┐
                  │             │
            ┌─────▼────┐  ┌─────▼─────┐
            │ Valid?   │  │ Expired?  │
            │ ✓ Access │  │ Re-login  │
            └──────────┘  └───────────┘
```

---

## 5. Real-time Data Update Flow

```
┌──────────────────────────────────────────────────────────────┐
│  USER OPENS DASHBOARD (index.html)                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  JavaScript Initializes:                                    │
│  • DashboardManager()                                       │
│  • Load all data                                            │
│  • Start auto-refresh timers                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                ┌──────────┤
                │          │
                ▼          ▼
        ┌─────────┐  ┌──────────────────┐
        │Stats    │  │Alerts (30s)      │
        │(manual) │  └────────┬─────────┘
        └─────────┘           │
                            30 sec
                               │
                               ▼
                        ┌─────────────────┐
                        │loadAlerts()     │
                        │➤ API request    │
                        │➤ Update display │
                        │➤ Set timer      │
                        └────────┬────────┘
                                 │
                                 └─────┐
                                       │
                                     Repeat
```

---

## 6. Error Handling Flow

```
┌──────────────────────────────────────────────────────────────┐
│  USER ACTION (e.g., upload sensor data)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  TRY Block: Execute Request                                 │
│  1. Validate input                                          │
│  2. Call API                                                │
│  3. Process response                                        │
└─────────────────┬──────────────────────┬────────────────────┘
                  │                      │
             SUCCESS                EXCEPTION
                  │                      │
                  ▼                      ▼
        ┌──────────────────┐  ┌──────────────────┐
        │Success Handler   │  │API Error?        │
        │• Display result  │  │(Network, 4xx)    │
        │• Update UI       │  │ ✓ Parse error msg│
        │• Show message    │  │ ✓ Retry logic    │
        └──────────────────┘  └────────┬─────────┘
                                       │
                          ┌────────────┴─────────────┐
                          │ Could retry?             │
                          ├────────────┬─────────────┤
                          │ YES        │ NO          │
                          ▼            ▼             │
                    ┌──────┐    ┌──────────────┐   │
                    │Wait  │    │Show Error    │   │
                    │Retry │    │• Message     │   │
                    │again │    │• Error code  │   │
                    └──┬───┘    │• Stack trace │   │
                       │        └──────────────┘   │
                       ▼                           │
                    (up to 3x)                     │
                       │                           │
                       └───────────┬───────────────┘
                                   │
                                   ▼
                        ┌──────────────────┐
                        │FINALLY Block:    │
                        │• Hide loading    │
                        │• Clean up        │
                        │• Reset state     │
                        └──────────────────┘
```

---

## Summary: Complete System Integration ✅

The Flood Detection System now has:

1. **Unified Frontend-Backend Communication** - All frontend requests go through API
2. **Real-time Data Flow** - Sensors → DB → ML → Alerts → Frontend
3. **Robust Error Handling** - Try-catch blocks with user-friendly messages
4. **Auto-refresh Mechanisms** - Dashboard updates every 30s, sensors every 15s
5. **Authentication Layer** - JWT tokens for secure API access
6. **Fallback Systems** - Mock data available if API unavailable
7. **Data Validation** - Pydantic schemas on backend, form validation on frontend
8. **Database Persistence** - All data saved to SQLite

**Status: FULLY INTEGRATED ✅**
