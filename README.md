
# 🔐 2-Step Verification System

A **secure two-step verification system** built with the **MERN Stack** (MongoDB, Express, React, Node.js).  
It includes **admin login, OTP verification**, and **JWT authentication** for enhanced security.

---

## 🚀 Live Demo  
🔗 **Frontend (Render):** [https://two-step-verification-1-1.onrender.com](https://two-step-verification-1-1.onrender.com)

💻 **GitHub Repo:** [https://github.com/naimehossen/2-step-verification-1](https://github.com/naimehossen/2-step-verification-1)

---

## ⚙️ Features

✅ Admin Login System  
✅ Secure JWT Authentication  
✅ Email-based OTP (6-digit code)  
✅ OTP Expiration & Verification  
✅ Responsive UI (React)  
✅ Environment variables support (`.env`)  
✅ Hosted on Render  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, Bcrypt.js |
| Email Service | Nodemailer |
| Deployment | Render |

---

## 📸 Preview

> *Add a screenshot of your login and OTP page here (optional)*  
> Example:  
> ![App Screenshot](./preview.png)

---

## 🧑‍💻 How It Works

1️⃣ **Login:**  
   - Admin enters username and password.  
   - Backend validates credentials using bcrypt.  

2️⃣ **OTP Generation:**  
   - System generates a random 6-digit OTP.  
   - Sends OTP via email using Nodemailer.  

3️⃣ **OTP Verification:**  
   - Admin enters OTP.  
   - OTP verified within limited time.  
   - On success → Redirects to Dashboard.  

---

## ⚡ Installation Guide

Clone the repo and install dependencies:

```bash
git clone https://github.com/naimehossen/2-step-verification-1.git
cd 2-step-verification-1
