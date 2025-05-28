#!/bin/bash

echo "🚀 Starting Login-Logout WhatsApp App Setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB doesn't seem to be running. Please start MongoDB first."
    echo "   You can start it with: sudo systemctl start mongod"
    echo "   Or install MongoDB if not installed: https://docs.mongodb.com/manual/installation/"
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
else
    echo "✅ .env file already exists."
fi

echo "📱 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🎯 Setting up React Native..."
if command -v npx &> /dev/null; then
    echo "✅ React Native CLI is available."
else
    echo "📥 Installing React Native CLI globally..."
    npm install -g @react-native-community/cli
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your MongoDB URI and WhatsApp Group ID"
echo "2. Start MongoDB: sudo systemctl start mongod"
echo "3. Start backend: cd backend && npm run dev"
echo "4. In a new terminal, start frontend: cd frontend && npm start"
echo "5. Run on Android: cd frontend && npx react-native run-android"
echo "6. Run on iOS: cd frontend && npx react-native run-ios"
echo ""
echo "📖 For detailed instructions, see README.md"
