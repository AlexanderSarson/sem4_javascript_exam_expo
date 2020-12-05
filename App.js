import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import GetLoginData from "./src/GetLoginData";
import MapGame from "./src/map-game";

export default function App() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [distance, setDistance] = useState(0);

  const loginDataReady = (loginData) => {
    setDistance(loginData.distance);
    setShowLoginDialog(false);
    setShowMap(true);
  };

  const cancelLoginDataDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Team Finder App</Text>
      <Text>
        latitude: {coordinates.latitude} longitude: {coordinates.longitude}
      </Text>
      {showMap && (
        <MapGame setCoordinates={setCoordinates} distance={distance} />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowLoginDialog(true)}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <GetLoginData
        onLoginDataReady={loginDataReady}
        visible={showLoginDialog}
        onCancel={cancelLoginDataDialog}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkgray",
    padding: 10,
    margin: 4,
  },
  headerText: {
    fontSize: 26,
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    flex: 10,
  },
});
