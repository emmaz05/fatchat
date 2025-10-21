# Fatchat

Fatchat is a full-stack social web application designed to let users share restaurant experiences, connect with friends, and discover new places through interactive map-based posts.

## Features
- Post to different restaurants with captions and ratings.
- Map pins show the location of posts and information about the user who created them.
- User profiles with the ability to add friends and view friends' posts.
- Interactive feed with posts from friends and nearby locations.

## Technologies Used
- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Google OAuth
- **Real-time updates:** Socket.io

## How to Run

```bash
# 1. Clone the repository
git clone https://github.com/emmaz05/fatchat.git

# 2. Install dependencies
cd fatchat
npm install

# 3. Set up environment variables by creating a .env file in the root directory
# Example:
# CLIENT_ID=your_google_client_id
# MONGO_URI=your_mongodb_connection_string

# 4. Start the application
# In one terminal:
npm run hotloader
# In another terminal:
npm start

# 5. Open the app in your browser
# http://localhost:5050

