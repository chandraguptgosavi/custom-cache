# Customizable Caching API

A caching API built with **Node.js**, **TypeScript**, and **Redis** under the hood.

## 🚀 Live Demo
Access the API documentation here (takes time to load due to free tier usage): [Swagger Docs](https://custom-cache.onrender.com/api-docs/)

---

## 📁 Project Structure
```
/custom-cache-api
│── controllers/   # Handles request logic
│── routes/        # Defines API endpoints
│── store/         # Defines CacheStore interface and it's implementation
│── repository/    # Handles data persistence and caching
│── services/      # Business logic and caching operations
│── swagger.json   # API documentation
│── server.ts      # Entry point of the application
│── package.json   # Dependencies and scripts
│── tsconfig.json  # TypeScript configuration
```

---

## 🔧 Features
✅ **Redis-powered caching** for high-speed data retrieval
✅ **CRUD operations** for managing cached data
✅ **Express Router** for structured API routes
✅ **Swagger UI** for easy API documentation and testing
✅ **TypeScript** for type safety and better code maintainability

---

## 📜 API Endpoints
| Method | Endpoint       | Description            |
|--------|--------------|------------------------|
| GET    | `/cache/:key` | Retrieve cached value |
| POST   | `/cache`      | Store key-value pair  |
| DELETE | `/cache/:key` | Remove cached key     |

---

## 📖 Swagger API Docs
Swagger documentation is available at:  
🔗 **[https://custom-cache.onrender.com/api-docs/](https://custom-cache.onrender.com/api-docs/)**

---

## 📜 License
This project is licensed under the MIT License.

