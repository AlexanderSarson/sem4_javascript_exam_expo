import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Modal, Alert, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import {
  getLocationAsync,
  updateLocationOnServer,
  getNearbyPlayers,
} from "./location-services";

export default MapGame = ({ setCoordinates, distance }) => {
  let mapRef = useRef(null);
  const [latitude, setLatitude] = useState(1);
  const [longitude, setLongitude] = useState(1);
  const [nearbyPlayers, setNearbyPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      const { lat, lon } = await getLocationAsync();
      setLatitude(lat);
      setLongitude(lon);
      await updateLocationOnServer(latitude, longitude);
      setCoordinates({ latitude: lat, longitude: lon });
      const players = await getNearbyPlayers(lat, lon, distance);
      //Alert.alert("alert", JSON.stringify(players));
      setNearbyPlayers(players);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { lat, lon } = await getLocationAsync();
      setLatitude(lat);
      setLongitude(lon);
      await updateLocationOnServer(latitude, longitude);
      setCoordinates({ latitude: lat, longitude: lon });
      const players = await getNearbyPlayers(lat, lon, distance);
      setNearbyPlayers(players);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.mapStyle}>
      <MapView
        ref={mapRef}
        style={{
          flex: 10,
          width: styles.mapStyle.width,
          height: styles.mapStyle.height,
        }}
        mapType="standard"
        initialRegion={{
          latitude: 55.7503,
          longitude: 12.4733,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            longitude,
            latitude,
          }}
        />
        {nearbyPlayers.length > 0 &&
          nearbyPlayers.map((player) => (
            <MapView.Marker
              key={player.user.id}
              coordinate={{
                latitude: player.location.coordinates[0],
                longitude: player.location.coordinates[1],
              }}
              title={player.user.userName}
              pinColor={"#4233ff"}
            />
          ))}
      </MapView>
    </View>
  );
};

function showStatusFromServer(setStatus, status) {
  setStatus(status.msg);
  setTimeout(() => setStatus("- - - - - - - - - - - - - - - - - - - -"), 3000);
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
