//Rotas para somente usuarios com pedido aberto

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Order from "../pages/Order";
import { FinishOrder } from "../pages/FinishOrder";
import { WaitORder } from "../pages/WaitOrder";

export type StackPramsList = {
  Order: {
    table_id: number | string;
    name: string;
  };
  FinishOrder: {
    table_id: number | string;
    order_id: string;
    total: number
  };
  WaitOrder:{
    table_id: number | string;
    order_id: string;
  }
};

const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Concluindo",
          headerStyle: { backgroundColor: "#1d1d2e" },
          headerTintColor: "#FFF",
        }}
      />

      <Stack.Screen
      name="WaitOrder"
      component={WaitORder}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
