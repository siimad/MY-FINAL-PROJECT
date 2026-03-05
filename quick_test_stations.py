from backend.app import create_app

def run_tests():
    app = create_app()
    client = app.test_client()

    print('Requesting /api/stations ...')
    r = client.get('/api/stations/')
    print('Status:', r.status_code)
    print('Body:', r.get_data(as_text=True))

    print('\nRequesting /stations.html ...')
    r2 = client.get('/stations.html')
    print('Status:', r2.status_code)
    body = r2.get_data(as_text=True)
    print('Body (first 400 chars):')
    print(body[:400])

if __name__ == '__main__':
    run_tests()
