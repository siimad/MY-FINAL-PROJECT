# ⚡ FLOOD DETECTION SYSTEM - QUICK REFERENCE

## 🚀 Start The System in 1 Minute

```bash
# Option 1: Windows (Easy)
double-click: start_system.bat

# Option 2: Manual
cd backend
python init_db.py      # Run once to setup database
python app.py          # Start the server
# Then open: http://localhost:5000
```

---

## 📍 Quick Links

| What | Link |
|------|------|
| **Dashboard** | http://localhost:5000/index.html |
| **Sensors** | http://localhost:5000/sensors.html |
| **Predictions** | http://localhost:5000/predictions.html |
| **Alerts** | http://localhost:5000/alerts.html |
| **Stations** | http://localhost:5000/stations.html |
| **API Health** | http://localhost:5000/ |

---

## 🔧 Common Commands

```bash
# Initialize database (run once)
cd backend && python init_db.py

# Start the server
cd backend && python app.py

# Verify system is ready
python verify_system.py

# Reset database
rm backend/flood_system.db
cd backend && python init_db.py

# Install dependencies
pip install -r backend/requirements.txt
```

---

## 📊 API Quick Reference

```bash
# Health Check
GET http://localhost:5000/

# Upload Sensor Data
POST http://localhost:5000/api/sensors/upload
{
  "sensor_id": "sensor_001",
  "location": "Kampala",
  "water_level": 2.5,
  "rainfall": 45.3,
  "temperature": 24.5,
  "humidity": 75.0
}

# Get Sensor Readings
GET http://localhost:5000/api/sensors/readings?hours=24&limit=10

# Predict Flood Risk
POST http://localhost:5000/api/predict/flood-risk
(requires JWT token from login)

# Get Alerts
GET http://localhost:5000/api/alerts?limit=50

# Create Alert
POST http://localhost:5000/api/alerts/create
{
  "title": "Flood Warning",
  "message": "High water level detected",
  "severity": "high",
  "location": "Kampala"
}
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/app.py` | Main Flask application |
| `backend/init_db.py` | Database setup |
| `backend/.env` | Configuration |
| `js/api.js` | Frontend API client |
| `js/dashboard.js` | Dashboard logic |
| `js/sensors.js` | Sensor monitoring |
| `js/predictions.js` | Predictions |
| `database/db.py` | Database models |

---

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "No module named flask" | `pip install -r backend/requirements.txt` |
| "Database not initialized" | `python backend/init_db.py` |
| "Port 5000 already in use" | Stop Flask: `Ctrl+C`, then restart |
| "API not responding" | Check if Flask is running: `python backend/app.py` |
| "Frontend not loading" | Try: http://localhost:5000/index.html |
| "Sensor data not saving" | Verify database: `python verify_system.py` |

---

## 🎯 Feature Checklist

- ✅ Real-time sensor monitoring
- ✅ Machine learning predictions
- ✅ Automatic alerts
- ✅ SMS notifications (configured in .env)
- ✅ User authentication
- ✅ Data export
- ✅ Multi-station support
- ✅ Responsive UI
- ✅ RESTful API
- ✅ Database persistence

---

## 🔑 Default Configuration

| Setting | Value | Location |
|---------|-------|----------|
| API Port | 5000 | backend/app.py |
| Database | SQLite | backend/.env |
| JWT Secret | jwt-secret-key-456 | backend/.env |
| Auto-refresh | 15 seconds | js/sensors.js |
| Alert refresh | 30 seconds | js/dashboard.js |

---

## 📞 Support Commands

```bash
# Check if Flask is responding
curl http://localhost:5000/

# Check system status
python verify_system.py

# View which Python is being used
python --version
where python

# List installed packages
pip list | grep -i flask

# Clear Python cache
pip cache purge
```

---

## 🎓 Learning Resources

- Frontend: See `js/api.js` for all API methods
- Backend: Check `backend/routes/` for all endpoints
- Database: Review `backend/database/db.py` for models
- Configuration: Edit `backend/.env` for settings
- Deployment: Read `DEPLOYMENT_GUIDE.md` for full guide

---

## ✅ System Status

```
✅ Backend: Configured
✅ Frontend: Connected
✅ Database: Ready
✅ API: Available
✅ Authentication: Enabled
✅ Predictions: Working
✅ Alerts: Functional
✅ Deployment: Ready
```

---

**Last Updated**: 2026-02-24
**Status**: READY FOR PRODUCTION ✅
**System**: Fully Integrated ✅
