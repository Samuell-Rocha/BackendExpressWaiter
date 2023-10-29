import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";


import { AuthContext } from "../../context/AuthContext";


export default function Qrcode() {


  const {OpenTable, loadingAuth} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [qrcode, setQrcode] = useState("");

  async function handleQrcode(){

    if(qrcode === '' || name === ''){
      console.log("Preencha todos os campos")
    
        return;
    }

     const table_id = Number(qrcode)

     try {
      await OpenTable({name, table_id,})
     } catch (error) {
      console.log("Mesa inexistente")
     }

 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../../assests/teste.png")} />
         
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        value={name}
        onChangeText={setName}

      />
      
       <TextInput
        placeholder="Numero da Mesa"
        placeholderTextColor="#F0F0F0"
        keyboardType="numeric"
        style={styles.input}
        value={qrcode}
        onChangeText={setQrcode}

      />
      <TouchableOpacity style={styles.button} onPress={handleQrcode}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#FFF"/>
        ): (
          <Text style={styles.buttonText}>Abrir Mesa</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 65,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
    marginBottom: 12
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
  logo: {
   
  },
});
