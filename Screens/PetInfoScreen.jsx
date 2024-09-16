import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Picker,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PetInfoScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [favoriteActivity, setFavoriteActivity] = useState("");
  const [profile, setProfile] = useState("");
  const [lastVaccinationDate, setLastVaccinationDate] = useState("");

  const handleSave = async () => {
    if (
      name &&
      adoptionDate &&
      favoriteActivity &&
      profile &&
      lastVaccinationDate
    ) {
      try {
        const petData = {
          name,
          adoptionDate,
          favoriteActivity,
          profile,
          lastVaccinationDate,
        };
        await AsyncStorage.setItem("petData", JSON.stringify(petData));

        await AsyncStorage.setItem("showUpdateMessage", "true");

        Alert.alert(
          "Informações salvas",
          "As informações do pet foram salvas com sucesso!"
        );
        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Erro", "Erro ao salvar os dados do pet.");
      }
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Informações do Pet</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Pet"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Adoção"
          value={adoptionDate}
          onChangeText={setAdoptionDate}
          placeholderTextColor="#888"
        />

        <Picker
          selectedValue={favoriteActivity}
          style={styles.picker}
          onValueChange={(itemValue) => setFavoriteActivity(itemValue)}
        >
          <Picker.Item label="Escolha a brincadeira favorita" value="" />
          <Picker.Item label="Bola" value="bola" />
          <Picker.Item label="Correr" value="correr" />
          <Picker.Item label="Passear" value="passear" />
          <Picker.Item label="Assistir TV" value="assistir_tv" />
          <Picker.Item label="Dormir" value="dormir" />
        </Picker>

        <Picker
          selectedValue={profile}
          style={styles.picker}
          onValueChange={(itemValue) => setProfile(itemValue)}
        >
          <Picker.Item label="Escolha o perfil" value="" />
          <Picker.Item label="Agitado" value="agitado" />
          <Picker.Item label="Calmo" value="calmo" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Data da Última Vacinação"
          value={lastVaccinationDate}
          onChangeText={setLastVaccinationDate}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    color: "#333333",
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    color: "#333333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
