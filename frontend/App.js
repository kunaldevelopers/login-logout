import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import screens
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

// Import services
import { authService } from "./src/services/authService";

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        // Verify token with backend
        const isValid = await authService.verifyToken();
        setIsAuthenticated(isValid);
      }
    } catch (error) {
      console.log("Auth check error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="Dashboard">
              {(props) => (
                <DashboardScreen {...props} onLogout={handleLogout} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen {...props} onAuthSuccess={handleAuthSuccess} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => (
                  <SignupScreen {...props} onAuthSuccess={handleAuthSuccess} />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
