import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/apiService"; // Importe a função de login do apiService

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async () => {
    if (email && senha) {
      try {
        const response = await login({ email, senha });
        if (response.success) {
          // Armazena o token no AsyncStorage
          await AsyncStorage.setItem("authToken", response.token);

          // Exibe uma mensagem de sucesso e orienta o usuário a recarregar a página
          alert("Login feito com sucesso! Por favor, recarregue a página.");

          // Navega para a tela Home
          navigation.navigate("Home");
        } else {
          alert("Email ou senha inválidos.");
        }
      } catch (error) {
        alert("Erro ao fazer login. Tente novamente.");
      }
    } else {
      alert("Preencha todos os campos.");
    }
  };

  const handleResetPassword = async () => {
    if (resetEmail) {
      try {
        await api.post("/reset-password", { email: resetEmail });
        alert("Instruções de redefinição de senha enviadas para o email.");
        setShowResetPassword(false);
        setResetEmail("");
      } catch (error) {
        alert(
          "Erro ao enviar instruções de redefinição de senha. Tente novamente."
        );
      }
    } else {
      alert("Por favor, insira seu email.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.slogan}>
            Cuide do seu melhor <br /> amigo com a nossa ajuda
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.signupText}>
              Ainda não tem uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPasswordText}
            onPress={() => setShowResetPassword(true)}
          >
            <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para redefinição de senha */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showResetPassword}
        onRequestClose={() => setShowResetPassword(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Redefinir Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowResetPassword(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
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
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  slogan: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
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
  signupText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    width: "100%",
  },
});
