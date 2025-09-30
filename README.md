# Heart Rate Management API

This is a NestJS backend service for managing patients and their heart rate readings. It supports tracking high heart rate events, calculating analytics, and counting patient data requests.

---

## Running the project
1. run "npm install"
2. start the project "npm run start:dev"

## Features

1. **Patients**
   - Create and fetch patient profiles.
   - Track how many times each patient’s data has been requested.

2. **Heart Rate Readings**
   - Record timestamped heart rate readings for patients.
   - Query high heart rate events (above 100 bpm).
   - Get analytics (average, min, max) for a patient within a time range.

3. **Request Tracking Middleware**
   - Automatically counts how many times a patient's data is requested.
   - Safe: ignores non-numeric paths like `/patients/requests`.

4. **Token Validation**
    - Not used, for this purpose of the task there is no token check

---

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** SQLite
- **ORM:** TypeORM
- **Seed Data:** `patients.json` with sample patients and heart rate readings

---

## Endpoints

### Patients

- `GET /patients/:id` – fetch a single patient (increments request count)  
- `GET /patients` – fetch all patients  
- `GET /patients/requests` – get request counts for all patients  
- `GET /patients/:id/requests` – get request counts for specific patient

### Heart Readings

- `GET /heart-readings?patientId=<id>` – fetch readings for a patient (increments request count)  
- `GET /heart-readings/above100bpm` – fetch all readings above 100 bpm  
- `GET /heart-readings/:id/above100bpm` – fetch all readings above 100 bpm
- `GET /heart-readings/:patientId/range?start=<YYYY-MM-DD>&end=<YYYY-MM-DD>` – fetch readings for a patient within a date range


### Analytics

- `GET /analytics/:patientId?start=<YYYY-MM-DD>&end=<YYYY-MM-DD>` – get average, min, and max heart rate for a patient within a time range

---

## Database & Seed

- Uses SQLite (`data.sqlite`)
- Automatically loads `patients.json` on startup

## Potential Improvements

1. **Authentication & Authorization**
   - Add user login and roles to restrict access to patient data
   - Support JWTToken or any other method for user validation for access restrication

2. **Unit & Integration Testing**
   - Add test coverage for services, controllers, and middleware

3. **Data encryption**
    - Sensitive data needs to be encrypted in the db, using MD5 or HASH

4. **Database Optimization**
   - Columns indexing