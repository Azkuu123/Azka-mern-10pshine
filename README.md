# Azka-mern-10pshine

A full-stack **MERN based Notes Management Application** that allows users to securely create, edit, search, pin, and delete notes with authentication & user profile support.  

This application was developed as part of an internship, focusing on **clean code, structured APIs, logging, testing, and SonarQube-based code quality assurance**.

---

## 🚀 Features

### ✅ User & Auth
- User Registration & Login (JWT Authentication)
- Protected Routes using middleware
- Update user profile and bio

### 📝 Notes Management
- Create, update, delete notes
- Color-coded notes UI
- Pin / Unpin important notes
- Search notes by title, content & tags

### 🎨 UI / UX
- Fully responsive React UI
- Clean layout using TailwindCSS
- Toast notifications
- Dark / Light Theme Toggle

### 🧪 Testing
- **Frontend unit testing** (React Testing Library / Jest)
- **Backend testing** (Jest / Supertest)

### 📊 Code Quality & Logging
- **SonarQube Integration** for code analysis
- **Pino Logger** for backend request tracing & debugging

---

## 🧱 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Token) |
| Logging | Pino & pino-http |
| Testing | Jest, React Testing Library, Supertest |
| Code Quality | SonarQube + GitHub Actions CI |

---

## 📁 Folder Structure

Azka-mern-10pshine/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── logger.js
│ ├── utilities.js
│ ├── index.js
│ └── config.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── public/
│ └── package.json
│
└── .github/workflows/sonar.yml

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Azkuu123/Azka-mern-10pshine.git
cd Azka-mern-10pshine

2️⃣ Backend Setup
cd backend
npm install
npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

4️⃣ Open App in Browser
http://localhost:5173/

🔐 Environment Variables

Create .env inside backend:

ACCESS_TOKEN_SECRET=your_jwt_secret

🧪 Running Tests
Backend Tests
cd backend
npm test

Frontend Tests
cd frontend
npm test

🛰 SonarQube Integration (CI/CD)

Project includes a GitHub Actions workflow for SonarQube:

.github/workflows/sonar.yml

Required Repository Secrets:

| Secret Name      | Example Value                             |
| ---------------- | ----------------------------------------- |
| `SONAR_TOKEN`    | `sqp_abc123xyz`                           |
| `SONAR_HOST_URL` | `http://localhost:9000` or SonarCloud URL |

After pushing → go to Actions Tab → View Analysis Report
Full report is visible in your local SonarQube dashboard.


🎯 Future Enhancements

Note Sharing / Collaboration

Label-based filtering

Cloud deployment (Render / Vercel / Railway)

Encryption for notes content


✨ Author

Azka — MERN Stack Developer
Internship Project (10pShine)
<img width="1920" height="904" alt="Screenshot (144)" src="https://github.com/user-attachments/assets/a6edccbc-1477-4fa8-8251-9cad4ef33068" /><img width="1920" height="906" alt="Screenshot (145)" src="https://github.com/user-attachments/assets/c609eb7d-9896-4f95-a5f3-63c9d7289b75" />

## 📁 Folder Structure<img width="1920" height="909" alt="Screenshot (143)" src="https://github.com/user-attachments/assets/71fcea19-b602-4822-bf64-20428ef49d4d" />

