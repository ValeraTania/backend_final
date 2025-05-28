# Movie Trailer Rating API

## Objective
This project is a RESTful API that powers a movie trailer discovery platform. It enables users to register, log in, and view movie trailers, 
while administrators can manage movies and user accounts. The API is built using TypeScript, Node.js, and MongoDB, with JWT-based authentication 
and role-based access control to ensure secure operations.

## Technologies Used
- **TypeScript** – Strongly typed superset of JavaScript for scalable development.
- **Express.js** – Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB** – NoSQL database for flexible and scalable data storage.
- **Mongoose** – ODM for MongoDB that simplifies schema definition and queries.
- **JWT (JSON Web Tokens)** – Secure user authentication.
- **Bcrypt** – Secure password hashing.
- **express-fileupload** – Handle image uploads for movie posters.
- **express-validator** – Validate and sanitize request inputs.
- **dotenv** – Manage environment variables.
- **CORS** – Enable cross-origin requests.

## Project Structure
The project follows a layered architecture separating concerns across routes, controllers, services, and models:
├── controllers/ # Handle HTTP requests and send responses
├── services/ # Business logic and database orchestration
├── models/ # Mongoose schemas and DB interaction
├── routes/ # Express route definitions
├── middlewares/ # JWT auth and role-based access control
├── static/ # Uploaded poster images (publicly served)
├── utils/ # Helper functions (e.g., file upload, token management)
├── interfaces/ # TypeScript interfaces and enums
├── app.ts # Express app configuration
├── server.ts # Entry point of the application
├── .env # Environment variables (not included in version control)
└── README.md # Project overview and instructions

## How to Use the Database

This project uses MongoDB for data storage. Test collections are located in folder dataBase. To run the project and connect to the database:

1. **Set up a MongoDB database**  
   You can use:
   - A local MongoDB installation  
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud-based option

2. **Create a `.env` file** in the project root with the following variables:
   PORT=3000
   MONGODB_URI=mongodb+srv://trvworking:trvworking@cluster0.vqjskdj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
   SECRET_ACCESS_TOKEN=authenticationPassword

3. **Import test data (optional)**  
If you'd like to preload the database with sample users and movies:
- Export your development database to a `.json` or `.bson` file
- Share it using a GitHub repo, a `.zip`, or services like Google Drive
- Use the `mongoimport` command:
  ```
  mongoimport --uri="your_mongodb_connection_string" --collection=movies --file=movies.json --jsonArray
  ```

4. **Start the server**  
Run the backend server with: npm run dev
