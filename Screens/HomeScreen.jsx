import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Button,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [petData, setPetData] = useState(null);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const storedPetData = await AsyncStorage.getItem("petData");
        if (storedPetData) {
          setPetData(JSON.parse(storedPetData));
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do pet.");
      }
    };

    const checkForUpdateMessage = async () => {
      const shouldShowUpdateMessage = await AsyncStorage.getItem(
        "showUpdateMessage"
      );
      if (shouldShowUpdateMessage === "true") {
        setShowUpdateMessage(true);
        await AsyncStorage.removeItem("showUpdateMessage");
      }
    };

    fetchPetData();
    checkForUpdateMessage();
  }, []);

  const handleEdit = () => {
    navigation.navigate("PetInfo");
  };

  return (
    <View style={styles.container}>
      {petData ? (
        <>
          <View style={styles.photoContainer}>
            {/* Exibir sempre o logo */}
            <Image source={require("../assets/dog.jpg")} style={styles.photo} />
          </View>
          <Text style={styles.message}>Informações do seu pet:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Nome: {petData.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Data de Adoção: {petData.adoptionDate}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Atividade Favorita: {petData.favoriteActivity}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Perfil: {petData.profile}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Última Vacinação: {petData.lastVaccinationDate}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.message}>
          Cadastre a foto e dados do seu amigo para acompanhar as informações
          aqui.
        </Text>
      )}
      <Button
        title={petData ? "Editar Informações" : "Cadastrar Pet"}
        onPress={handleEdit}
        color="#4CAF50"
      />

      <Modal
        transparent={true}
        visible={showUpdateMessage}
        animationType="fade"
        onRequestClose={() => setShowUpdateMessage(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Dados atualizados com sucesso!</Text>
            <Button
              title="Fechar"
              onPress={() => setShowUpdateMessage(false)}
              color="#4CAF50"
            />
          </View>
        </View>
      </Modal>
    </View>
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
  photoContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 60, // Torna o contêiner redondo
    overflow: "hidden", // Garante que a imagem não extrapole o contêiner
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 60, // Torna a imagem redonda
  },
  message: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#444444",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 15,
  },
});
