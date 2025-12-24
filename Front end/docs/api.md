# API Contract - Refresh Your Heart

Base URL: `/api`

## 1. Prediction Endpoints

### 1.1 Heart Disease Detection (Model 1)
**Endpoint:** `POST /predict/disease`

**Description:** Predicts the presence of heart disease based on clinical parameters.

**Request Body:**
```json
{
  "age": 55,
  "sex": "male", // or "female"
  "cp": 1, // Chest Pain Type (0-3)
  "trestbps": 140, // Resting Blood Pressure
  "chol": 240, // Serum Cholestoral in mg/dl
  "fbs": 1, // Fasting Blood Sugar > 120 mg/dl (1 = true; 0 = false)
  "restecg": 0, // Resting Electrocardiographic Results (0-2)
  "thalach": 150, // Maximum Heart Rate Achieved
  "exang": 0, // Exercise Induced Angina (1 = yes; 0 = no)
  "oldpeak": 2.5, // ST depression induced by exercise relative to rest
  "slope": 0, // The slope of the peak exercise ST segment (0-2)
  "ca": 0, // Number of major vessels (0-3) colored by flourosopy
  "thal": 2 // Thalassemia (1 = normal; 2 = fixed defect; 3 = reversable defect)
}
```

**Response:**
```json
{
  "prediction": true, // true = disease detected, false = no disease
  "probability": 0.85,
  "explanation": "High probability of heart disease detected based on elevated cholesterol and age factors."
}
```

### 1.2 Heart Disease Severity Classification (Model 2)
**Endpoint:** `POST /predict/severity`

**Description:** Classifies the severity of heart disease if present.

**Request Body:** Same as `/predict/disease`

**Response:**
```json
{
  "severity": "Moderate", // "Early", "Moderate", "Critical"
  "score": 2, // 0=Early, 1=Moderate, 2=Critical (internal scoring)
  "recommendation": "Consult a specialist immediately."
}
```

## 2. Doctor Endpoints

### 2.1 Get Doctors List
**Endpoint:** `GET /doctors`

**Query Parameters:**
- `page` (optional, default 1): Page number
- `limit` (optional, default 10): Number of items per page

**Response:**
```json
{
  "doctors": [
    {
      "id": "d1",
      "name": "Dr. Sarah Johnson",
      "specialty": "Cardiologist",
      "country": "United States",
      "age": 45,
      "gender": "Female",
      "availability": "Available",
      "slots": [
        { "date": "2023-11-01", "time": "09:00" },
        { "date": "2023-11-01", "time": "10:00" }
      ]
    }
  ],
  "total": 50
}
```

### 2.2 Book Appointment
**Endpoint:** `POST /book`

**Request Body:**
```json
{
  "doctor_id": "d1",
  "patient_name": "John Doe",
  "patient_phone": "+1234567890",
  "patient_email": "john@example.com",
  "patient_dob": "1980-01-01",
  "patient_gender": "Male",
  "appointment_date": "2023-11-01",
  "appointment_time": "09:00",
  "notes": "Experiencing mild chest pain."
}
```

**Response:**
```json
{
  "booking_id": "bk_12345",
  "status": "confirmed", // or "pending"
  "message": "Appointment confirmed for 2023-11-01 at 09:00."
}
```

## 3. Tips Endpoints

### 3.1 Get Health Tips
**Endpoint:** `GET /tips`

**Response:**
```json
{
  "tips": [
    {
      "id": "t1",
      "title": "Stay Active",
      "summary": "Walk 30 mins daily.",
      "image": "url/to/image.jpg"
    }
  ]
}
```
