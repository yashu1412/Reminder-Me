Here’s a complete `README.md` file for your **Reminder-Me** MERN stack project. It explains what the project does, how to run it locally, and how to use the API.

---

```markdown
# Remind-me-later live link:https://reminder-me-ten.vercel.app/

A full-stack MERN application that allows users to schedule reminders by specifying a date, time, message, and delivery method (currently supports email). Built as part of a hiring screening process.

## 🧠 Features

- Create, update, delete, and retrieve reminders
- Send email notifications via Nodemailer
- REST API with MongoDB backend
- Simple React frontend for creating reminders
- Environment variable-based secure configuration

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Email:** Nodemailer  
**Tools:** dotenv, concurrently

---

## 📁 Folder Structure

```

Remind-me-later/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   └── .env
├── README.md
└── package.json

````

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Reminder-Me.git
cd remind-me-later
````

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_password_or_app_password
```

Start backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ./
npm install
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_BASE_URL=https://reminder-me-25s1.onrender.com/api/v1
```

Start frontend:

```bash
npm start
```

---

## 🧪 API Endpoints

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| POST   | `/CreateReminder`          | Create a new reminder   |
| GET    | `/GetAllReminders`         | Fetch all reminders     |
| GET    | `/:message`                | Get reminder by message |
| PUT    | `/:message`                | Update reminder         |
| DELETE | `/:message`                | Delete reminder         |

### Example POST Body:

```json
{
  "date": "2025-05-20",
  "time": "14:00",
  "message": "Team meeting",
  "remind_via": "email",
  "email": "user@example.com"
}
```

---

## ✅ Future Improvements

* Add Email support .
* Add scheduling via cron jobs or external task queues
* Add user authentication
* Add dashboard to view and manage reminders

---

## 👤 Author

**YashpalSingh Pawara**

GitHub: [@yashpalsinghpawara](https://github.com/yashu1412)

---

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if you want this tailored for deployment (e.g., on Vercel/Render), Dockerized, or with markdown badges.
```
