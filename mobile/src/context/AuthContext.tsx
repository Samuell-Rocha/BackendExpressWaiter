import React, { useState, createContext, ReactNode, useEffect } from "react";


import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native/types";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  OpenTable: (credentials: OpenTableProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  finishTable: () => Promise<void>;
};

export type UserProps = {
  id: string;
  name: string;
  table_id: number;
};

type AuthProviderProps = {
  children: ReactNode;
};

type OpenTableProps = {
  name: string;
  table_id: number;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    table_id: 0,
    name: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.id;

  useEffect(() => {
    async function getUser() {
      //pegar os dados salvos do user
      const userInfo = await AsyncStorage.getItem("@expresswaiter");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      //verificar se recebemos as informações dele
      if (Object.keys(hasUser).length > 0) {
        setUser({
          id: hasUser.id,
          name: hasUser.name,
          table_id: hasUser.table_id,
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function OpenTable({ table_id, name }: OpenTableProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/order', {
        name,
        table_id,
      });

      const { id } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@expresswaiter", JSON.stringify(data));

      setUser({
        id,
        name,
        table_id,
      });

      setLoadingAuth(false);
    } catch (Erro) {
      console.log("erro ao acessar", Erro);
      setLoadingAuth(false);
    }
  }

  async function finishTable() {
    AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        table_id: 0,
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        OpenTable,
        loading,
        loadingAuth,
        finishTable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
