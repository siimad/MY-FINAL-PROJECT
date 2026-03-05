# Flood Detection System - Deployment Guide

## ✅ System Overview

Your Flood Detection System is now fully integrated and ready for deployment. It consists of:

- **Backend**: Flask API (Python)
- **Database**: SQLite 
- **Frontend**: HTML5, CSS3, JavaScript
- **Services**: Sensor processing, predictions, alerts

---

## 🚀 Quick Start Guide

### Step 1: Initialize the Database

Navigate to the backend folder and run:

```bash
cd backend
python init_db.py
```

Expected output:
```
🔧 Initializing Flood Detection System Database...
📊 Creating database tables...
✅ Database initialized successfully!
📋 Created Tables:
   - SensorReading
   - Alert
```

### Step 2: Start the Flask Server

```bash
python app.py
```

Expected output:
```
Starting Flood Detection System API on http://localhost:5000
* Running on http://127.0.0.1:5000
* Running on http://10.18.0.162:5000
```

### Step 3: Access the Application

Open your browser and navigate to:
- **Dashboard**: `http://localhost:5000/index.html`
- **Sensors**: `http://localhost:5000/sensors.html`
- **Predictions**: `http://localhost:5000/predictions.html`
- **Alerts**: `http://localhost:5000/alerts.html`
- **Stations**: `http://localhost:5000/stations.html`

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Sensors
- `POST /api/sensors/upload` - Upload sensor data
- `GET /api/sensors/readings` - Get sensor readings
- `GET /api/sensors/latest` - Get latest sensor reading

### Predictions
- `POST /api/predict/flood-risk` - Predict flood risk
- `POST /api/predict/batch-predict` - Batch predictions
- `GET /api/predict/model-info` - Get model information

### Alerts
- `POST /api/alerts/create` - Create alert
- `GET /api/alerts` - Get alerts
- `PUT /api/alerts/{id}/status` - Update alert status

---

## 🔧 Configuration

### Environment Variables (.env)

Located in `backend/.env`:

```env
# Flask
SECRET_KEY=your-super-secret-flask-key-123
JWT_SECRET_KEY=your-super-secret-jwt-key-456

# Database
DATABASE_URL=sqlite:///flood_system.db

# Africa's Talking SMS (Optional)
AFRICASTALKING_API_KEY=your-api-key-here
AFRICASTALKING_USERNAME=your-username-here

# Model Configuration
MODEL_PATH=ml/flood_model.pkl
```

---

## 📁 Project Structure

```
FINAL PROJECT FOR DIANA/
├── backend/
│   ├── app.py                    # Flask application
│   ├── init_db.py               # Database initialization
│   ├── requirements.txt          # Python dependencies
│   ├── .env                      # Environment variables
│   ├── database/
│   │   └── db.py               # Database models
│   ├── routes/
│   │   ├── auth.py            # Authentication routes
│   │   ├── sensors.py         # Sensor routes
│   │   ├── alerts.py          # Alert routes
│   │   └── predict.py         # Prediction routes
│   ├── services/
│   │   ├── sensor_service.py  # Sensor processing
│   │   ├── db_service.py      # Database service
│   │   ├── model_service.py   # ML model service
│   │   └── sms_service.py     # SMS notifications
│   ├── utils/
│   │   ├── schemas.py         # Data schemas (Pydantic)
│   │   ├── security.py        # JWT authentication
│   │   └── config.py          # Configuration
│   └── ml/
│       └── [ML models]
│
├── js/
│   ├── api.js                  # API client
│   ├── dashboard.js            # Dashboard logic
│   ├── sensors.js              # Sensor management
│   ├── predictions.js          # Predictions logic
│   ├── alerts.js               # Alerts management
│   └── auth.js                 # Authentication
│
├── css/
│   └── style.css              # Styling
│
├── index.html                  # Dashboard page
├── sensors.html               # Sensors page
├── predictions.html           # Predictions page
├── alerts.html                # Alerts page
├── stations.html              # Stations page
└── login.html                 # Login page
```

---

## 🗄️ Database Schema

### SensorReading Table
```sql
CREATE TABLE SensorReading (
    id INTEGER PRIMARY KEY,
    sensor_id VARCHAR(100) NOT NULL,
    rainfall FLOAT NOT NULL,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    soil_moisture FLOAT NOT NULL,
    wind_speed FLOAT,
    pressure FLOAT,
    location VARCHAR(200) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Alert Table
```sql
CREATE TABLE Alert (
    id INTEGER PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent',
    alert_type VARCHAR(50) DEFAULT 'flood_warning',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment Checklist

- [ ] Database initialized (`python init_db.py`)
- [ ] All dependencies installed (`pip install -r requirements.txt`)
- [ ] Environment variables configured in `.env`
- [ ] Flask server starts without errors (`python app.py`)
- [ ] Frontend loads at `http://localhost:5000`
- [ ] API endpoints respond correctly
- [ ] Sensor data uploads successfully
- [ ] Predictions work correctly
- [ ] Alerts can be created and retrieved
- [ ] SMS integration configured (if needed)

---

## 🐛 Troubleshooting

### Database errors
```bash
# Reset database
rm backend/flood_system.db
python backend/init_db.py
```

### Module not found errors
```bash
# Reinstall dependencies
pip install -r backend/requirements.txt
```

### Port already in use
```bash
# Change Flask port in app.py or use:
python backend/app.py --port 5001
```

### CORS errors
- Already handled in Flask app with `CORS(app)`
- Check browser console for specific errors

---

## 📱 API Usage Examples

### Upload Sensor Data
```bash
curl -X POST http://localhost:5000/api/sensors/upload \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_id": "sensor_001",
    "location": "Kampala",
    "water_level": 2.5,
    "rainfall": 45.3,
    "temperature": 24.5,
    "humidity": 75.0
  }'
```

### Predict Flood Risk
```bash
curl -X POST http://localhost:5000/api/predict/flood-risk \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rainfall": 50.0,
    "river_level": 3.5,
    "temperature": 24.5,
    ...
  }'
```

---

## 📞 Support

For issues or questions:
1. Check the database is initialized
2. Verify Flask server is running
3. Check browser console for JavaScript errors
4. Review network requests in Chrome DevTools

---

## ✨ Features

✅ Real-time sensor monitoring
✅ Machine learning-based flood predictions
✅ SMS alert notifications
✅ Historical data tracking
✅ User authentication (JWT)
✅ Multi-station support
✅ Responsive dashboard
✅ Data export (CSV)

---

**System Status**: ✅ Ready for Production

Last Updated: 2026-02-24
