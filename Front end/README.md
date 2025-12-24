# Refresh Your Heart - Frontend

## Overview
"Refresh Your Heart" is a medical web platform designed to assist in heart disease detection and severity classification using Machine Learning models. It also facilitates doctor consultations and appointment bookings.

## Features
-   **Heart Disease Detection**: Binary classification (Disease / No Disease).
-   **Severity Classification**: Assessment of disease severity (Early / Moderate / Critical).
-   **Doctor Consultation**: Browse doctors and book appointments.
-   **Health Tips**: Curated advice for maintaining heart health.

## Tech Stack
-   **Framework**: React (TypeScript)
-   **Styling**: Tailwind CSS (configured with design tokens)
-   **Design Tool**: Figma
-   **State Management**: React Context / Hooks

## Project Structure
```
/src
  /components    # Reusable UI components
  /pages         # Page components
  /styles        # Global styles and design tokens
  /utils         # Helper functions
/data            # Dummy data for development
/docs            # Documentation (API, Accessibility)
```

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## API Integration
See [docs/api.md](docs/api.md) for detailed API contract and endpoints.

## Accessibility
This project follows WCAG AA standards. See [docs/accessibility.md](docs/accessibility.md) for guidelines.

## License
[MIT](LICENSE)
