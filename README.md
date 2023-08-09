BadBank Project

Overview

BadBank is a simplified banking application that allows users to create accounts, view account details, and perform basic banking operations such as depositing and withdrawing amounts. The project utilizes technologies like Express.js, MongoDB, Firebase, and React to provide a complete user experience.

Features

Account Creation: Users can create new accounts with a name, email, and password.
Account Management: Users can deposit or withdraw money into/from their accounts.
User Authentication: Firebase authentication is implemented to handle user registration and sign-in processes.
Database Integration: MongoDB is used to store user account details and related data.
CORS Support: The Express server is configured with CORS to handle cross-origin requests.
Environment Variables: .env files are used to manage environment variables securely.
Dependencies

Node.js
Express
MongoDB
Firebase
React
CORS
dotenv
Setup and Installation

Clone the Repository:
bash
Copy code
git clone <repository_url>
Install Dependencies:
Navigate to the project folder and run:
Copy code
npm install
Configure Environment Variables:
Create a .env file in the root directory and add the necessary environment variables:
MONGO_KEY=<your_mongodb_uri>
PORT=<desired_port>
PROJECT_ID=<firebase_project_id>
PRIVATE_KEY_ID=<firebase_private_key_id>
PRIVATE_KEY=<firebase_private_key>
CLIENT_EMAIL=<firebase_client_email>
CLIENT_ID=<firebase_client_id>
AUTH_URI=<firebase_auth_uri>
TOKEN_URI=<firebase_token_uri>
AUTH_PROVIDER_X=<firebase_auth_provider_cert_url>
CLIENT_X509=<firebase_client_cert_url>
Start the Server:
sql
Copy code
npm start
Access the Application:
Open your browser and navigate to:
arduino
Copy code
http://localhost:<desired_port>

Fork the repository
Create a new branch for your feature or bugfix
Commit your changes
Create a pull request
License
