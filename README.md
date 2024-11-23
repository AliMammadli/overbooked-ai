# Getting Started

## Run the Application
To start the application in development mode, run the following command:

```bash
npm run dev
```

## Run Docker Compose
To run the Docker container using Docker Compose, use this command:

```bash
docker-compose up
```

## Run Tests
To execute the tests for the project, run:

```bash
npm run test
```

---

# Architecture Update

After thoroughly reviewing the current project setup, I have proposed the following updates:

## 1. Next.js for the Project
- **Why Next.js?**  
  Next.js best fits the needs of this project due to its robust features like:
  - Native support for external API fetching.
  - Built-in SEO optimizations to enhance the user experience.

## 2. Joi for Validation
- **Why Joi?**  
  Joi is a powerful validation library that works well for this project due to its developer-friendly syntax and style. It allows for concise and flexible validation rules.

## 3. Updated Middleware for Express
- **Deprecation of `body-parser`:**  
  The `body-parser` library is now deprecated. The recommended approach is to use `express.json()` instead.
  
- **Next.js Middleware:**  
  In Next.js, middleware can be configured in a single file, simplifying setup and configuration. This aligns with modern best practices in Next.js application development.
