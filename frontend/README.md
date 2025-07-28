# Northwind AI Dashboard - Frontend

This is the frontend portion of the Northwind AI Dashboard application, built with React, Vite, and TypeScript.

## Setup & Running

1.  **Install Dependencies**: 
    ```bash
    npm install
    ```

2.  **API Key**: Create a `.env.local` file in this directory and add your Gemini API key:
    ```
    VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

This will start the frontend application, which is configured to connect to the Java backend service running on `http://localhost:8080`.

## Context Root Configuration

Both the frontend and backend are configured to run under the `/Northwind4` context root:

- **Backend**: The Spring Boot application runs with context path `/Northwind4` on port 8080
  - APIs are accessible at: `http://localhost:8080/Northwind4/api/*`
  - Example: `http://localhost:8080/Northwind4/api/customers`

- **Frontend**: The React application is served from the `/Northwind4` base path
  - Application URL: `http://localhost:5173/Northwind4/`
  - API requests to `/api/*` are automatically proxied to the backend

This configuration ensures consistent URL paths between frontend and backend services.
