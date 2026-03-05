import requests
import sys

def main():
    try:
        r = requests.get('http://127.0.0.1:5000/api/stations/', timeout=5)
        print('API /api/stations status:', r.status_code)
        print(r.text)
    except Exception as e:
        print('Error fetching /api/stations:', e)
        sys.exit(1)

    try:
        r2 = requests.get('http://127.0.0.1:5000/stations.html', timeout=5)
        print('\n/stations.html status:', r2.status_code)
        print(r2.text[:500])
    except Exception as e:
        print('Error fetching /stations.html:', e)
        sys.exit(1)

if __name__ == '__main__':
    main()
