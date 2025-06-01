# Pixisphere Backend API

## Setup

1. Install dependencies:

```bash
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon

## .env

PORT=5000
MONGO_URI=mongodb://localhost:27017/pixisphere
JWT_SECRET=your_jwt_secret_key


npm start


## API Endpoints


#Auth

POST /api/auth/signup

POST /api/auth/verify-otp

POST /api/auth/login

# Partner

POST /api/partner/onboard

# Inquiry

POST /api/inquiry (client only)

GET /api/inquiry/leads (partner only)

# Portfolio

POST /api/portfolio

GET /api/portfolio

PUT /api/portfolio/:id

DELETE /api/portfolio/:id

# Admin


GET /api/admin/verifications

PUT /api/admin/verify/:id

GET /api/admin/stats


## Testing

- Use **Postman** to test all APIs.
- First, use the **signup** and **login** APIs to register users and get the JWT token.
- Copy the returned token and use it as a **Bearer Token** in Postman Authorization headers for protected routes.
- To save time, import the provided `.postman_collection.json` file into Postman.
- This collection includes all API endpoints with sample JSON data for easy testing.
- Set the environment variable `baseUrl` to your backend server URL (e.g., `http://localhost:5000`).
- Use the collection to quickly send requests without manually entering data.



