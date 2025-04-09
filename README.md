# YouTube Clone - Backend API

This is the **backend API** for the YouTube clone application built using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 APIs

### 🧑 Register User
- `POST /api/auth/register`
- **Body**:
```json
{
  "username": "example",
  "email": "example@example.com",
  "password": "password123"
}
```

### 🔑 Login User
- `POST /api/auth/login`
- **Body**:
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "your_jwt_token"
}
```

---

### 🎥 Upload Video
- `POST /api/videos`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `multipart/form-data`
  - `video`: video file (mp4, webm, etc.)
  - `title`: text
  - `description`: text

### 📃 Get All Videos
- `GET /api/videos`

### 📄 Get Video by ID
- `GET /api/videos/:id`

### 👁️ Increment Views
- `PATCH /api/videos/:id/view`

### ❤️ Like / Unlike Video
- `PATCH /api/videos/:id/like`
- **Headers**: `Authorization: Bearer <token>`

### 💬 Post a Comment
- `POST /api/comments/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "content": "Great video!"
}
```

### 💬 Get Comments for a Video
- `GET /api/comments/:videoId`

### 🎞️ Get User’s Uploaded Videos
- `GET /api/videos/my`
- **Headers**: `Authorization: Bearer <token>`

### ❤️ Get Liked Videos
- `GET /api/videos/liked`
- **Headers**: `Authorization: Bearer <token>`

---

## 📂 Access Uploaded Videos

- **URL format**: `http://localhost:5000/uploads/videos/<filename>.mp4`

---

## 🔧 Notes
- `.env` file should be kept secret
- `uploads/` is ignored in Git (`.gitignore`)
- MongoDB needs to be running locally or use MongoDB Atlas
