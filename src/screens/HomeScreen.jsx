import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button
        title="Report Issue"
        onPress={() => navigation.navigate("ReportIssue")}
      />
      <Button
        title="View Issue Map"
        onPress={() => navigation.navigate("IssueMap")}
      />
      <Button
        title="View Consumption"
        onPress={() => navigation.navigate("Consumption")}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default HomeScreen;
