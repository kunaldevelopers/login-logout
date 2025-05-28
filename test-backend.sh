#!/bin/bash

echo "🧪 Testing Login-Logout App Backend..."

# Test health endpoint
echo "📊 Testing health endpoint..."
curl -s http://localhost:3000/health | echo "$(cat)" | head -3

echo ""
echo "🔐 Testing signup endpoint..."
curl -s -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123"
  }' | echo "$(cat)" | head -3

echo ""
echo "🔑 Testing login endpoint..."
curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' | echo "$(cat)" | head -3

echo ""
echo "✅ Backend API tests completed!"
echo "ℹ️  If you see JSON responses above, the backend is working correctly."
