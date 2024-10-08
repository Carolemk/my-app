import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, // Importa o indicador de carregamento
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleCadastro = async () => {
    if (nome && email && cpf && senha) {
      setLoading(true); // Inicia o carregamento
      try {
        // Faz o cadastro
        await axios.post("http://localhost:3000/register", {
          nome,
          email,
          cpf,
          telefone,
          senha,
        });

        // Após o cadastro, efetua o login
        const loginResponse = await axios.post("http://localhost:3000/login", {
          email,
          senha,
        });

        if (loginResponse.data.success) {
          alert("Cadastro realizado com sucesso, recarregue página!");
          // Navega para a tela inicial e passa as informações do usuário
          navigation.navigate("Home", { user: loginResponse.data.user });
        } else {
          alert("Login falhou. Tente novamente.");
        }
      } catch (error) {
        alert("Erro ao realizar cadastro. Tente novamente.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    } else {
      alert("Preencha todos os campos.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Cadastro</Text>

          {/* Novo texto adicionado */}
          <Text style={styles.subtitle}>
            "Ter um pet ajuda a combater depressão"
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#888"
          />
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
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
          {/* Indicador de carregamento */}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={styles.loader}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  title: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  // Estilo para o novo texto
  subtitle: {
    color: "lightgray",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
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
  loginText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
  },
  loader: {
    marginTop: 20,
  },
});
