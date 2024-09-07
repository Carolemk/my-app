import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CadastroScreen from "./Screens/CadastroScreen";
import LoginScreen from "./Screens/LoginScreen";
import { View, Text, StyleSheet } from "react-native";

const Stack = createStackNavigator();

// Cabeçalho personalizado
const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>VegPet</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000000",
          headerTitleAlign: "center",
          headerTitle: route.name !== "Login" ? () => <CustomHeader /> : null,
          headerBackTitleVisible: false,
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
