from fastapi import FastAPI
from pydantic import BaseModel
import datetime

app = FastAPI(title="Smart Campus Insights API")

class QueuePredictionRequest(BaseModel):
    date: str  # YYYY-MM-DD

class QueuePredictionResponse(BaseModel):
    timestamp: str
    predicted_queue_peak: int

@app.post("/predict", response_model=QueuePredictionResponse)
def predict(req: QueuePredictionRequest):
    # TODO: load model and generate prediction
    return {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "predicted_queue_peak": 100  # placeholder
    }
