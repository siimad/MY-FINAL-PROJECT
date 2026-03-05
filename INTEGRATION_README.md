# Flood Monitoring System - Full Integration Guide

## Overview
This system implements a complete flood monitoring platform with:
- **Frontend**: HTML/CSS/JS dashboard & login
- **Backend**: Flask REST API with authentication
- **Database**: Mock/SQL data layer
- **Integration**: Seamless frontend-backend-database communication

---

## Architecture

### 1. **Frontend Layer** (`*.html` + `js/*.js`)
- `login.html` — User authentication with 50-year developer profile
- `dashboard_integrated.html` — Real-time sensor data display
- `js/auth.js` — Authentication manager (token, user storage)
- `js/api.js` — API client with JWT token handling

### 2. **Backend Layer** (`backend/`)
- `app.py` — Flask app, route registration, CORS
- Routes:
  - `/api/auth/login` — JWT token generation
  - `/api/sensors/readings` — Fetch sensor data (requires JWT)
  - `/api/sensors/stats` — Compute statistics
- Security: JWT tokens, role-based permissions

### 3. **Database Layer** (`backend/services/services/db_service.py`)
- Mock in-memory storage (sensors_db, users_db, alerts_db)
- Methods: get_recent_sensor_readings, get_sensor_stats, create_alert
- Auto-seeds 5 sensor locations with random data on first call

---

## Data Flow (Professional Architecture)

```
User Login (login.html)
    ↓
POST /api/auth/login
    ↓
Backend validates (security.py:authenticate_user)
    ↓
Return JWT + user info
    ↓
Frontend stores token + user in localStorage
    ↓
Dashboard opens (dashboard_integrated.html)
    ↓
Frontend fetches GET /api/sensors/readings?hours=24
    ↓
Backend validates JWT
    ↓
Backend calls DBService.get_recent_sensor_readings()
    ↓
Database populates mock sensor data (5 locations) 
    ↓
Backend returns {success: true, readings: [...], count: 5}
    ↓
Frontend renders table + stats
    ↓
Auto-refresh every 30 seconds
```

---

## Getting Started

### Prerequisites
- Python 3.10+ with venv
- Windows PowerShell or bash terminal
- Port 5000 available (backend)

### 1. Set Up Virtual Environment
```powershell
cd "c:\Users\diana\Desktop\FINAL PROJECT FOR DIANA"
.\.venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install Flask Flask-CORS Flask-JWT-Extended python-dotenv PyJWT pydantic
```

### 3. Start Backend Server
```bash
python backend/app.py
```
Server runs on `http://localhost:5000`

### 4. Open in Browser
```
Dashboard: http://localhost:5000/login.html
Direct Dashboard: http://localhost:5000/dashboard_integrated.html
```

### 5. Login  with Test Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: admin
- **Permissions**: read, write, delete
- **Profile**: 50 years of software development experience

---

## Key Features (50-Year Veteran Architecture)

### 1. **Unified Authentication**
- JWT tokens with 24-hour expiry
- Token stored in localStorage for persistence
- Sign Out button clears all auth data
- Automatic redirect to login if unauthorized

### 2. **Responsive Data Layer**
- Frontend ← → Backend API (JSON)
- Backend ← → Database (mock objects)
- All responses include `success` flag for error handling
- Proper HTTP status codes (200, 401, 400, 500)

### 3. **Error Handling**
- Try-catch blocks at every layer
- User-friendly error messages in frontend alerts
- Detailed logging in backend console
- Graceful fallbacks for missing data

### 4. **Real-Time Monitoring**
- Dashboard auto-refreshes sensor data every 30 seconds
- Live statistics (avg rainfall, temp, humidity)
- Historical data with filtering by hours/sensor_id
- System status indicator (frontend, backend, DB, auth)

### 5. **Security**
- Password hashing ready (currently basic mock)
- JWT token validation on all protected routes
- Role-based access control (admin, sensor, viewer)
- CORS enabled for frontend access

---

## API Endpoints

### Authentication
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "success": true, "access_token": "JWT...", "user": {...} }
```

### Sensors
```
GET /api/sensors/readings?hours=24&limit=100
Headers: Authorization: Bearer {token}
Response: { "success": true, "readings": [...], "count": 5 }

GET /api/sensors/stats?days=7
Headers: Authorization: Bearer {token}
Response: { "success": true, "stats": {...} }
```

### System
```
GET / (health check)
Response: { "status": "...", "database_initialized": true, "version": "1.0.0" }
```

---

## File Structure

```
project_root/
├── login.html                        # Login page with 50-yr profile
├── dashboard_integrated.html         # Main dashboard (integrated)
├── js/
│   ├── auth.js                      # JWT auth manager
│   ├── api.js                       # API client
│   └── ...
└── backend/
    ├── app.py                       # Flask app entry
    ├── init_db.py                   # DB initializer
    ├── routes/
    │   ├── auth.py                  # /api/auth/*
    │   ├── sensors.py               # /api/sensors/*
    │   └── ...
    ├── services/
    │   ├── services/
    │   │   ├── db_service.py        # Database layer (mock)
    │   │   └── sms_service.py       # SMS alerts
    │   └── ...
    ├── utils/
    │   ├── schemas.py               # Pydantic models
    │   ├── security.py              # Auth helpers
    │   └── config.py
    └── database/
        ├── db.py                    # SQLAlchemy models
        └── schema.sql
```

---

## Testing the Integration

### Full End-to-End Test
```python
import json, urllib.request

# 1. Login
login_data = json.dumps({"username":"admin","password":"admin123"}).encode()
req = urllib.request.Request("http://localhost:5000/api/auth/login", data=login_data, headers={"Content-Type":"application/json"})
resp = json.loads(urllib.request.urlopen(req).read().decode())
token = resp["access_token"]

# 2. Fetch sensor data with token
headers = {"Authorization": f"Bearer {token}"}
req = urllib.request.Request("http://localhost:5000/api/sensors/readings", headers=headers)
data = json.loads(urllib.request.urlopen(req).read().decode())
print(f"Got {data['count']} sensor readings")
```

---

## Troubleshooting

### Backend won't start
```text
Error: ModuleNotFoundError: No module named...
Solution: pip install -r backend/requirements.txt
```

### 401 Unauthorized on sensor endpoints
```text
Error: Unauthorized - Please login again
Solution: Token expired or missing. Log in again via /api/auth/login
```

### Dashboard shows 0 readings
```text
Solution: DBService auto-seeds on first call to get_recent_sensor_readings()
Refresh the page or wait for auto-refresh (30 sec)
```

### CORS errors
```text
Error: Access to XMLHttpRequest blocked by CORS
Solution: Ensure Flask-CORS is installed and app.py has CORS(app)
```

---

## Future Enhancements (Professional Roadmap)

1. **Real Database**: Replace mock storage with SQLite/PostgreSQL
2. **SMS Alerts**: Integrate Africa's Talking API for SMS notifications
3. **ML Predictions**: Add flood risk predictions via ML model
4. **Docker**: Containerize for deployment
5. **CI/CD**: GitHub Actions for automated testing
6. **Mobile App**: React Native cross-platform app
7. **WebSockets**: Real-time data push instead of polling
8. **Batch Processing**: Kafka stream for high-volume sensor data

---

## Author Notes

This system demonstrates **50 years of software development best practices**:
- ✅ Clean separation of concerns (frontend/backend/DB)
- ✅ RESTful API design with proper HTTP semantics
- ✅ JWT-based stateless authentication
- ✅ Error handling & logging at every layer
- ✅ Type safety with Pydantic models
- ✅ CORS-enabled for modern web apps
- ✅ Auto-refresh & real-time UI updates
- ✅ Mock data layer ready for SQL migration
- ✅ Role-based access control
- ✅ Professional UI/UX with gradients & responsive design

---

## Support
For issues, check backend console logs and frontend browser DevTools.
All systems respond to each other when properly configured!
