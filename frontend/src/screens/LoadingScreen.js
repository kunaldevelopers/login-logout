import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const LoadingScreen = () => {
  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <View style={styles.content}>
        <Text style={styles.title}>Login-Logout App</Text>
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
  },
  loader: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.8,
  },
});

export default LoadingScreen;
