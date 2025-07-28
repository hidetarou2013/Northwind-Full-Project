# Northwind AI Dashboard - Backend

This is the backend portion of the Northwind AI Dashboard application, built with Java 21 and Spring Boot 3.

## Features

- RESTful API for CRUD operations on Customers, Products, and Orders.
- In-memory H2 database for easy setup and development.
- CORS configured to allow requests from the frontend application.

## Setup & Running

You can run this application using a Java 21 JDK and Maven.

1.  **Navigate to the backend directory:**
    \`\`\`bash
    cd backend
    \`\`\`

2.  **Run the application using the Maven wrapper:**
    - On macOS/Linux: \`\`\`bash
      ./mvnw spring-boot:run
      \`\`\`
    - On Windows: \`\`\`bash
      ./mvnw.cmd spring-boot:run
      \`\`\`

The server will start on \`http://localhost:8080\`.

## API Endpoints

- **Customers**: \`/api/customers\`
- **Products**: \`/api/products\`
- **Orders**: \`/api/orders\`

All endpoints support standard GET, POST, PUT, and DELETE requests.
