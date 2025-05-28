#!/bin/bash

# 🧪 Complete Integration Test Script for Login-Logout WhatsApp App
# Run this script to test all functionality

echo "🚀 Starting comprehensive test of Login-Logout WhatsApp App..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test configuration
BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api"
TEST_EMAIL="testuser$(date +%s)@example.com"
TEST_PASSWORD="test123"
TEST_NAME="Test User"

echo -e "${YELLOW}📋 Test Configuration:${NC}"
echo "Base URL: $BASE_URL"
echo "Test Email: $TEST_EMAIL"
echo "Test Name: $TEST_NAME"
echo ""

# Function to check if server is running
check_server() {
    echo -e "${YELLOW}🔍 Checking if server is running...${NC}"
    response=$(curl -s -w "%{http_code}" -o /dev/null $BASE_URL/health)
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ Server is running on $BASE_URL${NC}"
        return 0
    else
        echo -e "${RED}❌ Server is not running. Please start with: cd backend && npm start${NC}"
        return 1
    fi
}

# Function to test health endpoint
test_health() {
    echo -e "${YELLOW}🏥 Testing health endpoint...${NC}"
    response=$(curl -s $BASE_URL/health)
    if echo "$response" | grep -q "OK"; then
        echo -e "${GREEN}✅ Health check passed${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ Health check failed${NC}"
        return 1
    fi
}

# Function to test user signup
test_signup() {
    echo -e "${YELLOW}👤 Testing user signup...${NC}"
    response=$(curl -s -X POST $API_URL/signup \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$TEST_NAME\",\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")
    
    if echo "$response" | grep -q "User created successfully"; then
        echo -e "${GREEN}✅ User signup successful${NC}"
        # Extract token for later use
        TOKEN=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        echo "Token extracted: ${TOKEN:0:20}..."
        return 0
    else
        echo -e "${RED}❌ User signup failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to test user login
test_login() {
    echo -e "${YELLOW}🔑 Testing user login...${NC}"
    response=$(curl -s -X POST $API_URL/login \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")
    
    if echo "$response" | grep -q "Login successful"; then
        echo -e "${GREEN}✅ User login successful${NC}"
        # Extract fresh token
        TOKEN=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        echo "Fresh token extracted: ${TOKEN:0:20}..."
        return 0
    else
        echo -e "${RED}❌ User login failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to test protected route access
test_protected_route() {
    echo -e "${YELLOW}🔒 Testing protected route access...${NC}"
    response=$(curl -s -X GET $API_URL/today-status \
        -H "Authorization: Bearer $TOKEN")
    
    if echo "$response" | grep -q "Today status retrieved successfully"; then
        echo -e "${GREEN}✅ Protected route access successful${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ Protected route access failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to test WhatsApp login message
test_whatsapp_login() {
    echo -e "${YELLOW}💬 Testing WhatsApp login message...${NC}"
    response=$(curl -s -X POST $API_URL/login-msg \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q "Login message sent successfully"; then
        echo -e "${GREEN}✅ WhatsApp login message sent successfully${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ WhatsApp login message failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to test WhatsApp logout message
test_whatsapp_logout() {
    echo -e "${YELLOW}💬 Testing WhatsApp logout message...${NC}"
    response=$(curl -s -X POST $API_URL/logout-msg \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q "Logout message sent successfully"; then
        echo -e "${GREEN}✅ WhatsApp logout message sent successfully${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ WhatsApp logout message failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to test duplicate prevention
test_duplicate_prevention() {
    echo -e "${YELLOW}🚫 Testing duplicate message prevention...${NC}"
    response=$(curl -s -X POST $API_URL/login-msg \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q "already logged in today"; then
        echo -e "${GREEN}✅ Duplicate prevention working correctly${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ Duplicate prevention failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Main test execution
main() {
    echo "🧪 Running comprehensive integration tests..."
    echo "============================================="
    
    # Initialize counters
    total_tests=0
    passed_tests=0
    
    # Run tests
    tests=(
        "check_server"
        "test_health"
        "test_signup"
        "test_login"
        "test_protected_route"
        "test_whatsapp_login"
        "test_whatsapp_logout"
        "test_duplicate_prevention"
    )
    
    for test in "${tests[@]}"; do
        echo ""
        total_tests=$((total_tests + 1))
        if $test; then
            passed_tests=$((passed_tests + 1))
        fi
        echo "---"
    done
    
    # Final report
    echo ""
    echo "=================================================="
    echo -e "${YELLOW}📊 FINAL TEST REPORT${NC}"
    echo "=================================================="
    echo "Total Tests: $total_tests"
    echo -e "Passed: ${GREEN}$passed_tests${NC}"
    echo -e "Failed: ${RED}$((total_tests - passed_tests))${NC}"
    
    if [ $passed_tests -eq $total_tests ]; then
        echo -e "${GREEN}🎉 ALL TESTS PASSED! Project is fully functional.${NC}"
        return 0
    else
        echo -e "${RED}❌ Some tests failed. Check the output above for details.${NC}"
        return 1
    fi
}

# Run the main function
main
