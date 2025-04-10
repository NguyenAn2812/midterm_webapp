# 🎬 WeTube - YouTube Clone Web Application

WeTube is a video sharing platform inspired by YouTube, where users can register an account, log in, upload videos, watch content, and interact through comments.
---

## 🚀 Technologies Used

### 🖥️ Backend
- **Node.js**, **Express.js** – for building RESTful APIs
- **MongoDB** – NoSQL database for storing user info, videos, and comments
- **Mongoose** –  ORM for MongoDB
- **JWT (JSON Web Token)** – for user authentication and securing APIs
- **Multer** –  for handling video file uploads
- **Bcrypt** – for password hashing

### 💻 Frontend
- **ReactJS** – for building the user interface
- **Vite** – a bundler tool that speeds up build and development time
- **Axios** – to send requests to the backend API
- **Context API** – to manage login status and user data

---

## 📁  Project Structure

### 📦 Frontend
```
src/
├── context/
│   └── UserContext.jsx
├── components/
│   ├── VideoCard.jsx
│   ├── AuthForm.jsx
│   ├── CommentsContainer.jsx
│   ├── MainContainer.jsx
│   ├── NavigationBar.jsx
│   └── VideoContainer.jsx
├── pages/
│   ├── AccountPage.jsx
│   ├── ChannelPage.jsx
│   ├── MyVideosPage.jsx
│   ├── RegisterLoginPage.jsx
│   ├── UploadPage.jsx
│   └── WatchPage.jsx
```

⚙️ Backend
```
    Copy
    Edit 
backend/
├── models/
│   ├── User.js
│   ├── Video.js
│   └── Comment.js
├── controllers/
│   ├── authController.js
│   ├── videoController.js
│   └── commentController.js
├── routes/
│   ├── authRoute.js
│   ├── userRoute.js
│   ├── videoRoute.js
│   └── commentRoute.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadVideoMiddleware.js
├── utils/
│   ├── generateToken.js
│   └── hashPassword.js
└── server.js
```
🔐  Key Features: 
User Registration / Login

Authentication using JWT

Personal Video Upload

Watch Videos and View Channel Details

Comment on Videos

Modern & Responsive User Interface 

⚙️ Application Setup Guide
1. Backend Setup
    ##Navigate to the backend folder:
            cd backend
    ##Install dependencies:           
            npm install
    ##Start the backend server:
            npm start

⚠️ Remember to create a .env file with:
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_secret_key


2. Frontend Setup
                cd frontend
                npm install
                npm run dev

If you don't have MongoDB and node js see the instructions below

# 🛠️ Installing Node.js & MongoDB

This guide will help you install **Node.js** and **MongoDB** on both **Windows** and **macOS/Linux** to run the WeTube application.

---

## ✅ Node.js

### 🔵 Windows

1. Visit: [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended).
3. Run the `.msi` installer and follow the setup instructions.
4. Open Command Prompt or PowerShell and verify the installation:
   ```bash
   node -v
   npm -v
   ```

---

### 🍎 macOS / 🐧 Linux

#### Option 1: Using apt (for Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

#### Option 2: Using Node Version Manager (Recommended)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc    # or ~/.zshrc depending on your shell
nvm install --lts
nvm use --lts
```

Check Node.js version:
```bash
node -v
npm -v
```

---

## ✅ MongoDB

### 🔵 Windows

1. Go to: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Download the **MSI installer** for your system.
3. Install MongoDB and make sure **"Install MongoDB as a Service"** is selected.
4. After installation, MongoDB should start automatically as a background service.
5. To check if MongoDB is running:
   ```bash
   services.msc
   ```
   Look for **MongoDB Server** in the list.

---

### 🍎 macOS / 🐧 Linux

#### On Ubuntu/Debian-based systems:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### On macOS using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb/brew/mongodb-community
```

To check MongoDB version:
```bash
mongod --version
```

---

✅ Once both Node.js and MongoDB are installed and running, you can proceed with setting up your WeTube backend and frontend.


