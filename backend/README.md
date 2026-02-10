# VisionAI Backend (FastAPI)

Lightweight FastAPI backend for ML inference endpoints used by the VisionAI Expo app.

## Quick start

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at `http://localhost:8000`.

## Endpoints

- `GET /health`
- `POST /v1/describe` (multipart form field `file`)
- `POST /v1/detect` (multipart form field `file`)

## Example (curl)

```bash
curl -X POST "http://localhost:8000/v1/describe" \
  -F "file=@path/to/image.jpg"
```

## Environment

Copy `.env.example` to `.env` and adjust as needed.