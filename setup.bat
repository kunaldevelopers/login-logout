@echo off
echo 🚀 Starting Login-Logout WhatsApp App Setup...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
cd backend
call npm install

echo 🔧 Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file. Please update it with your configuration.
) else (
    echo ✅ .env file already exists.
)

echo 📱 Installing frontend dependencies...
cd ..\frontend
call npm install

echo 🎯 Setting up React Native...
call npx --version >nul 2>&1
if errorlevel 1 (
    echo 📥 Installing React Native CLI globally...
    call npm install -g @react-native-community/cli
) else (
    echo ✅ React Native CLI is available.
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update backend\.env with your MongoDB URI and WhatsApp Group ID
echo 2. Start MongoDB service
echo 3. Start backend: cd backend ^&^& npm run dev
echo 4. In a new terminal, start frontend: cd frontend ^&^& npm start
echo 5. Run on Android: cd frontend ^&^& npx react-native run-android
echo 6. Run on iOS: cd frontend ^&^& npx react-native run-ios
echo.
echo 📖 For detailed instructions, see README.md

pause
