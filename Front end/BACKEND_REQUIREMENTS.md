# Backend Requirements Specification

This document outlines the API endpoints, data models, and logic required from the backend team to support the current frontend implementation.

## 1. Authentication & User Management

### Endpoints
- **POST /api/auth/register**
  - **Payload:**
    - `role`: "patient" | "doctor"
    - `email`: string
    - `password`: string
    - `firstName`: string
    - `lastName`: string
    - `phone`: string
    - `dob`: string (Date of Birth)
    - `gender`: "male" | "female"
  - **Response:** Auth token (JWT), user object (id, role, name).

- **POST /api/auth/login**
  - **Payload:** `email`, `password`
  - **Response:** Auth token, user object.

- **GET /api/users/me**
  - **Headers:** Authorization Token
  - **Response:** Current user's profile data.

## 2. Doctor Management

### Endpoints
- **GET /api/doctors**
  - **Query Params:** `search` (name/specialty), `specialty`, `country`, `availability`
  - **Response:** List of doctor objects.
  - **Data Model:**
    ```json
    {
      "id": "string",
      "name": "string",
      "specialty": "string",
      "image": "string (url)",
      "rating": number,
      "availability": "Available" | "Busy",
      "country": "string",
      "description": "string",
      "experience": number,
      "patients": number
    }
    ```

- **GET /api/doctors/:id**
  - **Response:** Detailed doctor profile including schedule and reviews.

- **PUT /api/doctors/:id** (Doctor Dashboard)
  - **Purpose:** Allow doctors to update their profile (bio, availability, etc.).
  - **Payload:** Updated profile fields.

## 3. Patient Management

### Endpoints
- **GET /api/patients/:id**
  - **Response:** Patient profile, including medical history and health stats.
  - **Data Model:**
    ```json
    {
      "id": "string",
      "name": "string",
      "age": number,
      "bloodType": "string",
      "height": "string",
      "weight": "string",
      "allergies": ["string"],
      "medications": ["string"]
    }
    ```

- **PUT /api/patients/:id** (Patient Dashboard)
  - **Purpose:** Update personal info and medical stats.

## 4. Appointment System

### Endpoints
- **GET /api/appointments**
  - **Query Params:** `doctorId` (optional), `patientId` (optional), `date`
  - **Purpose:** Fetch appointments for a doctor's dashboard or a patient's history.
  - **Data Model:**
    ```json
    {
      "id": "string",
      "patientName": "string",
      "doctorName": "string",
      "date": "string (ISO)",
      "time": "string",
      "type": "Consultation" | "Checkup",
      "status": "Upcoming" | "Completed" | "Cancelled"
    }
    ```

- **POST /api/appointments**
  - **Payload:** `doctorId`, `patientId`, `date`, `time`, `type`, `notes`.
  - **Purpose:** Book a new appointment.

- **PUT /api/appointments/:id/status**
  - **Payload:** `status` ("Confirmed", "Cancelled", "Completed")
  - **Purpose:** For doctors to accept/cancel requests.

## 5. AI Prediction Services

### Endpoints
- **POST /api/predict/disease**
  - **Payload:** (Matches `PredictForm.tsx` inputs)
    ```json
    {
      "age": number,
      "sex": "male" | "female",
      "cp": number,       // Chest Pain Type
      "trestbps": number, // Resting Blood Pressure
      "chol": number,     // Cholesterol
      "fbs": number,      // Fasting Blood Sugar
      "restecg": number,  // Resting ECG
      "thalach": number,  // Max Heart Rate
      "exang": number,    // Exercise Induced Angina
      "oldpeak": number,  // ST Depression
      "slope": number,
      "ca": number,
      "thal": number
    }
    ```
  - **Response:**
    ```json
    {
      "prediction": boolean (true = disease detected),
      "probability": number (0-1),
      "explanation": "string"
    }
    ```

- **POST /api/predict/severity**
  - **Payload:** Same as above.
  - **Response:**
    ```json
    {
      "severity": "Early" | "Moderate" | "Critical",
      "probability": number,
      "recommendation": "string"
    }
    ```

- **GET /api/patients/:id/predictions**
  - **Purpose:** History of predictions for the patient profile.

## 6. Content Management (Optional but Recommended)

To make the site dynamic, these should be fetched from the backend rather than hardcoded.

- **GET /api/articles**: Fetch health articles.
- **GET /api/tips**: Fetch health tips.
- **GET /api/testimonials**: Fetch patient reviews.

## 7. Notifications / Requests

- **GET /api/doctors/:id/requests**
  - **Purpose:** Fetch consultation requests for the doctor dashboard.
  - **Action:** Approve/Decline (links to Appointment creation).
