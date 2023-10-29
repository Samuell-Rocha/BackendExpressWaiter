import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Modal,
  FlatList,
} from "react-native";

import { UserProps } from "../../context/AuthContext";

import { AuthContext } from "../../context/AuthContext";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalPicker } from "../../components/ModalPicker";

import { api } from "../../services/api";
import Routes from "../../routes";

import { ListItem } from "../../components/Listitem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackPramsList } from "../../routes/app.routes";


type RouteDetailParams ={
  Order:{
    table_id: string | number;
    order_id: string;
    total: number
  }
}

export type CategoryProps = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type ItemProps = {
  id: string;
  product_id: string;
  amount: string | number;
  price: string | number;
  total: string | number;
  product:{
    name: string
  }
};

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const route = useRoute<OrderRouteProps>()

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setmodalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");

  const [items, setItems] = useState<ItemProps[]>([]);

  const [totalOrder, settotalOrder] = useState<number []>([]);

  const { finishTable } = useContext(AuthContext);

  useEffect(() => {
    async function loadinInfo() {
      const response = await api.get("/listcategory");
     
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadinInfo();
   
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product/list", {
        params: {
          category_id: categorySelected?.id,
          active: 'true',
          stock: 'true'
        }, 
       
      });
      setProducts(response.data);
      setProductSelected(response.data[0]);
    }

    loadProducts();
  }, [categorySelected]);

  useEffect(() => {

    async function loadinitens() {
      
      const response = await api.get("/order/list/item",{
        params:{
          order_id: user?.id
        }
      });
      
      setItems(response.data)      
    }
    loadinitens();
    
  }, []);


  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: user.id,
        },
      });

      finishTable();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  //aicionando um produto
  async function handleAdd() {

    const response = await api.post('/order/add', {
      order_id: user?.id,
      product_id: productSelected?.id,
      amount: Number(amount),
      price: Number(productSelected?.price),
      total: Number(productSelected?.price) * Number(amount)
    })

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      product:{name: productSelected?.name as string},
      amount: amount,
      price: Number(productSelected?.price),
      total:(Number(productSelected?.price) * Number(amount)).toFixed(2)
    }

    setItems(oldArray => [...oldArray, data])
    settotalOrder(oldArray => [...oldArray, Number(data.total)])

   // console.log(totalOrder)
  }

  async function handleDeleteItem(item_id: string) {

    console.log(item_id)
    try {
      await api.delete('order/remove', {
        params:{
          item_id: item_id
        }
      })

      let removeItem = items.filter(item =>{
        return (item.id !== item_id)
      })

      setItems(removeItem)
    } catch (error) {
      console.log('Error')
    }
  
  }

  function handleFinishOrder(){
    navigation.navigate("FinishOrder", {table_id: route.params?.table_id, order_id: route.params?.order_id, total: route.params?.total})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {user.table_id}</Text>
        {items.length === 0 &&(
           <TouchableOpacity onPress={handleCloseOrder}>
           <Feather name="trash-2" size={28} color="#FF3F4b" />
         </TouchableOpacity>
        )}

       
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setmodalCategoryVisible(true);
          }}
        >
          <Text  style={[styles.text, { color: "#FFF" }]}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={[styles.text, { color: "#FFF" }]}>{productSelected?.name} - {productSelected?.description}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input}>
          <Text style={[styles.text, { color: "#FFF" }]}>
            R$ {Number(productSelected?.price).toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholder="1"
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0} onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

     <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setmodalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 'auto',
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 12,
    color: "#FFF",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1dd",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize: 20
  },
});
