import requests
import json
import time

# Wait for server to be ready
time.sleep(1)

# Test if API is up
try:
    r = requests.get('http://localhost:5000/api/predict/model-info', timeout=5)
    print("Model Info Status:", r.status_code)
    print("Model Info:", json.dumps(r.get_json(), indent=2))
    print()
    
    # Try a prediction
    prediction_data = {
        "rainfall": 50,
        "river_level": 5,
        "previous_flooding": 1,
        "topographic_map": 1000,
        "soil_type": 2,
        "proximity_to_river": 500,
        "drainage_system": 1,
        "weather_forecast": 1,
        "satellite_imagery": 0.7,
        "population_density": 500,
        "infrastructure_resilience": 2,
        "land_use": 2,
        "elevation": 1200,
        "historical_data": 1,
        "water_speed": 1,
        "ground_saturation": 0.6,
        "temperature": 25,
        "humidity": 70,
        "wind_speed": 5,
        "atmospheric_pressure": 1013,
        "vegetation_index": 0.5,
        "urban_development": 2,
        "water_management_practices": 1,
        "early_warning_systems": 1,
        "community_preparedness": 1
    }
    
    r2 = requests.post('http://localhost:5000/api/predict/flood-risk', json=prediction_data, timeout=5)
    print("Prediction Status:", r2.status_code)
    print("Prediction:", json.dumps(r2.get_json(), indent=2))
    
except Exception as e:
    print("Error:", str(e))
    import traceback
    traceback.print_exc()
