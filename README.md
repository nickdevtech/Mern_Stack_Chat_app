# 💬 ChitChat – Real-Time Messaging App

A modern **real-time chat application** built with the **MERN stack**, featuring secure authentication, live messaging, and online user status tracking.

🔗 **Live Demo:** [ChitChat App](https://mern-stack-chat-app-ddrd.onrender.com/)

---

## 🌟 Tech Stack

- **MongoDB** – Database  
- **Express.js** – Backend framework  
- **React.js** – Frontend library  
- **Node.js** – Runtime environment  
- **Socket.io** – Real-time communication  
- **TailwindCSS + DaisyUI** – Modern UI styling  
- **Zustand** – Lightweight state management  
- **JWT** – Secure authentication & authorization  

---

## 📂 Folder Structure

```
chitchat/
├── frontend/                # Frontend (React + Vite or CRA)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages (Login, Chat, etc.)
│   │   ├── store/         # Zustand state management
│   │   ├── utils/         # Helpers (API calls, socket setup)
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── backend/                # Backend (Express + Node.js)
│   ├── config/            # DB & server configs
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── socket/            # Socket.io setup
│   ├── utils/             # Utility functions
│   ├── server.js          # Express app entry point
│   └── package.json
│
├── .env.example           # Environment variable template
├── README.md              # Project documentation
└── package.json           # Root (optional, if using workspaces)
```

---

## 🎯 Features

- ✅ JWT-based Authentication & Authorization  
- ✅ Real-time Messaging with Socket.io  
- ✅ Online User Presence Tracking  
- ✅ Global State with Zustand  
- ✅ Responsive UI (Tailwind + DaisyUI)  
- ✅ Robust Error Handling  

---

## 🚀 Quickstart

1. **Clone the repo**
```bash
git clone <repo-url>
cd chitchat
```

2. **Install dependencies**
```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

3. **Setup environment variables**  
Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
```

4. **Run the app**
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm start
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

- **Backend:** Render / Railway / Heroku  
- **Frontend:** Vercel / Netlify  
- **Database:** MongoDB Atlas  

---

## 📜 License

MIT  
