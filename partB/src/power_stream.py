import json
import random
import time
import datetime
import requests

HOSTELS = ['A', 'B', 'C', 'D']

def generate():
    while True:
        now = datetime.datetime.utcnow().isoformat()
        for hostel in HOSTELS:
            record = {
                "timestamp": now,
                "hostel": hostel,
                "kw": round(random.uniform(20, 120), 2)
            }
            try:
                response = requests.post("http://localhost:8000/ingest", json=record)
                print(f"Sent: {record} → Status: {response.status_code}")
            except Exception as e:
                print(f"Error sending to backend: {e}")
        time.sleep(60)

if __name__ == "__main__":
    generate()
