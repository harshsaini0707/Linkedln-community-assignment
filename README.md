# 💼 LinkedIn Community Assignment

A modern LinkedIn-style community web application built with Next.js App Router. It supports authentication, profile management, secure dashboard and feed, and user session handling using JWT tokens and MongoDB. Email verification is done via Nodemailer.

---

## 🚀 Tech Stack

### 🖥️ Frontend:
- **Next.js 14+ (App Router)**
- **React 18**
- **Tailwind CSS**
- **Axios**
- **Lucide-react** for icons

### ⚙️ Backend:
- **MongoDB (via Mongoose)**
- **JWT (JSON Web Tokens)** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for sending verification emails
- **Next.js API Routes** for server-side logic

### ☁️ Hosting:
- **Frontend & API:** [Vercel](https://linkedln-community-assignment.vercel.app/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshsaini0707/Linkedln-community-assignment
cd Linkedln-community-assignment
npm install
```

### 2. Create Environment Variables
Create a .env file in the root directory with the following content:
```bash
MONGO_URL=your_mongodb_uri
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
EMAIL_FROM=LinkedIn Community <your_email@example.com>
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3.Run the Development Server
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.

## 👤 Demo
You can use this verified test account:

✅ Verified User
Email: harshsaini0172@gmail.com
Password: 1234

You can create your account and verify the email 

<img width="1896" alt="Screenshot" src="https://github.com/user-attachments/assets/9c8d8f29-359b-4ff6-9049-a677e8c76d15" />
<img width="1896" height="863" alt="Screenshot 2025-08-03 224259" src="https://github.com/user-attachments/assets/6bf5a421-4337-4868-b29a-9910d23472e3" />
<img width="1896" height="866" alt="Screenshot 2025-08-03 224129" src="https://github.com/user-attachments/assets/9299f6cb-5dd9-46f0-977c-f9608c4bdd29" />

<img width="1905" height="810" alt="Screenshot 2025-08-03 230331" src="https://github.com/user-attachments/assets/aa859713-7fad-4c19-905d-f09268a9255b" />



