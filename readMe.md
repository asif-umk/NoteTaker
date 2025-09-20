# NoteTaker 📝

**NoteTaker** is a full-featured task management web application built with the **MERN stack** (MongoDB, Express, React, Node.js). It helps users organize and track their daily tasks efficiently with a secure authentication system and an interactive dashboard.

---

## Features

- **User Authentication**
  - Sign up and log in with JWT-based authentication
  - Passwords securely hashed with bcrypt

- **Dashboard**
  - View current date and time
  - See number of completed and pending tasks

- **Task Management**
  - Add new tasks with title, description, and priority
  - Edit tasks anytime
  - Mark tasks as complete or incomplete
  - Delete tasks when finished
  - Color-coded priorities: Green (Low), Yellow (Medium), Red (High)

- **Search & Sort**
  - Search tasks by title or description
  - Sort tasks alphabetically, by priority, or by creation date

- **Real-time Updates**
  - All CRUD operations update instantly on the UI

---

## Tech Stack

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT, bcrypt  

---

## Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/asif-umk/NoteTaker.git
   ```
## Install backend dependencies:
```bash
cd server
npm install
```

## Install frontend dependencies:
```bash
cd ../client
npm install
```

Create a .env file in the server folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


## Start the backend server:
```bash
cd ../server
npm run server
```

## Start the frontend:
```bash
cd ../client
npm start
```

Open your browser at http://localhost:5000

## Future Enhancements

Dark/Light theme toggle
Notifications for upcoming tasks
Drag-and-drop task ordering
Multi-user collaboration
## License

This project is licensed under the MIT License.