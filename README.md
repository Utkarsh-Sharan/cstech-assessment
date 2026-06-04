# MERN Agent Task Management

A full-stack MERN application with agent management and task distribution.  
Built with **MongoDB, Express, React, Node.js**, styled using **TailwindCSS**, and enhanced with **Zustand**, **lucide-react**, **react-hot-toast**, **jsonwebtoken**, and **multer**.

---

## 🚀 Features

### Authentication
- **Login / Signup** pages with conditional rendering.
- Secure authentication using **JWT (jsonwebtoken)**.

### Dashboard
- **Dashboard Header**: Displays heading, "Add Agent" button, and "Upload File" button.
- **Agent List**: Shows all agents with their name, phone, and email.
- **View Task Button**: Opens a modal to display tasks assigned to that agent.

### File Upload
- Upload CSV/XLSX files using **multer**.
- Tasks are parsed and distributed among agents.
- Task details are stored in MongoDB and displayed in the frontend.

### State Management
- **Zustand** for global state handling.
- Agents and tasks are managed centrally for consistent UI updates.

### UI/UX
- **TailwindCSS** for responsive design.
- **lucide-react** icons for modern visuals.
- **react-hot-toast** for success/error notifications.

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Zustand, lucide-react, react-hot-toast
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **File Handling**: Multer
- **Styling**: TailwindCSS custom theme

---

## ⚡ Setup Instructions

### Clone
```
git clone https://github.com/Utkarsh-Sharan/cstech-assessment.git
```

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```
