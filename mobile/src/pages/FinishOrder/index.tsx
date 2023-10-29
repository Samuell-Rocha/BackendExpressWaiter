import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import { WaitORder } from "../WaitOrder";
import { AuthContext } from "../../context/AuthContext";
import Order from "../Order";

type RouteDetailParams = {
  FinishOrder: {
    table_id: string | number;
    order_id: string;
    total: number;
  };
};

export type OrderProps = {
  id: string;
  total: number | string;
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export function FinishOrder() {
  const { user } = useContext(AuthContext);

  const route = useRoute<FinishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const [totalOrder, settotalOrder] = useState<OrderProps | undefined>();

  async function handleFinishOrder() {
    try {
      await api.put("order/send", {
        order_id: route.params?.order_id,
      });

      //navigation.navigate('WaitOrder'{})
    } catch (error) {
      console.log("Erro ao finalizar");
    }
  }

  useEffect(() => {
    async function loadingtotal() {
      const response = await api.put("/order", {
          order_id: user?.id as string,
      });
      settotalOrder(response.data);
      
    }
    loadingtotal();
    console.log(totalOrder);
  }, []);

  return (
    <>
      <View style={styles.total}>
        <Text style={styles.title}>Total do pedido</Text>
        <Text style={styles.alert}>R$ {(Number(totalOrder?.total)).toFixed(2)}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.alert}>Você deseja concluir esse pedido?</Text>
        <Text style={styles.title}>Mesa </Text>

        <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
          <Text style={styles.textButton}>Enviar pedido</Text>
          <Feather name="shopping-cart" size={20} color="#1d1d2e" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  total: {
    backgroundColor: "#1d1d2e",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3fffa3",
    flexDirection: "row",
    width: "65%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: "#1d1d2e",
  },
});
