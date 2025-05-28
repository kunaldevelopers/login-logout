# Login-Logout WhatsApp Mobile App

A full-stack mobile application that allows users to sign up, log in, and send formatted login/logout messages to a WhatsApp group once per day.

## Project Structure

```
login-whatsapp-app/
│
├── backend/               # Node.js + Express + whatsapp-web.js
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Authentication middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # WhatsApp service
│   │   └── app.js         # Main app file
│   ├── package.json
│   └── server.js
│
├── frontend/              # React Native Mobile App
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── screens/       # App screens
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   ├── App.js
│   └── package.json
│
└── README.md
```

## Features

- 📱 Cross-platform mobile app (React Native)
- 🔐 JWT-based authentication
- 💾 MongoDB data storage
- 💬 WhatsApp integration with persistent session
- ⏰ Once-per-day login/logout tracking
- 🎨 Modern, clean UI

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- React Native development environment
- Android Studio / Xcode for mobile development

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/login-logout-app
   JWT_SECRET=your-super-secret-jwt-key
   WHATSAPP_GROUP_ID=your-whatsapp-group-id
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Scan QR code when prompted to connect WhatsApp Web (only needed once)

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. For Android:

   ```bash
   npx react-native run-android
   ```

4. For iOS:
   ```bash
   npx react-native run-ios
   ```

## API Endpoints

- `POST /api/signup` - Create new user account
- `POST /api/login` - Authenticate user and get JWT token
- `POST /api/login-msg` - Send login message to WhatsApp (once per day)
- `POST /api/logout-msg` - Send logout message to WhatsApp (once per day)

## Usage

1. **Sign Up**: Create an account with email, name, and password
2. **Log In**: Enter credentials to access the dashboard
3. **Daily Actions**: Tap Login or Logout button (once per day only)
4. **WhatsApp Messages**: Formatted messages are sent automatically to the configured group

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints
- Input validation and sanitization

## WhatsApp Message Format

**Login Message:**

```
✅ [User Name] login kiya
🕒 10:02 AM
📅 28 May 2025
```

**Logout Message:**

```
🚫 [User Name] logout kiya
🕒 6:12 PM
📅 28 May 2025
```

## Troubleshooting

1. **WhatsApp Session Issues**: Delete `.wwebjs_auth` folder and restart server
2. **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
3. **React Native Issues**: Clear cache with `npx react-native start --reset-cache`

## License

MIT License
