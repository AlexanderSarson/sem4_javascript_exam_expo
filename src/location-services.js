import * as Location from "expo-location";
import { SERVER_URL } from "../settings";
import { Alert } from "react-native";

const getLocationAsync = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    Alert("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({
    enableHighAccuracy: true,
  });

  const lat = location.coords.latitude;
  const lon = location.coords.longitude;
  return { lat, lon };
};

const updateLocationOnServer = async (latitude, longitude) => {
  const response = await fetch(`${SERVER_URL}/api/position`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, longitude }),
  });
  return response;
};

const getNearbyPlayers = async (latitude, longitude, distance) => {
  const response = await fetch(`${SERVER_URL}/api/position/nearbyplayers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, longitude, distance }),
  });
  return await response.json();
};

export { getLocationAsync, updateLocationOnServer, getNearbyPlayers };
