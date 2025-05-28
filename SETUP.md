# 🚀 Login-Logout WhatsApp Mobile App - Quick Start Guide

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Installation guide](https://docs.mongodb.com/manual/installation/)
- **React Native development environment** - [Setup guide](https://reactnative.dev/docs/environment-setup)
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **WhatsApp account** for the bot

## ⚡ Quick Setup (5 minutes)

### 1. Clone and Install

```bash
cd "c:\Users\Kunal\Downloads\Login-Logout"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
# Copy and edit backend environment file
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/login-logout-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
WHATSAPP_GROUP_ID=your-whatsapp-group-id
```

### 3. Start MongoDB

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or start manually
mongod
```

### 4. Start Backend Server

```bash
cd backend
npm start
```

**Important**: When you first start the backend, you'll see a QR code in the terminal. **Scan this QR code with your WhatsApp mobile app** to connect the bot. This only needs to be done once.

### 5. Get WhatsApp Group ID

1. Create a WhatsApp group
2. Add the bot number to the group
3. Send any message in the group
4. Check the backend console logs for the group ID
5. Update `WHATSAPP_GROUP_ID` in `.env` file

### 6. Start Frontend

```bash
# Open a new terminal
cd frontend
npm start

# In another terminal, run on Android
npx react-native run-android

# Or run on iOS
npx react-native run-ios
```

## 📱 Testing the App

1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Enter your credentials to access the dashboard
3. **Send Messages**: Tap Login or Logout buttons (once per day only)
4. **Check WhatsApp**: Verify formatted messages appear in your group

## 🛠️ Troubleshooting

### WhatsApp Bot Issues

- **QR Code not appearing**: Restart backend server
- **Session expired**: Delete `.wwebjs_auth` folder and restart
- **Messages not sending**: Check group ID and ensure bot is in the group

### Database Issues

- **MongoDB connection error**: Ensure MongoDB is running
- **Connection refused**: Check if MongoDB service is started

### React Native Issues

- **Metro bundler error**: Run `npx react-native start --reset-cache`
- **Android build fails**: Ensure Android SDK is properly configured
- **iOS build fails**: Open project in Xcode and check signing

### API Issues

- **Network error**: Update API base URL in frontend for your device:
  - **Android Emulator**: `http://10.0.2.2:3000/api`
  - **Physical Device**: `http://YOUR_COMPUTER_IP:3000/api`
  - **iOS Simulator**: `http://localhost:3000/api`

## 🔧 Configuration for Different Environments

### For Android Emulator

Update `frontend/src/services/authService.js` and `whatsappService.js`:

```javascript
const API_BASE_URL = "http://10.0.2.2:3000/api";
```

### For Physical Device

Update with your computer's IP address:

```javascript
const API_BASE_URL = "http://192.168.1.100:3000/api"; // Replace with your IP
```

### For Production

Update backend `.env`:

```env
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-secret
```

Update frontend API URLs to your production server.

## 📄 Project Structure Overview

```
login-whatsapp-app/
├── backend/                 # Express.js + MongoDB + WhatsApp Bot
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # WhatsApp service
│   │   └── middleware/     # Authentication
│   └── server.js
├── frontend/               # React Native Mobile App
│   ├── src/
│   │   ├── screens/        # App screens
│   │   ├── services/       # API calls
│   │   └── utils/          # Helper functions
│   └── App.js
└── README.md
```

## 🎯 Key Features

- ✅ **Once-per-day limit**: Users can only send login/logout once daily
- 🔐 **JWT Authentication**: Secure token-based auth
- 💾 **MongoDB Storage**: User data and daily logs
- 📱 **Cross-platform**: Works on Android and iOS
- 🤖 **Persistent WhatsApp Bot**: Stays connected using LocalAuth
- 🎨 **Modern UI**: Beautiful gradient design with real-time clock

## 🆘 Need Help?

1. **Check logs**: Backend and React Native logs provide detailed error info
2. **Restart services**: Try restarting MongoDB, backend, and Metro bundler
3. **Clear cache**: Delete `node_modules` and run `npm install` again
4. **Check network**: Ensure frontend can reach backend API

## 🚀 Ready to Use!

Once setup is complete, users can:

1. Create accounts and login
2. View real-time dashboard with current time
3. Send formatted login/logout messages to WhatsApp group
4. Track daily status (already sent or pending)

The app enforces the once-per-day rule and provides clear feedback to users.
