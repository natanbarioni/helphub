import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import auth from "@react-native-firebase/auth";

import { Load } from "@components/Animations/Load";
import { Filters } from "@components/Controllers/Filters";
import { Order } from "@components/Controllers/Order";
import { Container, Header, Title, Counter } from "./styles";

import firestore from "@react-native-firebase/firestore";
import { OrderProps } from "@components/Controllers/Order/Models";
import { PropsOrders } from "./Models";

export function Orders({setIsOpen}: PropsOrders) {
  const [status, setStatus] = useState("open");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const user = auth().currentUser;
    if (user) {
      const subscriber = firestore()
        .collection("orders")
        .where("status", "==", status)
        .where('uid', '==', user?.uid)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as OrderProps[];

          setOrders(data);
          setIsLoading(false);
        });

      return () => subscriber();
    }
  }, [status]);

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title>Chamados {status === "open" ? "aberto" : "encerrado"}</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} setIsOpen={setIsOpen}/>}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
}
