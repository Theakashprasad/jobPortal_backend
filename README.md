# Job Portal - Backend

The JobPortal backend is built with Node.ts, Express, and MongoDB. It handles user authentication using JWT, and provides secure RESTful APIs for blog creation, retrieval, updating, and deletion, ensuring only authors can modify their own posts.

## Project Structure
```
project-root/
└── backend/
    └── bloghub/
        └── src/
            ├── config/
            │   └── DB
            │
            ├── controllers/
            │   ├── authController.ts
            │   └── jobController.ts
            │
            ├── interfaces/
            │   ├── jobInterface.ts
            │   ├── multerInterface.ts
            │   └── userInterface.ts
            │
            ├── middleware/
            │   ├── authenticationMiddleware.ts
            │   └── uploadMiddleware.ts
            │
            ├── models/
            │   ├── blog.ts
            │   └── user.ts
            │
            ├── routes/
            │   ├── authRouter.ts
            │   └── userRouter.ts
            │
            ├── utils/
            │   ├── jwt.ts
            │   └── password.ts
            │
            └── server.ts
```
## Features

- Authentication
  - Signup: firstName, lastName, email, password (hashed); duplicate email handled
  - Login: JWT token generated, stored in HTTP-only cookie
  - Account setup: company details, profile completion, new JWT issued
  - Logout: clears auth cookie

- Job Management (CRUD)
  - List jobs by company: GET /api/jobs/:id
  - View single job: GET /api/jobs/viewOne/:id
  - Create job: POST /api/jobs/ (title, companyId, location, remote, salary, description, tags, role, education, experience, type, level, expiration)
  - Update job: PUT /api/jobs/:id
  - Delete job: DELETE /api/jobs/:id

- Data Models
  - User: name, email, password, company/org details, logo, isProfileComplete
  - Job: title, companyId, location, fullyRemote, salary, description, tags, jobRole, educationLevel, experienceLevel, jobType, jobLevel, expirationDate, timestamps

- Middleware & Security
  - Auth middleware: verifies JWT, handles expired/missing tokens
  - CORS: configurable origins, credentials enabled
  - Body parsing: `express.json()` and `express.urlencoded()`

## Technologies Used

- Runtime: Node.js  
- Language: TypeScript  
- Framework: Express.js v5  
- Database: MongoDB (Mongoose v9)  
- Authentication: JWT, bcryptjs  
- Security / CORS: CORS  
- Environment: dotenv  
- Dev tools: nodemon, ts-node-dev, TypeScript

## Project Structure



## Getting Started

### Prerequisites

- Node.ts
- MongoDB

### Installation

1. Clone the repository
   ```sh
   https://github.com/Theakashprasad/BlogHub_backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
2. Install typeScript
   ```sh
   npx tsc
   ```
4.  **Environment Variables**:

        Ensure that the environment variables are correctly set in a `.env` file, in the location .env.example is located. Here is an example of the required environment variables:

        ```
  

    ```
4. Start the server
   ```sh
   npm start
   ```

