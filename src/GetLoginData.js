import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { SERVER_URL } from "../settings";

export default function GetLoginData(props) {
  const [userName, setUserName] = useState("team1");
  const [password, setPassword] = useState("secret");
  const [distance, setDistance] = useState("10000");
  const { onLoginDataReady, visible, onCancel } = props;

  const submit = async () => {
    const loginData = { userName, password, distance };
    await fetch(`${SERVER_URL}/api/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    onLoginDataReady(loginData);
    setUserName("team1");
    setPassword("secret");
    setDistance("10000");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          value={userName}
          style={styles.input}
          onChangeText={(txt) => setUserName(txt)}
          placeholder="Enter Username"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          placeholder="Enter Password"
        />
        <TextInput
          style={styles.input}
          value={distance}
          onChangeText={(txt) => setDistance(txt)}
          placeholder="Enter Radius (in meters)"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={submit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});
