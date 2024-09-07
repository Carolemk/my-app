import React, { useState } from "react";
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

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = () => {
    if (email && senha) {
      navigation.navigate("Home"); // Navega para a tela Home (a ser criada)
    } else {
      alert("Preencha todos os campos.");
    }
  };

  const handleResetPassword = () => {
    if (resetEmail) {
      alert("Instruções de redefinição de senha enviadas para o email.");
      setShowResetPassword(false);
      setResetEmail("");
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
            borderColor="transparent" // Adicionado
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholderTextColor="#888"
            borderColor="transparent" // Adicionado
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
              borderColor="transparent" // Adicionado
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
    maxWidth: 400, // Ajuste a largura máxima conforme necessário
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
    marginTop: 1,
    marginBottom: 20,
  },
  input: {
    height: 50, // Aumenta a altura do input
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15, // Aumenta o espaço entre os inputs
    paddingHorizontal: 15,
    color: "white",
    borderRadius: 5, // Adiciona bordas arredondadas para um visual mais moderno
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5, // Adicionado
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
    backgroundColor: "#ffffff",
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
    borderRadius: 5, // Adicionado
    width: "100%",
  },
});
