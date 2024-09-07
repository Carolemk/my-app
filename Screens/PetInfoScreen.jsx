import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Picker,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function PetInfoScreen() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [favoriteActivity, setFavoriteActivity] = useState("");
  const [profile, setProfile] = useState("");
  const [lastVaccinationDate, setLastVaccinationDate] = useState("");

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.uri);
      }
    } else {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir o acesso à galeria."
      );
    }
  };

  const handleSave = () => {
    if (
      name &&
      adoptionDate &&
      favoriteActivity &&
      profile &&
      lastVaccinationDate
    ) {
      Alert.alert(
        "Informações salvas",
        "As informações do pet foram salvas com sucesso!"
      );
      navigation.goBack(); // Navega de volta para a tela anterior
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Informações do Pet</Text>

        <TouchableOpacity
          style={styles.photoContainer}
          onPress={handlePickImage}
        >
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Text style={styles.photoText}>Escolha uma foto</Text>
          )}
        </TouchableOpacity>

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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  photoContainer: {
    width: "100%",
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  photoText: {
    color: "#888",
    fontSize: 16,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "white",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    color: "white",
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
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
