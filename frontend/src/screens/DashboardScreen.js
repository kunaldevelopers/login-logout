import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import { authService } from "../services/authService";
import { whatsappService } from "../services/whatsappService";

const DashboardScreen = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [todayStatus, setTodayStatus] = useState({
    loginSent: false,
    logoutSent: false,
    loginTime: null,
    logoutTime: null,
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
    loadTodayStatus();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getUserData();
      setUser(userData);
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  const loadTodayStatus = async () => {
    try {
      const response = await whatsappService.getTodayStatus();
      setTodayStatus(response.data);
    } catch (error) {
      console.log("Error loading today status:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTodayStatus();
    setIsRefreshing(false);
  };

  const handleLoginMessage = async () => {
    if (todayStatus.loginSent) {
      Toast.show({
        type: "info",
        text1: "Already Logged In",
        text2: "You have already logged in today",
      });
      return;
    }

    Alert.alert(
      "Send Login Message",
      "Are you sure you want to send login message to WhatsApp group?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send", onPress: sendLoginMessage },
      ]
    );
  };

  const sendLoginMessage = async () => {
    setIsLoading(true);
    try {
      await whatsappService.sendLoginMessage();
      Toast.show({
        type: "success",
        text1: "Login Message Sent",
        text2: "Message sent successfully to WhatsApp group",
      });
      await loadTodayStatus(); // Refresh status
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Send Message",
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutMessage = async () => {
    if (todayStatus.logoutSent) {
      Toast.show({
        type: "info",
        text1: "Already Logged Out",
        text2: "You have already logged out today",
      });
      return;
    }

    Alert.alert(
      "Send Logout Message",
      "Are you sure you want to send logout message to WhatsApp group?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send", onPress: sendLogoutMessage },
      ]
    );
  };

  const sendLogoutMessage = async () => {
    setIsLoading(true);
    try {
      await whatsappService.sendLogoutMessage();
      Toast.show({
        type: "success",
        text1: "Logout Message Sent",
        text2: "Message sent successfully to WhatsApp group",
      });
      await loadTodayStatus(); // Refresh status
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Send Message",
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: onLogout, style: "destructive" },
    ]);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#ffffff"
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Welcome, {user?.name || "User"}! 👋
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Time and Date */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
          </View>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Today's Status</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Login:</Text>
              <Text
                style={[
                  styles.statusValue,
                  todayStatus.loginSent
                    ? styles.statusSent
                    : styles.statusPending,
                ]}
              >
                {todayStatus.loginSent
                  ? `✅ Sent ${
                      todayStatus.loginTime
                        ? new Date(todayStatus.loginTime).toLocaleTimeString(
                            "en-US",
                            { hour: "numeric", minute: "2-digit", hour12: true }
                          )
                        : ""
                    }`
                  : "⏳ Pending"}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Logout:</Text>
              <Text
                style={[
                  styles.statusValue,
                  todayStatus.logoutSent
                    ? styles.statusSent
                    : styles.statusPending,
                ]}
              >
                {todayStatus.logoutSent
                  ? `✅ Sent ${
                      todayStatus.logoutTime
                        ? new Date(todayStatus.logoutTime).toLocaleTimeString(
                            "en-US",
                            { hour: "numeric", minute: "2-digit", hour12: true }
                          )
                        : ""
                    }`
                  : "⏳ Pending"}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.loginButton,
                (todayStatus.loginSent || isLoading) && styles.buttonDisabled,
              ]}
              onPress={handleLoginMessage}
              disabled={todayStatus.loginSent || isLoading}
            >
              <Text style={styles.buttonIcon}>🔑</Text>
              <Text style={styles.buttonText}>
                {isLoading
                  ? "Sending..."
                  : todayStatus.loginSent
                  ? "Login Sent ✅"
                  : "Send Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.logoutActionButton,
                (todayStatus.logoutSent || isLoading) && styles.buttonDisabled,
              ]}
              onPress={handleLogoutMessage}
              disabled={todayStatus.logoutSent || isLoading}
            >
              <Text style={styles.buttonIcon}>🚪</Text>
              <Text style={styles.buttonText}>
                {isLoading
                  ? "Sending..."
                  : todayStatus.logoutSent
                  ? "Logout Sent ✅"
                  : "Send Logout"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>ℹ️ How it works</Text>
            <Text style={styles.infoText}>
              • Tap Login or Logout button to send a formatted message to the
              WhatsApp group
            </Text>
            <Text style={styles.infoText}>
              • Each button works only once per day
            </Text>
            <Text style={styles.infoText}>
              • Pull down to refresh your status
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  timeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#rgba(255,255,255,0.8)",
  },
  statusCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  statusSent: {
    color: "#4CAF50",
  },
  statusPending: {
    color: "#FFA726",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
  },
  logoutActionButton: {
    backgroundColor: "#F44336",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#rgba(255,255,255,0.8)",
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default DashboardScreen;
